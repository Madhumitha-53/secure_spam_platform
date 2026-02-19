import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Camera, Upload, XCircle, CheckCircle, Sparkles, Video, ImageIcon, RefreshCw } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const DeepfakeTab = () => {
  const { t, language } = useLanguage();
  const [imageData, setImageData] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [mode, setMode] = useState<"upload" | "webcam">("upload");
  const [webcamActive, setWebcamActive] = useState(false);
  const [autoAnalyze, setAutoAnalyze] = useState(true);
  const [scanCount, setScanCount] = useState(0);
  const [liveResult, setLiveResult] = useState<any | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const autoIntervalRef = useRef<number>(0);
  const analyzingRef = useRef(false);

  const startWebcam = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setWebcamActive(true);
      setLiveResult(null);
      setScanCount(0);
    } catch (err) {
      toast.error("Camera access denied. Please allow camera permissions.");
    }
  }, []);

  const stopWebcam = useCallback(() => {
    clearInterval(autoIntervalRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setWebcamActive(false);
  }, []);

  // Live webcam analysis (no capture needed)
  const analyzeLiveFrame = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current || analyzingRef.current) return;
    const video = videoRef.current;
    if (video.videoWidth === 0) return;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    const data = canvas.toDataURL("image/jpeg", 0.6);

    analyzingRef.current = true;
    setIsAnalyzing(true);
    try {
      const { data: res, error } = await supabase.functions.invoke("analyze-deepfake", {
        body: { image: data, language },
      });
      if (!error && !res?.error) {
        setLiveResult(res);
        setScanCount((c) => c + 1);
      }
    } catch { /* silent for auto */ }
    finally {
      analyzingRef.current = false;
      setIsAnalyzing(false);
    }
  }, [language]);

  // Auto-analyze every 6 seconds while webcam is active
  useEffect(() => {
    if (webcamActive && mode === "webcam" && autoAnalyze) {
      const timeout = setTimeout(() => analyzeLiveFrame(), 2000);
      autoIntervalRef.current = window.setInterval(() => {
        analyzeLiveFrame();
      }, 6000);
      return () => {
        clearTimeout(timeout);
        clearInterval(autoIntervalRef.current);
      };
    } else {
      clearInterval(autoIntervalRef.current);
    }
  }, [webcamActive, mode, autoAnalyze, analyzeLiveFrame]);

  // Cleanup
  useEffect(() => {
    return () => {
      clearInterval(autoIntervalRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const captureFrame = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    const data = canvas.toDataURL("image/jpeg", 0.8);
    setImageData(data);
    setResult(null);
    stopWebcam();
  }, [stopWebcam]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File too large. Max 10MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImageData(reader.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!imageData) return;
    setIsAnalyzing(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-deepfake", {
        body: { image: imageData, language },
      });
      if (error) {
        toast.error(error.message || "Analysis failed.");
        return;
      }
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      setResult(data);
    } catch {
      toast.error("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "critical": return "hsl(var(--trust-low))";
      case "high": return "hsl(var(--destructive))";
      case "medium": return "hsl(var(--trust-medium))";
      case "low": return "hsl(var(--primary))";
      default: return "hsl(var(--trust-high))";
    }
  };

  // Show live webcam mode with real-time overlay
  const showLiveWebcam = mode === "webcam" && webcamActive && !imageData;

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex gap-2">
        <button onClick={() => { setMode("upload"); stopWebcam(); setImageData(null); setResult(null); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${mode === "upload" ? "gradient-primary text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"}`}>
          <Upload className="w-4 h-4" /> {t.dropImage}
        </button>
        <button onClick={() => { setMode("webcam"); setImageData(null); setResult(null); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${mode === "webcam" ? "gradient-primary text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"}`}>
          <Camera className="w-4 h-4" /> Live Webcam
        </button>
      </div>

      {/* Upload Mode */}
      {mode === "upload" && !imageData && (
        <div onClick={() => fileInputRef.current?.click()}
          className="glass rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-all border-2 border-dashed border-border">
          <div className="w-16 h-16 rounded-full glass flex items-center justify-center mx-auto mb-3">
            <ImageIcon className="w-8 h-8 text-primary" />
          </div>
          <p className="text-foreground font-semibold">{t.dropImage}</p>
          <p className="text-xs text-muted-foreground mt-1">{t.supportsFormats}</p>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
        </div>
      )}

      {/* Live Webcam Mode */}
      {mode === "webcam" && !imageData && (
        <div className="glass rounded-xl p-4 space-y-4">
          <div className="relative rounded-lg overflow-hidden bg-black/50 aspect-video flex items-center justify-center">
            {webcamActive ? (
              <>
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                {/* Live overlay badge */}
                <div className="absolute top-2 left-2 flex items-center gap-1 glass rounded-full px-2 py-1">
                  <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                  <span className="text-[10px] text-foreground font-bold">LIVE DEEPFAKE SCAN</span>
                </div>
                {/* Auto toggle */}
                <div className="absolute top-2 right-2">
                  <button onClick={() => setAutoAnalyze(!autoAnalyze)}
                    className={`text-[10px] px-2 py-1 rounded-full transition-all flex items-center gap-1 ${autoAnalyze ? "bg-primary/30 text-primary backdrop-blur-md" : "bg-muted/50 text-muted-foreground backdrop-blur-md"}`}>
                    {isAnalyzing && <RefreshCw className="w-3 h-3 animate-spin" />}
                    {autoAnalyze ? "AUTO ON" : "AUTO OFF"}
                  </button>
                </div>
                {/* Live result overlay */}
                {liveResult && (
                  <div className={`absolute bottom-2 left-2 right-2 rounded-lg px-3 py-2 backdrop-blur-md ${!liveResult.isDeepfake ? "bg-success/20 border border-success/40" : "bg-destructive/20 border border-destructive/40"}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {!liveResult.isDeepfake ? <CheckCircle className="w-4 h-4 text-success" /> : <XCircle className="w-4 h-4 text-destructive" />}
                        <span className="text-xs font-bold text-foreground">
                          {liveResult.isDeepfake ? "DEEPFAKE ⚠" : "AUTHENTIC ✓"} • {liveResult.authenticity}%
                        </span>
                      </div>
                      <span className="text-[10px] text-foreground/70">
                        Scan #{scanCount} • {liveResult.riskLevel}
                      </span>
                    </div>
                  </div>
                )}
                {/* Scanning indicator */}
                {isAnalyzing && !liveResult && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                    <div className="text-center">
                      <RefreshCw className="w-8 h-8 text-primary animate-spin mx-auto mb-1" />
                      <span className="text-xs text-foreground">Scanning for deepfakes...</span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center">
                <Video className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Camera preview</p>
              </div>
            )}
          </div>
          <div className="flex gap-2 justify-center">
            {!webcamActive ? (
              <button onClick={startWebcam} className="gradient-primary text-primary-foreground px-6 py-2 rounded-lg text-sm font-semibold">
                ▶ Start Live Detection
              </button>
            ) : (
              <>
                <button onClick={analyzeLiveFrame} disabled={isAnalyzing}
                  className="gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50">
                  {isAnalyzing ? "Scanning..." : "🔍 Scan Now"}
                </button>
                <button onClick={captureFrame} className="glass text-foreground px-4 py-2 rounded-lg text-sm">
                  📸 Capture
                </button>
                <button onClick={stopWebcam} className="glass text-muted-foreground px-4 py-2 rounded-lg text-sm">
                  Stop
                </button>
              </>
            )}
          </div>

          {/* Live analysis detail cards */}
          {liveResult && webcamActive && (
            <motion.div className="space-y-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              {liveResult.indicators?.length > 0 && (
                <div className="glass rounded-lg p-3">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Indicators</p>
                  <div className="space-y-1">
                    {liveResult.indicators.map((ind: any, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        {ind.detected ? <XCircle className="w-3 h-3 text-destructive" /> : <CheckCircle className="w-3 h-3 text-success" />}
                        <span className="text-muted-foreground">{ind.name}: {ind.detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {liveResult.explanation && (
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-primary" /> {liveResult.explanation}
                </p>
              )}
            </motion.div>
          )}
        </div>
      )}

      {/* Captured/Uploaded Image Preview */}
      {imageData && (
        <div className="glass rounded-xl p-4 space-y-4">
          <div className="relative rounded-lg overflow-hidden">
            <img src={imageData} alt="Captured" className="w-full max-h-80 object-contain rounded-lg" />
            <button onClick={() => { setImageData(null); setResult(null); }}
              className="absolute top-2 right-2 glass rounded-full p-1.5 hover:bg-destructive/20 transition-colors">
              <XCircle className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          <button onClick={handleAnalyze} disabled={isAnalyzing}
            className="w-full gradient-primary text-primary-foreground py-3 rounded-lg text-sm font-semibold disabled:opacity-50">
            {isAnalyzing ? t.analyzing : t.runAnalysis}
          </button>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />

      {/* Loading */}
      <AnimatePresence>
        {isAnalyzing && imageData && (
          <motion.div className="glass rounded-xl p-8 flex flex-col items-center"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center animate-pulse mb-3">
              <Eye className="w-6 h-6 text-primary-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">{t.analyzing}</p>
          </motion.div>
        )}

        {/* Results for uploaded/captured images */}
        {result && !isAnalyzing && (
          <motion.div className="space-y-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="glass rounded-xl p-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">{t.authenticityCheck}</p>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
                    <motion.circle cx="60" cy="60" r="50" fill="none" stroke={getRiskColor(result.riskLevel)} strokeWidth="6"
                      strokeLinecap="round" strokeDasharray={2 * Math.PI * 50}
                      initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 50 - (result.authenticity / 100) * 2 * Math.PI * 50 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      transform="rotate(-90 60 60)"
                      style={{ filter: `drop-shadow(0 0 6px ${getRiskColor(result.riskLevel)})` }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span className="text-2xl font-bold" style={{ color: getRiskColor(result.riskLevel) }}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                      {result.authenticity}%
                    </motion.span>
                    <span className="text-[10px] text-muted-foreground">Authentic</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xl font-bold" style={{ color: getRiskColor(result.riskLevel) }}>
                    {result.isDeepfake ? "⚠️ Deepfake Detected" : "✅ Appears Authentic"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Confidence: {result.confidence}%</p>
                  <p className="text-xs text-muted-foreground mt-0.5 capitalize">Risk: {result.riskLevel}</p>
                </div>
              </div>
            </div>

            {result.indicators?.length > 0 && (
              <div className="glass rounded-xl p-5">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{t.detectedIssues}</p>
                <div className="space-y-2">
                  {result.indicators.map((ind: any, i: number) => (
                    <motion.div key={i} className="flex items-start gap-3 text-sm"
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                      {ind.detected ? (
                        <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: getRiskColor(ind.severity === "high" ? "high" : ind.severity === "medium" ? "medium" : "low") }} />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span className="text-foreground font-medium">{ind.name}</span>
                        <p className="text-xs text-muted-foreground">{ind.detail}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {result.breakdown?.length > 0 && (
              <div className="glass rounded-xl p-5">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{t.analysisBreakdown}</p>
                <div className="space-y-3">
                  {result.breakdown.map((item: any, i: number) => (
                    <motion.div key={item.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="text-foreground font-medium">{item.score}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-secondary">
                        <motion.div className="h-full rounded-full" style={{ backgroundColor: getRiskColor(result.riskLevel) }}
                          initial={{ width: 0 }} animate={{ width: `${item.score}%` }} transition={{ duration: 0.6, delay: i * 0.1 }} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {result.explanation && (
              <div className="glass rounded-xl p-5 border border-primary/20">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-primary" /> AI Analysis
                </p>
                <p className="text-sm text-foreground leading-relaxed">{result.explanation}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DeepfakeTab;
