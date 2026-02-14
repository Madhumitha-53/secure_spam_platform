import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, MessageSquareWarning, Eye, Activity, ArrowLeft, Brain, Fingerprint, Users, AlertTriangle, CheckCircle, XCircle, Keyboard, Mouse, Clock, Smartphone } from "lucide-react";
import SecureCircleVisual from "@/components/SecureCircleVisual";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/i18n/LanguageContext";
import TrustScoreRing from "@/components/TrustScoreRing";
import useBehavioralBiometrics from "@/hooks/useBehavioralBiometrics";
import { analyzeScamMessage, type ScamResult } from "@/lib/scamAnalyzer";

type Tab = "scam" | "deepfake" | "biometrics" | "securecircle";

const Dashboard = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>("scam");

  const tabs: { id: Tab; label: string; icon: typeof Shield; desc: string }[] = [
    { id: "scam", label: t.scamDetector, icon: MessageSquareWarning, desc: t.scamDetectorDesc },
    { id: "deepfake", label: t.deepfakeAnalyzer, icon: Eye, desc: t.deepfakeAnalyzerDesc },
    { id: "biometrics", label: t.liveBiometricsLabel, icon: Activity, desc: t.liveBiometricsDesc },
    { id: "securecircle", label: t.secureCircleLabel, icon: Users, desc: t.secureCircleDashDesc },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 glass sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="font-bold text-foreground">{t.dashboardTitle}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-muted-foreground">{t.systemActive}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {tabs.map(({ id, label, icon: Icon, desc }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`rounded-xl p-4 text-left transition-all ${
                activeTab === id ? "gradient-primary text-primary-foreground glow-primary" : "glass text-foreground hover:border-primary/50"
              }`}>
              <Icon className="w-5 h-5 mb-2" />
              <p className="text-sm font-semibold">{label}</p>
              <p className={`text-xs mt-0.5 ${activeTab === id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{desc}</p>
            </button>
          ))}
        </div>

        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {activeTab === "scam" && <ScamTab />}
          {activeTab === "deepfake" && <DeepfakeTab />}
          {activeTab === "biometrics" && <BiometricsTab />}
          {activeTab === "securecircle" && <SecureCircleTab />}
        </motion.div>
      </div>
    </div>
  );
};

// Inline simplified tabs to avoid complex component imports with Supabase deps

const ScamTab = () => {
  const { t } = useLanguage();
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<ScamResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const sampleMessages = [
    "Dear customer, your IOB account will be blocked in 24 hours. Share OTP to verify: 8XXX-XXXX",
    "Congratulations! You won ₹50,000 lottery. Click here to claim: bit.ly/xxx",
    "Your KYC has expired. Update now or face account suspension. Call 9876543210",
    "Hi, your IOB fixed deposit maturity is due on 15th March. Visit nearest branch.",
  ];

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setResult(analyzeScamMessage(inputText));
      setIsAnalyzing(false);
    }, 1200);
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

  const getRiskLabel = (level: string) => {
    return (t as any)[level] || level;
  };

  const getIndicatorLabel = (key: string) => {
    return (t as any)[key] || key;
  };

  return (
    <div className="space-y-6">
      <div className="glass rounded-xl p-4">
        <textarea value={inputText} onChange={(e) => { setInputText(e.target.value); setResult(null); }}
          placeholder={t.pasteSms}
          className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/50 resize-none h-32 outline-none text-sm" />
        <div className="flex justify-between items-center mt-3">
          <span className="text-xs text-muted-foreground">{inputText.length} {t.characters}</span>
          <button onClick={handleAnalyze} disabled={!inputText.trim() || isAnalyzing}
            className="gradient-primary text-primary-foreground px-6 py-2 rounded-lg text-sm font-semibold disabled:opacity-50 transition-all">
            {isAnalyzing ? t.analyzing : t.analyze}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isAnalyzing && (
          <motion.div className="glass rounded-xl p-8 flex flex-col items-center"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center animate-pulse mb-3">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">{t.analyzing}</p>
          </motion.div>
        )}

        {result && !isAnalyzing && (
          <motion.div className="space-y-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Probability & Risk Level */}
            <div className="glass rounded-xl p-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">{t.resultTitle}</p>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
                    <motion.circle cx="60" cy="60" r="50" fill="none" stroke={getRiskColor(result.riskLevel)} strokeWidth="6"
                      strokeLinecap="round" strokeDasharray={2 * Math.PI * 50}
                      initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 50 - (result.probability / 100) * 2 * Math.PI * 50 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      transform="rotate(-90 60 60)"
                      style={{ filter: `drop-shadow(0 0 6px ${getRiskColor(result.riskLevel)})` }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span className="text-2xl font-bold" style={{ color: getRiskColor(result.riskLevel) }}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                      {result.probability}%
                    </motion.span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">{t.scamProbability}</p>
                  <p className="text-xl font-bold" style={{ color: getRiskColor(result.riskLevel) }}>
                    {getRiskLabel(result.riskLevel)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{t.riskLevelLabel}</p>
                </div>
              </div>
            </div>

            {/* Indicators */}
            <div className="glass rounded-xl p-5">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{t.detectedIndicators}</p>
              {result.indicators.length > 0 ? (
                <div className="space-y-2">
                  {result.indicators.map((ind, i) => (
                    <motion.div key={ind} className="flex items-center gap-3 text-sm"
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                      <XCircle className="w-4 h-4 flex-shrink-0" style={{ color: getRiskColor(result.riskLevel) }} />
                      <span className="text-foreground">{getIndicatorLabel(ind)}</span>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-muted-foreground">{t.noIndicators}</span>
                </div>
              )}
            </div>

            {/* Risk Breakdown */}
            {result.breakdown.length > 0 && (
              <div className="glass rounded-xl p-5">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{t.riskBreakdown}</p>
                <div className="space-y-3">
                  {result.breakdown.map((item, i) => (
                    <motion.div key={item.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">{getIndicatorLabel(item.label)}</span>
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

            {/* Recommendation */}
            <div className="glass rounded-xl p-5">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{t.recommendation}</p>
              <p className="text-sm text-foreground leading-relaxed">{(t as any)[result.recommendation]}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!result && !isAnalyzing && (
        <div>
          <p className="text-xs text-muted-foreground mb-3 uppercase tracking-widest">{t.trySampleMessages}</p>
          <div className="space-y-2">
            {sampleMessages.map((msg, i) => (
              <button key={i} onClick={() => setInputText(msg)}
                className="w-full text-left glass rounded-lg p-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                {msg}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const DeepfakeTab = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <div className="glass rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-all">
        <div className="w-16 h-16 rounded-full glass flex items-center justify-center mx-auto mb-3">
          <Eye className="w-8 h-8 text-primary" />
        </div>
        <p className="text-foreground font-semibold">{t.dropImage}</p>
        <p className="text-xs text-muted-foreground mt-1">{t.supportsFormats}</p>
      </div>
    </div>
  );
};

const BiometricsTab = () => {
  const { t } = useLanguage();
  const { biometrics, recordKeystroke, recordMouseMove, recordScroll, getBehaviorScore } = useBehavioralBiometrics();
  const [score, setScore] = useState(0);

  useEffect(() => {
    const handleKey = () => recordKeystroke();
    const handleMouse = () => recordMouseMove();
    const handleScrollEvt = () => recordScroll();
    window.addEventListener("keydown", handleKey);
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("scroll", handleScrollEvt);
    return () => { window.removeEventListener("keydown", handleKey); window.removeEventListener("mousemove", handleMouse); window.removeEventListener("scroll", handleScrollEvt); };
  }, [recordKeystroke, recordMouseMove, recordScroll]);

  useEffect(() => {
    const interval = setInterval(() => setScore(getBehaviorScore()), 1000);
    return () => clearInterval(interval);
  }, [getBehaviorScore]);

  const metrics = [
    { icon: Keyboard, label: t.typingSpeed, value: `${biometrics.typingSpeed} ${t.wpm}`, sub: `${biometrics.typingConsistency}% ${t.consistent}` },
    { icon: Mouse, label: t.mouseActivity, value: `${biometrics.mouseMovements}`, sub: t.movementsTracked },
    { icon: Clock, label: t.sessionDuration, value: `${biometrics.sessionDuration}s`, sub: t.activeSession },
    { icon: Smartphone, label: t.deviceTrustLabel, value: `${biometrics.deviceTrust}%`, sub: t.fingerprintMatch },
    { icon: Activity, label: t.scrollPatterns, value: `${biometrics.scrollPatterns}`, sub: t.scrollEvents },
  ];

  return (
    <div className="space-y-6">
      <div className="glass rounded-xl p-6 flex flex-col items-center">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">{t.liveBehavioralScore}</p>
        <TrustScoreRing score={score} />
        <p className="text-sm text-muted-foreground mt-4">{t.interactToSee}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {metrics.map(({ icon: Icon, label, value, sub }, i) => (
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
      <div className="glass rounded-xl p-4">
        <p className="text-xs text-muted-foreground mb-2 uppercase tracking-widest">{t.tryTyping}</p>
        <textarea placeholder={t.typeAnything} onKeyDown={recordKeystroke}
          className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/50 resize-none h-20 outline-none text-sm" />
      </div>
    </div>
  );
};

const SecureCircleTab = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <div className="glass rounded-xl p-6 text-center">
        <h3 className="text-xl font-bold text-foreground mb-2">{t.humanVerification}</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto mb-8">{t.secureCircleDashText}</p>
        <SecureCircleVisual />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="glass rounded-xl p-5">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" /> {t.howItWorks}
          </h4>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2"><span className="text-primary font-bold">1.</span> {t.step1}</li>
            <li className="flex gap-2"><span className="text-primary font-bold">2.</span> {t.step2}</li>
            <li className="flex gap-2"><span className="text-primary font-bold">3.</span> {t.step3}</li>
            <li className="flex gap-2"><span className="text-primary font-bold">4.</span> {t.step4}</li>
          </ol>
        </div>
        <div className="glass rounded-xl p-5">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Brain className="w-4 h-4 text-primary" /> {t.keyFeatures}
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Fingerprint className="w-3 h-3 text-primary" /> {t.offlineBluetooth}</li>
            <li className="flex items-center gap-2"><Fingerprint className="w-3 h-3 text-primary" /> {t.smsFallback}</li>
            <li className="flex items-center gap-2"><Fingerprint className="w-3 h-3 text-primary" /> {t.autoFreezeDetection}</li>
            <li className="flex items-center gap-2"><Fingerprint className="w-3 h-3 text-primary" /> {t.timeBoxed}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
