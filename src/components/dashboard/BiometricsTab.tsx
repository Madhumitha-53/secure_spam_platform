import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera, Mic, MicOff, Video, Activity, Keyboard, Mouse, Clock, Smartphone, CheckCircle, XCircle, Sparkles } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import useBehavioralBiometrics from "@/hooks/useBehavioralBiometrics";
import TrustScoreRing from "@/components/TrustScoreRing";

const BiometricsTab = () => {
  const { t, language } = useLanguage();
  const { biometrics, recordKeystroke, recordMouseMove, recordScroll, getBehaviorScore } = useBehavioralBiometrics();
  const [score, setScore] = useState(0);

  // Webcam face liveness
  const [webcamActive, setWebcamActive] = useState(false);
  const [faceResult, setFaceResult] = useState<any>(null);
  const [faceAnalyzing, setFaceAnalyzing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Voice analysis
  const [micActive, setMicActive] = useState(false);
  const [voiceResult, setVoiceResult] = useState<any>(null);
  const [voiceAnalyzing, setVoiceAnalyzing] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [recordingTime, setRecordingTime] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number>(0);
  const recordingTimerRef = useRef<number>(0);

  // Behavioral events
  useEffect(() => {
    const handleKey = () => recordKeystroke();
    const handleMouse = () => recordMouseMove();
    const handleScrollEvt = () => recordScroll();
    window.addEventListener("keydown", handleKey);
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("scroll", handleScrollEvt);
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("scroll", handleScrollEvt);
    };
  }, [recordKeystroke, recordMouseMove, recordScroll]);

  useEffect(() => {
    const interval = setInterval(() => setScore(getBehaviorScore()), 1000);
    return () => clearInterval(interval);
  }, [getBehaviorScore]);

  // Webcam
  const startWebcam = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 320, height: 240 },
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setWebcamActive(true);
      setFaceResult(null);
    } catch {
      toast.error("Camera access denied.");
    }
  }, []);

  const stopWebcam = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setWebcamActive(false);
  }, []);

  const analyzeFace = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    const imageData = canvas.toDataURL("image/jpeg", 0.7);

    setFaceAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-biometrics", {
        body: { faceImage: imageData, type: "face", language },
      });
      if (error || data?.error) {
        toast.error(data?.error || error?.message || "Face analysis failed.");
        return;
      }
      setFaceResult(data);
    } catch {
      toast.error("Face analysis failed.");
    } finally {
      setFaceAnalyzing(false);
    }
  }, [language]);

  // Voice / Microphone
  const startMic = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      const audioCtx = new AudioContext();
      audioContextRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;
      setMicActive(true);
      setVoiceResult(null);
      setRecordingTime(0);

      // Audio level visualization
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateLevel = () => {
        analyser.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        setAudioLevel(Math.round(avg));
        animFrameRef.current = requestAnimationFrame(updateLevel);
      };
      updateLevel();

      // Recording timer
      recordingTimerRef.current = window.setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch {
      toast.error("Microphone access denied.");
    }
  }, []);

  const stopMicAndAnalyze = useCallback(async () => {
    cancelAnimationFrame(animFrameRef.current);
    clearInterval(recordingTimerRef.current);
    micStreamRef.current?.getTracks().forEach((t) => t.stop());
    audioContextRef.current?.close();
    setMicActive(false);

    if (recordingTime < 2) {
      toast.error("Please record at least 2 seconds of audio.");
      return;
    }

    setVoiceAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-biometrics", {
        body: {
          type: "voice",
          language,
          audioData: {
            duration: recordingTime,
            averageLevel: audioLevel,
            sampleRate: audioContextRef.current?.sampleRate || 44100,
          },
        },
      });
      if (error || data?.error) {
        toast.error(data?.error || error?.message || "Voice analysis failed.");
        return;
      }
      setVoiceResult(data);
    } catch {
      toast.error("Voice analysis failed.");
    } finally {
      setVoiceAnalyzing(false);
    }
  }, [recordingTime, audioLevel, language]);

  // Cleanup
  useEffect(() => {
    return () => {
      stopWebcam();
      cancelAnimationFrame(animFrameRef.current);
      clearInterval(recordingTimerRef.current);
      micStreamRef.current?.getTracks().forEach((t) => t.stop());
      audioContextRef.current?.close();
    };
  }, [stopWebcam]);

  const behaviorMetrics = [
    { icon: Keyboard, label: t.typingSpeed, value: `${biometrics.typingSpeed} ${t.wpm}`, sub: `${biometrics.typingConsistency}% ${t.consistent}` },
    { icon: Mouse, label: t.mouseActivity, value: `${biometrics.mouseMovements}`, sub: t.movementsTracked },
    { icon: Clock, label: t.sessionDuration, value: `${biometrics.sessionDuration}s`, sub: t.activeSession },
    { icon: Smartphone, label: t.deviceTrustLabel, value: `${biometrics.deviceTrust}%`, sub: t.fingerprintMatch },
    { icon: Activity, label: t.scrollPatterns, value: `${biometrics.scrollPatterns}`, sub: t.scrollEvents },
  ];

  return (
    <div className="space-y-6">
      {/* Behavioral Trust Score */}
      <div className="glass rounded-xl p-6 flex flex-col items-center">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">{t.liveBehavioralScore}</p>
        <TrustScoreRing score={score} />
        <p className="text-sm text-muted-foreground mt-4">{t.interactToSee}</p>
      </div>

      {/* Face Liveness + Voice Analysis Row */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Face Liveness */}
        <div className="glass rounded-xl p-4 space-y-3">
          <h4 className="font-semibold text-foreground flex items-center gap-2 text-sm">
            <Camera className="w-4 h-4 text-primary" /> Face Liveness Detection
          </h4>
          <div className="relative rounded-lg overflow-hidden bg-black/30 aspect-video flex items-center justify-center">
            {webcamActive ? (
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-4">
                <Video className="w-8 h-8 text-muted-foreground mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Camera off</p>
              </div>
            )}
            {webcamActive && (
              <div className="absolute top-2 left-2 flex items-center gap-1 glass rounded-full px-2 py-1">
                <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                <span className="text-[10px] text-foreground">LIVE</span>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            {!webcamActive ? (
              <button onClick={startWebcam} className="flex-1 gradient-primary text-primary-foreground py-2 rounded-lg text-xs font-semibold">
                Start Camera
              </button>
            ) : (
              <>
                <button onClick={analyzeFace} disabled={faceAnalyzing}
                  className="flex-1 gradient-primary text-primary-foreground py-2 rounded-lg text-xs font-semibold disabled:opacity-50">
                  {faceAnalyzing ? "Analyzing..." : "🔍 Analyze Face"}
                </button>
                <button onClick={stopWebcam} className="glass text-muted-foreground px-3 py-2 rounded-lg text-xs">Stop</button>
              </>
            )}
          </div>

          {/* Face Result */}
          {faceResult && (
            <motion.div className="space-y-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className={`rounded-lg p-3 ${faceResult.isLive ? "bg-success/10 border border-success/30" : "bg-destructive/10 border border-destructive/30"}`}>
                <div className="flex items-center gap-2">
                  {faceResult.isLive ? <CheckCircle className="w-5 h-5 text-success" /> : <XCircle className="w-5 h-5 text-destructive" />}
                  <span className="text-sm font-bold text-foreground">
                    {faceResult.isLive ? "✅ Live Person Detected" : "⚠️ Spoof Attempt Suspected"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Liveness: {faceResult.livenessScore}% • Confidence: {faceResult.confidence}%</p>
              </div>
              {faceResult.checks?.map((check: any, i: number) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  {check.passed ? <CheckCircle className="w-3 h-3 text-success" /> : <XCircle className="w-3 h-3 text-destructive" />}
                  <span className="text-muted-foreground">{check.name}: {check.detail}</span>
                </div>
              ))}
              {faceResult.explanation && (
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <Sparkles className="w-3 h-3 text-primary" /> {faceResult.explanation}
                </p>
              )}
            </motion.div>
          )}
        </div>

        {/* Voice Analysis */}
        <div className="glass rounded-xl p-4 space-y-3">
          <h4 className="font-semibold text-foreground flex items-center gap-2 text-sm">
            <Mic className="w-4 h-4 text-primary" /> Voice Authenticity
          </h4>
          <div className="rounded-lg bg-black/30 aspect-video flex items-center justify-center relative overflow-hidden">
            {micActive ? (
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div key={i} className="w-1 rounded-full bg-primary"
                      animate={{ height: Math.max(4, (audioLevel / 255) * 60 * (0.5 + Math.random())) }}
                      transition={{ duration: 0.1 }} />
                  ))}
                </div>
                <div className="flex items-center gap-1 justify-center">
                  <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                  <span className="text-xs text-foreground">Recording: {recordingTime}s</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">Level: {audioLevel}</p>
              </div>
            ) : (
              <div className="text-center p-4">
                <MicOff className="w-8 h-8 text-muted-foreground mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Microphone off</p>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            {!micActive ? (
              <button onClick={startMic} className="flex-1 gradient-primary text-primary-foreground py-2 rounded-lg text-xs font-semibold">
                Start Recording
              </button>
            ) : (
              <button onClick={stopMicAndAnalyze} disabled={voiceAnalyzing}
                className="flex-1 gradient-primary text-primary-foreground py-2 rounded-lg text-xs font-semibold disabled:opacity-50">
                {voiceAnalyzing ? "Analyzing..." : "⏹ Stop & Analyze"}
              </button>
            )}
          </div>

          {/* Voice Result */}
          {voiceResult && (
            <motion.div className="space-y-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className={`rounded-lg p-3 ${voiceResult.isNatural ? "bg-success/10 border border-success/30" : "bg-destructive/10 border border-destructive/30"}`}>
                <div className="flex items-center gap-2">
                  {voiceResult.isNatural ? <CheckCircle className="w-5 h-5 text-success" /> : <XCircle className="w-5 h-5 text-destructive" />}
                  <span className="text-sm font-bold text-foreground">
                    {voiceResult.isNatural ? "✅ Natural Voice" : "⚠️ Synthetic Voice Suspected"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Natural: {voiceResult.naturalScore}% • Confidence: {voiceResult.confidence}%</p>
              </div>
              {voiceResult.checks?.map((check: any, i: number) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  {check.passed ? <CheckCircle className="w-3 h-3 text-success" /> : <XCircle className="w-3 h-3 text-destructive" />}
                  <span className="text-muted-foreground">{check.name}: {check.detail}</span>
                </div>
              ))}
              {voiceResult.explanation && (
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <Sparkles className="w-3 h-3 text-primary" /> {voiceResult.explanation}
                </p>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Behavioral Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {behaviorMetrics.map(({ icon: Icon, label, value, sub }, i) => (
          <motion.div key={label} className="glass rounded-xl p-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="flex items-center gap-2 mb-2">
              <Icon className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground">{sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Typing Test */}
      <div className="glass rounded-xl p-4">
        <p className="text-xs text-muted-foreground mb-2 uppercase tracking-widest">{t.tryTyping}</p>
        <textarea placeholder={t.typeAnything} onKeyDown={recordKeystroke}
          className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/50 resize-none h-20 outline-none text-sm" />
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default BiometricsTab;
