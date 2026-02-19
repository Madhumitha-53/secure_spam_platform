import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera, Mic, MicOff, Video, Activity, Keyboard, Mouse, Clock, Smartphone, CheckCircle, XCircle, Sparkles, RefreshCw } from "lucide-react";
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
  const [autoFaceEnabled, setAutoFaceEnabled] = useState(true);
  const [faceScansCount, setFaceScansCount] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const faceIntervalRef = useRef<number>(0);
  const faceAnalyzingRef = useRef(false);

  // Voice analysis
  const [micActive, setMicActive] = useState(false);
  const [voiceResult, setVoiceResult] = useState<any>(null);
  const [voiceAnalyzing, setVoiceAnalyzing] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [recordingTime, setRecordingTime] = useState(0);
  const [autoVoiceEnabled, setAutoVoiceEnabled] = useState(true);
  const [voiceScansCount, setVoiceScansCount] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number>(0);
  const recordingTimerRef = useRef<number>(0);
  const voiceIntervalRef = useRef<number>(0);
  const audioLevelRef = useRef(0);
  const recordingTimeRef = useRef(0);

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

  // ---- FACE: Webcam + Auto-Analysis ----
  const analyzeFaceSingle = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current || faceAnalyzingRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (video.videoWidth === 0) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    const imageData = canvas.toDataURL("image/jpeg", 0.6);

    faceAnalyzingRef.current = true;
    setFaceAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-biometrics", {
        body: { faceImage: imageData, type: "face", language },
      });
      if (!error && !data?.error) {
        setFaceResult(data);
        setFaceScansCount((c) => c + 1);
      }
    } catch { /* silent for auto */ }
    finally {
      faceAnalyzingRef.current = false;
      setFaceAnalyzing(false);
    }
  }, [language]);

  const startWebcam = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 },
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setWebcamActive(true);
      setFaceResult(null);
      setFaceScansCount(0);
    } catch {
      toast.error("Camera access denied.");
    }
  }, []);

  const stopWebcam = useCallback(() => {
    clearInterval(faceIntervalRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setWebcamActive(false);
  }, []);

  // Auto face analysis every 5 seconds
  useEffect(() => {
    if (webcamActive && autoFaceEnabled) {
      // Initial analysis after 2s
      const timeout = setTimeout(() => analyzeFaceSingle(), 2000);
      faceIntervalRef.current = window.setInterval(() => {
        analyzeFaceSingle();
      }, 6000);
      return () => {
        clearTimeout(timeout);
        clearInterval(faceIntervalRef.current);
      };
    } else {
      clearInterval(faceIntervalRef.current);
    }
  }, [webcamActive, autoFaceEnabled, analyzeFaceSingle]);

  // ---- VOICE: Mic + Auto-Analysis ----
  const analyzeVoiceSingle = useCallback(async () => {
    setVoiceAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-biometrics", {
        body: {
          type: "voice",
          language,
          audioData: {
            duration: recordingTimeRef.current,
            averageLevel: audioLevelRef.current,
            sampleRate: audioContextRef.current?.sampleRate || 44100,
          },
        },
      });
      if (!error && !data?.error) {
        setVoiceResult(data);
        setVoiceScansCount((c) => c + 1);
      }
    } catch { /* silent */ }
    finally {
      setVoiceAnalyzing(false);
    }
  }, [language]);

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
      setVoiceScansCount(0);
      recordingTimeRef.current = 0;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateLevel = () => {
        analyser.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        const rounded = Math.round(avg);
        setAudioLevel(rounded);
        audioLevelRef.current = rounded;
        animFrameRef.current = requestAnimationFrame(updateLevel);
      };
      updateLevel();

      recordingTimerRef.current = window.setInterval(() => {
        recordingTimeRef.current += 1;
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch {
      toast.error("Microphone access denied.");
    }
  }, []);

  // Auto voice analysis every 8 seconds (needs at least 3s of data)
  useEffect(() => {
    if (micActive && autoVoiceEnabled) {
      voiceIntervalRef.current = window.setInterval(() => {
        if (recordingTimeRef.current >= 3) {
          analyzeVoiceSingle();
        }
      }, 8000);
      return () => clearInterval(voiceIntervalRef.current);
    } else {
      clearInterval(voiceIntervalRef.current);
    }
  }, [micActive, autoVoiceEnabled, analyzeVoiceSingle]);

  const stopMic = useCallback(() => {
    cancelAnimationFrame(animFrameRef.current);
    clearInterval(recordingTimerRef.current);
    clearInterval(voiceIntervalRef.current);
    micStreamRef.current?.getTracks().forEach((t) => t.stop());
    audioContextRef.current?.close();
    setMicActive(false);
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      stopWebcam();
      cancelAnimationFrame(animFrameRef.current);
      clearInterval(recordingTimerRef.current);
      clearInterval(voiceIntervalRef.current);
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
        {/* Face Liveness - Live */}
        <div className="glass rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground flex items-center gap-2 text-sm">
              <Camera className="w-4 h-4 text-primary" /> Face Liveness Detection
            </h4>
            {webcamActive && (
              <div className="flex items-center gap-2">
                <button onClick={() => setAutoFaceEnabled(!autoFaceEnabled)}
                  className={`text-[10px] px-2 py-0.5 rounded-full transition-all ${autoFaceEnabled ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                  {autoFaceEnabled ? "AUTO ON" : "AUTO OFF"}
                </button>
                {faceAnalyzing && <RefreshCw className="w-3 h-3 text-primary animate-spin" />}
              </div>
            )}
          </div>
          <div className="relative rounded-lg overflow-hidden bg-black/30 aspect-video flex items-center justify-center">
            {webcamActive ? (
              <>
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" style={{ transform: "scaleX(-1)" }} />
                {/* Live overlay */}
                <div className="absolute top-2 left-2 flex items-center gap-1 glass rounded-full px-2 py-1">
                  <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                  <span className="text-[10px] text-foreground font-bold">LIVE</span>
                </div>
                {faceResult && (
                  <div className={`absolute bottom-2 left-2 right-2 rounded-lg px-3 py-2 backdrop-blur-md ${faceResult.isLive ? "bg-success/20 border border-success/40" : "bg-destructive/20 border border-destructive/40"}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {faceResult.isLive ? <CheckCircle className="w-4 h-4 text-success" /> : <XCircle className="w-4 h-4 text-destructive" />}
                        <span className="text-xs font-bold text-foreground">
                          {faceResult.isLive ? "LIVE ✓" : "SPOOF ⚠"}
                        </span>
                      </div>
                      <span className="text-[10px] text-foreground/70">
                        {faceResult.livenessScore}% • Scan #{faceScansCount}
                      </span>
                    </div>
                  </div>
                )}
                {faceAnalyzing && !faceResult && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                    <div className="text-center">
                      <RefreshCw className="w-6 h-6 text-primary animate-spin mx-auto mb-1" />
                      <span className="text-xs text-foreground">Scanning...</span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center p-4">
                <Video className="w-8 h-8 text-muted-foreground mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Camera off</p>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            {!webcamActive ? (
              <button onClick={startWebcam} className="flex-1 gradient-primary text-primary-foreground py-2 rounded-lg text-xs font-semibold">
                ▶ Start Live Detection
              </button>
            ) : (
              <>
                <button onClick={analyzeFaceSingle} disabled={faceAnalyzing}
                  className="flex-1 gradient-primary text-primary-foreground py-2 rounded-lg text-xs font-semibold disabled:opacity-50">
                  {faceAnalyzing ? "Scanning..." : "🔍 Scan Now"}
                </button>
                <button onClick={stopWebcam} className="glass text-muted-foreground px-3 py-2 rounded-lg text-xs">Stop</button>
              </>
            )}
          </div>

          {/* Face checks detail */}
          {faceResult?.checks && (
            <motion.div className="space-y-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {faceResult.checks.map((check: any, i: number) => (
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

        {/* Voice Analysis - Live */}
        <div className="glass rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground flex items-center gap-2 text-sm">
              <Mic className="w-4 h-4 text-primary" /> Voice Authenticity
            </h4>
            {micActive && (
              <div className="flex items-center gap-2">
                <button onClick={() => setAutoVoiceEnabled(!autoVoiceEnabled)}
                  className={`text-[10px] px-2 py-0.5 rounded-full transition-all ${autoVoiceEnabled ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                  {autoVoiceEnabled ? "AUTO ON" : "AUTO OFF"}
                </button>
                {voiceAnalyzing && <RefreshCw className="w-3 h-3 text-primary animate-spin" />}
              </div>
            )}
          </div>
          <div className="rounded-lg bg-black/30 aspect-video flex items-center justify-center relative overflow-hidden">
            {micActive ? (
              <div className="text-center w-full px-4">
                {/* Audio waveform visualization */}
                <div className="flex items-end justify-center gap-[2px] mb-3 h-16">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <motion.div key={i} className="w-1 rounded-full bg-primary"
                      animate={{ height: Math.max(4, (audioLevel / 200) * 64 * (0.3 + Math.random() * 0.7)) }}
                      transition={{ duration: 0.05 }} />
                  ))}
                </div>
                <div className="flex items-center gap-1 justify-center">
                  <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                  <span className="text-xs text-foreground font-bold">LIVE • {recordingTime}s</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">Level: {audioLevel} • Scans: {voiceScansCount}</p>
                {/* Live voice result overlay */}
                {voiceResult && (
                  <div className={`mt-2 rounded-lg px-3 py-2 ${voiceResult.isNatural ? "bg-success/20 border border-success/40" : "bg-destructive/20 border border-destructive/40"}`}>
                    <div className="flex items-center justify-center gap-2">
                      {voiceResult.isNatural ? <CheckCircle className="w-3 h-3 text-success" /> : <XCircle className="w-3 h-3 text-destructive" />}
                      <span className="text-xs font-bold text-foreground">
                        {voiceResult.isNatural ? "Natural ✓" : "Synthetic ⚠"} • {voiceResult.naturalScore}%
                      </span>
                    </div>
                  </div>
                )}
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
                ▶ Start Live Detection
              </button>
            ) : (
              <>
                <button onClick={analyzeVoiceSingle} disabled={voiceAnalyzing}
                  className="flex-1 gradient-primary text-primary-foreground py-2 rounded-lg text-xs font-semibold disabled:opacity-50">
                  {voiceAnalyzing ? "Analyzing..." : "🔍 Analyze Now"}
                </button>
                <button onClick={stopMic} className="glass text-muted-foreground px-3 py-2 rounded-lg text-xs">Stop</button>
              </>
            )}
          </div>

          {/* Voice checks detail */}
          {voiceResult?.checks && (
            <motion.div className="space-y-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {voiceResult.checks.map((check: any, i: number) => (
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
