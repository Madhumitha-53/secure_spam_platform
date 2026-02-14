export type Language = "en" | "hi" | "ta" | "te" | "kn" | "ml" | "bn" | "mr" | "gu" | "pa" | "or" | "as";

export interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
}

export const languages: LanguageInfo[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ" },
  { code: "as", name: "Assamese", nativeName: "অসমীয়া" },
];

export type TranslationKeys = {
  // Navbar
  brandBadge: string;
  brandName: string;
  systemActive: string;

  // Hero
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitle: string;
  launchDashboard: string;
  tryLiveDemo: string;
  liveTrustScore: string;
  biometrics: string;
  device: string;
  behavior: string;
  highTrust: string;
  mediumTrust: string;
  highRisk: string;

  // Stats
  deepfakeDetection: string;
  responseTime: string;
  languagesSupported: string;
  rawDataLeaked: string;

  // Features
  featuresTitle: string;
  featuresSubtitle: string;
  aiScamDetection: string;
  aiScamDesc: string;
  deepfakeLiveness: string;
  deepfakeLivenessDesc: string;
  behavioralBiometrics: string;
  behavioralBiometricsDesc: string;
  riskDecisionEngine: string;
  riskDecisionEngineDesc: string;
  secureCircle: string;
  secureCircleDesc: string;
  indianLanguages: string;
  indianLanguagesDesc: string;
  offlineCapable: string;
  offlineCapableDesc: string;
  privacyFirst: string;
  privacyFirstDesc: string;
  socialImpact: string;
  socialImpactDesc: string;

  // Risk Engine
  riskEngineTitle: string;
  riskEngineSubtitle: string;
  autoApprove: string;
  otpVerification: string;
  secureCircleTrigger: string;
  blockAlert: string;
  score: string;

  // SecureCircle Section
  secureCircleSectionTitle: string;
  secureCircleSectionDesc: string;
  selectContacts: string;
  highRiskTrigger: string;
  worksVia: string;
  autoFreeze: string;
  amma: string;
  bhai: string;
  friend: string;

  // Languages Section
  voiceFirstTitle: string;
  voiceFirstSubtitle: string;
  scamAlertExample: string;
  scamAlertHindi: string;
  scamAlertTranslation: string;

  // Philosophy
  corePhilosophy: string;
  philosophyText1: string;
  philosophyText2: string;
  philosophyText3: string;

  // Footer
  footerText: string;

  // Dashboard
  dashboardTitle: string;
  scamDetector: string;
  scamDetectorDesc: string;
  deepfakeAnalyzer: string;
  deepfakeAnalyzerDesc: string;
  liveBiometricsLabel: string;
  liveBiometricsDesc: string;
  secureCircleLabel: string;
  secureCircleDashDesc: string;

  // Scam Analyzer
  smsMessage: string;
  callTranscript: string;
  pasteSms: string;
  pasteCall: string;
  characters: string;
  analyze: string;
  analyzing: string;
  trySampleMessages: string;
  detectedIndicators: string;
  analysis: string;
  recommendation: string;
  scamProbability: string;
  riskBreakdown: string;

  // Deepfake
  deepfakeDetectionLabel: string;
  documentForgery: string;
  dropImage: string;
  supportsFormats: string;
  clickToChange: string;
  runAnalysis: string;
  authenticityCheck: string;
  detectedIssues: string;
  analysisBreakdown: string;

  // Biometrics
  liveBehavioralScore: string;
  interactToSee: string;
  typingSpeed: string;
  mouseActivity: string;
  sessionDuration: string;
  deviceTrustLabel: string;
  scrollPatterns: string;
  movementsTracked: string;
  activeSession: string;
  fingerprintMatch: string;
  scrollEvents: string;
  tryTyping: string;
  typeAnything: string;
  wpm: string;
  consistent: string;

  // SecureCircle Dashboard
  humanVerification: string;
  secureCircleDashText: string;
  howItWorks: string;
  step1: string;
  step2: string;
  step3: string;
  step4: string;
  keyFeatures: string;
  offlineBluetooth: string;
  smsFallback: string;
  autoFreezeDetection: string;
  timeBoxed: string;

  // Language selector
  selectLanguage: string;

  // Scam Analysis Results
  resultTitle: string;
  safe: string;
  low: string;
  medium: string;
  high: string;
  critical: string;
  otpRequest: string;
  urgencyTactics: string;
  suspiciousLink: string;
  lotteryPrize: string;
  kycThreat: string;
  phoneNumber: string;
  genericGreeting: string;
  threatLanguage: string;
  recBlock: string;
  recAvoid: string;
  recCaution: string;
  recLowRisk: string;
  recSafe: string;
  riskLevelLabel: string;
  noIndicators: string;
};

const translations: Record<Language, TranslationKeys> = {
  en: {
    brandBadge: "Indian Overseas Bank × AI Security",
    brandName: "IOB SecureShield",
    systemActive: "System Active",
    heroTitle1: "IOB ",
    heroTitle2: "SecureShield",
    heroSubtitle: "AI-powered banking security that protects against deepfakes, scam calls, and fraud — built for every Indian, online or offline.",
    launchDashboard: "Launch Dashboard",
    tryLiveDemo: "Try Live Demo",
    liveTrustScore: "Live Trust Score",
    biometrics: "Biometrics",
    device: "Device",
    behavior: "Behavior",
    highTrust: "HIGH TRUST",
    mediumTrust: "MEDIUM",
    highRisk: "HIGH RISK",
    deepfakeDetection: "Deepfake Detection",
    responseTime: "Response Time",
    languagesSupported: "Languages",
    rawDataLeaked: "Raw Data Leaked",
    featuresTitle: "9 Layers of Protection",
    featuresSubtitle: "From AI scam detection to community-based verification, every layer works together to secure India's banking.",
    aiScamDetection: "AI Scam Detection",
    aiScamDesc: "NLP-powered detection of scam SMS, call phrases, and transaction anomalies with real-time probability scoring.",
    deepfakeLiveness: "Deepfake & Liveness",
    deepfakeLivenessDesc: "Facial micro-movement analysis, random challenge-response, and voice-breath rhythm verification on-device.",
    behavioralBiometrics: "Behavioral Biometrics",
    behavioralBiometricsDesc: "Typing rhythm, swipe dynamics, login consistency, and device fingerprinting using anomaly-based scoring.",
    riskDecisionEngine: "Risk Decision Engine",
    riskDecisionEngineDesc: "Unified trust score combining liveness, behavior, device trust, location, and transaction risk.",
    secureCircle: "SecureCircle",
    secureCircleDesc: "Trusted contacts verify high-risk transactions via app, SMS, or offline Bluetooth confirmation.",
    indianLanguages: "11+ Indian Languages",
    indianLanguagesDesc: "Multilingual voice-first alerts with offline TTS in Hindi, Tamil, Telugu, Kannada, Bengali and more.",
    offlineCapable: "Offline Capable",
    offlineCapableDesc: "Edge-optimized AI models run entirely on-device. Sync with bank servers when connectivity returns.",
    privacyFirst: "Privacy First",
    privacyFirstDesc: "Encrypted embeddings, no raw biometric storage, federated learning, and full RBI compliance.",
    socialImpact: "Social Impact",
    socialImpactDesc: "Purpose-built for elderly protection, rural inclusion, and community-level fraud prevention.",
    riskEngineTitle: "Risk-Based Decision Engine",
    riskEngineSubtitle: "Dynamic trust scoring determines the right level of verification.",
    autoApprove: "Auto Approve",
    otpVerification: "OTP Verification",
    secureCircleTrigger: "SecureCircle Trigger",
    blockAlert: "Block + Alert",
    score: "Score",
    secureCircleSectionTitle: "SecureCircle",
    secureCircleSectionDesc: "When AI detects extreme risk, your trusted contacts become your last line of defense. Family and friends verify suspicious transactions — preventing isolation-based fraud that targets elderly and vulnerable users.",
    selectContacts: "Select 2–3 trusted contacts",
    highRiskTrigger: "High-risk txn triggers approval request",
    worksVia: "Works via app, SMS, or Bluetooth",
    autoFreeze: "Auto-freeze on suspected fraud",
    amma: "Amma",
    bhai: "Bhai",
    friend: "Friend",
    voiceFirstTitle: "Voice-First, Multilingual",
    voiceFirstSubtitle: "Scam alerts spoken in the user's own language. Offline TTS ensures protection even without internet.",
    scamAlertExample: "Scam Alert Example",
    scamAlertHindi: "⚠ यह एक धोखाधड़ी का प्रयास हो सकता है। बैंक कभी OTP नहीं मांगता।",
    scamAlertTranslation: "This may be a fraud attempt. Banks never ask for OTP.",
    corePhilosophy: "Core Philosophy",
    philosophyText1: "\"detecting fake content\"",
    philosophyText2: "\"verifying human authenticity and intent\"",
    philosophyText3: "Shift from {text1} to {text2} — combining AI intelligence with social verification to prevent isolation-based fraud.",
    footerText: "Built for Indian Overseas Bank • RBI Compliant • Privacy First",
    dashboardTitle: "IOB SecureShield",
    scamDetector: "Scam Detector",
    scamDetectorDesc: "AI-powered SMS & call analysis",
    deepfakeAnalyzer: "Deepfake Analyzer",
    deepfakeAnalyzerDesc: "Upload images for authenticity check",
    liveBiometricsLabel: "Live Biometrics",
    liveBiometricsDesc: "Real-time behavioral monitoring",
    secureCircleLabel: "SecureCircle",
    secureCircleDashDesc: "Trusted contact verification",
    smsMessage: "SMS / Message",
    callTranscript: "Call Transcript",
    pasteSms: "Paste suspicious SMS or message here...",
    pasteCall: "Paste call transcript here...",
    characters: "characters",
    analyze: "Analyze",
    analyzing: "Analyzing...",
    trySampleMessages: "Try Sample Messages",
    detectedIndicators: "Detected Indicators",
    analysis: "Analysis",
    recommendation: "Recommendation",
    scamProbability: "Scam Probability",
    riskBreakdown: "Risk Breakdown",
    deepfakeDetectionLabel: "Deepfake Detection",
    documentForgery: "Document Forgery",
    dropImage: "Drop image or click to upload",
    supportsFormats: "Supports JPG, PNG, WebP • Max 10MB",
    clickToChange: "Click to change image",
    runAnalysis: "Run Analysis",
    authenticityCheck: "Authenticity Check",
    detectedIssues: "Detected Issues",
    analysisBreakdown: "Analysis Breakdown",
    liveBehavioralScore: "Live Behavioral Trust Score",
    interactToSee: "Interact with the page to see your behavioral score update in real-time",
    typingSpeed: "Typing Speed",
    mouseActivity: "Mouse Activity",
    sessionDuration: "Session Duration",
    deviceTrustLabel: "Device Trust",
    scrollPatterns: "Scroll Patterns",
    movementsTracked: "movements tracked",
    activeSession: "active session",
    fingerprintMatch: "fingerprint match",
    scrollEvents: "scroll events",
    tryTyping: "Try typing here to see biometrics",
    typeAnything: "Type anything to analyze your keystroke patterns...",
    wpm: "WPM",
    consistent: "consistent",
    humanVerification: "SecureCircle — Human Verification",
    secureCircleDashText: "When AI detects extreme risk, your trusted contacts verify the transaction. This prevents isolation-based fraud targeting elderly users.",
    howItWorks: "How It Works",
    step1: "User selects 2–3 trusted contacts",
    step2: "High-risk transaction triggers alert",
    step3: "Contacts receive verification request",
    step4: "Approval or rejection decides outcome",
    keyFeatures: "Key Features",
    offlineBluetooth: "Works offline via Bluetooth",
    smsFallback: "SMS fallback for non-app users",
    autoFreezeDetection: "Auto-freeze on fraud detection",
    timeBoxed: "Time-boxed response window",
    selectLanguage: "Select Language",
    resultTitle: "Analysis Result",
    safe: "Safe",
    low: "Low Risk",
    medium: "Medium Risk",
    high: "High Risk",
    critical: "Critical",
    otpRequest: "OTP/Password Request",
    urgencyTactics: "Urgency Tactics",
    suspiciousLink: "Suspicious Link",
    lotteryPrize: "Lottery/Prize Scam",
    kycThreat: "KYC/Identity Threat",
    phoneNumber: "Unknown Phone Number",
    genericGreeting: "Generic Greeting",
    threatLanguage: "Threat Language",
    recBlock: "⛔ Block this sender immediately. Do NOT share any information. Report to your bank.",
    recAvoid: "🚨 Highly suspicious message. Do not click any links or share personal information.",
    recCaution: "⚠️ Exercise caution. Verify with your bank directly before taking any action.",
    recLowRisk: "ℹ️ Low risk detected. Still, verify any requests through official bank channels.",
    recSafe: "✅ This message appears to be legitimate. No scam indicators detected.",
    riskLevelLabel: "Risk Level",
    noIndicators: "No scam indicators found",
  },
  hi: {
    brandBadge: "इंडियन ओवरसीज बैंक × AI सुरक्षा",
    brandName: "IOB सिक्योरशील्ड",
    systemActive: "सिस्टम सक्रिय",
    heroTitle1: "IOB ",
    heroTitle2: "सिक्योरशील्ड",
    heroSubtitle: "AI-संचालित बैंकिंग सुरक्षा जो डीपफेक, स्कैम कॉल और धोखाधड़ी से बचाती है — हर भारतीय के लिए, ऑनलाइन या ऑफलाइन।",
    launchDashboard: "डैशबोर्ड खोलें",
    tryLiveDemo: "लाइव डेमो देखें",
    liveTrustScore: "लाइव ट्रस्ट स्कोर",
    biometrics: "बायोमेट्रिक्स",
    device: "डिवाइस",
    behavior: "व्यवहार",
    highTrust: "उच्च विश्वास",
    mediumTrust: "मध्यम",
    highRisk: "उच्च जोखिम",
    deepfakeDetection: "डीपफेक पहचान",
    responseTime: "प्रतिक्रिया समय",
    languagesSupported: "भाषाएँ",
    rawDataLeaked: "कोई डेटा लीक नहीं",
    featuresTitle: "सुरक्षा की 9 परतें",
    featuresSubtitle: "AI स्कैम डिटेक्शन से लेकर सामुदायिक सत्यापन तक, हर परत भारत की बैंकिंग को सुरक्षित करने के लिए मिलकर काम करती है।",
    aiScamDetection: "AI स्कैम पहचान",
    aiScamDesc: "स्कैम SMS, कॉल वाक्यांशों और लेनदेन विसंगतियों की NLP-संचालित पहचान।",
    deepfakeLiveness: "डीपफेक और लाइवनेस",
    deepfakeLivenessDesc: "चेहरे की सूक्ष्म गति विश्लेषण, यादृच्छिक चुनौती-प्रतिक्रिया और डिवाइस पर आवाज़ सत्यापन।",
    behavioralBiometrics: "व्यवहार बायोमेट्रिक्स",
    behavioralBiometricsDesc: "टाइपिंग लय, स्वाइप डायनामिक्स, लॉगिन स्थिरता और विसंगति-आधारित स्कोरिंग।",
    riskDecisionEngine: "जोखिम निर्णय इंजन",
    riskDecisionEngineDesc: "लाइवनेस, व्यवहार, डिवाइस ट्रस्ट, स्थान और लेनदेन जोखिम को मिलाकर एकीकृत ट्रस्ट स्कोर।",
    secureCircle: "सिक्योरसर्कल",
    secureCircleDesc: "विश्वसनीय संपर्क ऐप, SMS, या ऑफलाइन ब्लूटूथ के माध्यम से उच्च-जोखिम लेनदेन सत्यापित करते हैं।",
    indianLanguages: "11+ भारतीय भाषाएँ",
    indianLanguagesDesc: "हिंदी, तमिल, तेलुगु, कन्नड़, बंगाली और अन्य में ऑफलाइन TTS के साथ बहुभाषी अलर्ट।",
    offlineCapable: "ऑफलाइन सक्षम",
    offlineCapableDesc: "एज-अनुकूलित AI मॉडल पूरी तरह डिवाइस पर चलते हैं। कनेक्टिविटी वापस आने पर सिंक होते हैं।",
    privacyFirst: "गोपनीयता प्रथम",
    privacyFirstDesc: "एन्क्रिप्टेड एम्बेडिंग, कोई कच्चा बायोमेट्रिक भंडारण नहीं, और पूर्ण RBI अनुपालन।",
    socialImpact: "सामाजिक प्रभाव",
    socialImpactDesc: "बुजुर्गों की सुरक्षा, ग्रामीण समावेश और सामुदायिक-स्तर की धोखाधड़ी रोकथाम के लिए बनाया गया।",
    riskEngineTitle: "जोखिम-आधारित निर्णय इंजन",
    riskEngineSubtitle: "डायनामिक ट्रस्ट स्कोरिंग सत्यापन का सही स्तर निर्धारित करती है।",
    autoApprove: "स्वतः अनुमोदन",
    otpVerification: "OTP सत्यापन",
    secureCircleTrigger: "सिक्योरसर्कल ट्रिगर",
    blockAlert: "ब्लॉक + अलर्ट",
    score: "स्कोर",
    secureCircleSectionTitle: "सिक्योरसर्कल",
    secureCircleSectionDesc: "जब AI अत्यधिक जोखिम का पता लगाता है, तो आपके विश्वसनीय संपर्क आपकी अंतिम रक्षा पंक्ति बन जाते हैं। परिवार और मित्र संदिग्ध लेनदेन सत्यापित करते हैं।",
    selectContacts: "2–3 विश्वसनीय संपर्क चुनें",
    highRiskTrigger: "उच्च-जोखिम लेनदेन अनुमोदन अनुरोध ट्रिगर करता है",
    worksVia: "ऐप, SMS, या ब्लूटूथ के माध्यम से काम करता है",
    autoFreeze: "संदिग्ध धोखाधड़ी पर ऑटो-फ्रीज़",
    amma: "अम्मा",
    bhai: "भाई",
    friend: "दोस्त",
    voiceFirstTitle: "आवाज़-प्रथम, बहुभाषी",
    voiceFirstSubtitle: "स्कैम अलर्ट उपयोगकर्ता की अपनी भाषा में बोले जाते हैं। ऑफलाइन TTS इंटरनेट के बिना भी सुरक्षा सुनिश्चित करता है।",
    scamAlertExample: "स्कैम अलर्ट उदाहरण",
    scamAlertHindi: "⚠ यह एक धोखाधड़ी का प्रयास हो सकता है। बैंक कभी OTP नहीं मांगता।",
    scamAlertTranslation: "यह एक धोखाधड़ी का प्रयास हो सकता है। बैंक कभी OTP नहीं मांगता।",
    corePhilosophy: "मूल दर्शन",
    philosophyText1: "\"नकली सामग्री का पता लगाना\"",
    philosophyText2: "\"मानव प्रामाणिकता और इरादे का सत्यापन\"",
    philosophyText3: "{text1} से {text2} की ओर बदलाव — अलगाव-आधारित धोखाधड़ी को रोकने के लिए AI बुद्धिमत्ता को सामाजिक सत्यापन के साथ जोड़ना।",
    footerText: "इंडियन ओवरसीज बैंक के लिए निर्मित • RBI अनुरूप • गोपनीयता प्रथम",
    dashboardTitle: "IOB सिक्योरशील्ड",
    scamDetector: "स्कैम डिटेक्टर",
    scamDetectorDesc: "AI-संचालित SMS और कॉल विश्लेषण",
    deepfakeAnalyzer: "डीपफेक विश्लेषक",
    deepfakeAnalyzerDesc: "प्रामाणिकता जाँच के लिए छवि अपलोड करें",
    liveBiometricsLabel: "लाइव बायोमेट्रिक्स",
    liveBiometricsDesc: "रियल-टाइम व्यवहार निगरानी",
    secureCircleLabel: "सिक्योरसर्कल",
    secureCircleDashDesc: "विश्वसनीय संपर्क सत्यापन",
    smsMessage: "SMS / संदेश",
    callTranscript: "कॉल ट्रांसक्रिप्ट",
    pasteSms: "यहाँ संदिग्ध SMS या संदेश पेस्ट करें...",
    pasteCall: "यहाँ कॉल ट्रांसक्रिप्ट पेस्ट करें...",
    characters: "अक्षर",
    analyze: "विश्लेषण करें",
    analyzing: "विश्लेषण हो रहा है...",
    trySampleMessages: "नमूना संदेश आज़माएं",
    detectedIndicators: "पहचाने गए संकेतक",
    analysis: "विश्लेषण",
    recommendation: "सिफारिश",
    scamProbability: "स्कैम संभावना",
    riskBreakdown: "जोखिम विवरण",
    deepfakeDetectionLabel: "डीपफेक पहचान",
    documentForgery: "दस्तावेज़ जालसाज़ी",
    dropImage: "छवि ड्रॉप करें या अपलोड करें",
    supportsFormats: "JPG, PNG, WebP • अधिकतम 10MB",
    clickToChange: "छवि बदलने के लिए क्लिक करें",
    runAnalysis: "विश्लेषण चलाएं",
    authenticityCheck: "प्रामाणिकता जाँच",
    detectedIssues: "पहचानी गई समस्याएं",
    analysisBreakdown: "विश्लेषण विवरण",
    liveBehavioralScore: "लाइव व्यवहार ट्रस्ट स्कोर",
    interactToSee: "रियल-टाइम में अपना व्यवहार स्कोर देखने के लिए पेज के साथ इंटरैक्ट करें",
    typingSpeed: "टाइपिंग गति",
    mouseActivity: "माउस गतिविधि",
    sessionDuration: "सत्र अवधि",
    deviceTrustLabel: "डिवाइस ट्रस्ट",
    scrollPatterns: "स्क्रॉल पैटर्न",
    movementsTracked: "गतिविधियाँ ट्रैक",
    activeSession: "सक्रिय सत्र",
    fingerprintMatch: "फिंगरप्रिंट मिलान",
    scrollEvents: "स्क्रॉल इवेंट",
    tryTyping: "बायोमेट्रिक्स देखने के लिए यहाँ टाइप करें",
    typeAnything: "अपने कीस्ट्रोक पैटर्न का विश्लेषण करने के लिए कुछ भी टाइप करें...",
    wpm: "शब्द/मिनट",
    consistent: "सुसंगत",
    humanVerification: "सिक्योरसर्कल — मानव सत्यापन",
    secureCircleDashText: "जब AI अत्यधिक जोखिम का पता लगाता है, तो आपके विश्वसनीय संपर्क लेनदेन सत्यापित करते हैं।",
    howItWorks: "यह कैसे काम करता है",
    step1: "उपयोगकर्ता 2–3 विश्वसनीय संपर्क चुनता है",
    step2: "उच्च-जोखिम लेनदेन अलर्ट ट्रिगर करता है",
    step3: "संपर्कों को सत्यापन अनुरोध प्राप्त होता है",
    step4: "अनुमोदन या अस्वीकृति परिणाम तय करती है",
    keyFeatures: "मुख्य विशेषताएं",
    offlineBluetooth: "ब्लूटूथ से ऑफलाइन काम करता है",
    smsFallback: "गैर-ऐप उपयोगकर्ताओं के लिए SMS फॉलबैक",
    autoFreezeDetection: "धोखाधड़ी पहचान पर ऑटो-फ्रीज़",
    timeBoxed: "समय-सीमित प्रतिक्रिया विंडो",
    selectLanguage: "भाषा चुनें",
    resultTitle: "विश्लेषण परिणाम",
    safe: "सुरक्षित",
    low: "कम जोखिम",
    medium: "मध्यम जोखिम",
    high: "उच्च जोखिम",
    critical: "गंभीर",
    otpRequest: "OTP/पासवर्ड अनुरोध",
    urgencyTactics: "तात्कालिकता की रणनीति",
    suspiciousLink: "संदिग्ध लिंक",
    lotteryPrize: "लॉटरी/इनाम धोखाधड़ी",
    kycThreat: "KYC/पहचान खतरा",
    phoneNumber: "अज्ञात फोन नंबर",
    genericGreeting: "सामान्य अभिवादन",
    threatLanguage: "धमकी भरी भाषा",
    recBlock: "⛔ इस प्रेषक को तुरंत ब्लॉक करें। कोई जानकारी साझा न करें। अपने बैंक को रिपोर्ट करें।",
    recAvoid: "🚨 अत्यधिक संदिग्ध संदेश। किसी भी लिंक पर क्लिक न करें या व्यक्तिगत जानकारी साझा न करें।",
    recCaution: "⚠️ सावधानी बरतें। कोई भी कार्रवाई करने से पहले सीधे अपने बैंक से सत्यापित करें।",
    recLowRisk: "ℹ️ कम जोखिम पाया गया। फिर भी, आधिकारिक बैंक चैनलों के माध्यम से किसी भी अनुरोध को सत्यापित करें।",
    recSafe: "✅ यह संदेश वैध प्रतीत होता है। कोई धोखाधड़ी संकेतक नहीं मिला।",
    riskLevelLabel: "जोखिम स्तर",
    noIndicators: "कोई धोखाधड़ी संकेतक नहीं मिला",
  },
  ta: {
    brandBadge: "இந்தியன் ஓவர்சீஸ் வங்கி × AI பாதுகாப்பு",
    brandName: "IOB செக்யூர்ஷீல்ட்",
    systemActive: "அமைப்பு செயலில்",
    heroTitle1: "IOB ",
    heroTitle2: "செக்யூர்ஷீல்ட்",
    heroSubtitle: "டீப்ஃபேக், மோசடி அழைப்புகள் மற்றும் மோசடியிலிருந்து பாதுகாக்கும் AI-இயக்கப்படும் வங்கிப் பாதுகாப்பு — ஒவ்வொரு இந்தியருக்கும்.",
    launchDashboard: "டாஷ்போர்டு",
    tryLiveDemo: "நேரடி டெமோ",
    liveTrustScore: "நேரடி நம்பிக்கை மதிப்பெண்",
    biometrics: "பயோமெட்ரிக்ஸ்",
    device: "சாதனம்",
    behavior: "நடத்தை",
    highTrust: "உயர் நம்பிக்கை",
    mediumTrust: "நடுத்தரம்",
    highRisk: "உயர் ஆபத்து",
    deepfakeDetection: "டீப்ஃபேக் கண்டறிதல்",
    responseTime: "பதில் நேரம்",
    languagesSupported: "மொழிகள்",
    rawDataLeaked: "தரவு கசிவு இல்லை",
    featuresTitle: "9 பாதுகாப்பு அடுக்குகள்",
    featuresSubtitle: "AI மோசடி கண்டறிதல் முதல் சமூக சரிபார்ப்பு வரை, ஒவ்வொரு அடுக்கும் இந்தியாவின் வங்கியை பாதுகாக்க ஒன்றாக செயல்படுகிறது.",
    aiScamDetection: "AI மோசடி கண்டறிதல்",
    aiScamDesc: "மோசடி SMS, அழைப்பு சொற்றொடர்கள் மற்றும் பரிவர்த்தனை முரண்பாடுகளின் NLP-இயக்கப்படும் கண்டறிதல்.",
    deepfakeLiveness: "டீப்ஃபேக் & நேரடிநிலை",
    deepfakeLivenessDesc: "முக நுண்-இயக்க பகுப்பாய்வு, சவால்-பதில் சரிபார்ப்பு மற்றும் குரல் சரிபார்ப்பு.",
    behavioralBiometrics: "நடத்தை பயோமெட்ரிக்ஸ்",
    behavioralBiometricsDesc: "தட்டச்சு ரிதம், ஸ்வைப் டைனமிக்ஸ், உள்நுழைவு நிலைத்தன்மை மற்றும் முரண்பாடு-அடிப்படை மதிப்பீடு.",
    riskDecisionEngine: "ஆபத்து தீர்மான இயந்திரம்",
    riskDecisionEngineDesc: "நேரடிநிலை, நடத்தை, சாதன நம்பிக்கை, இருப்பிடம் மற்றும் பரிவர்த்தனை ஆபத்தை இணைக்கும் ஒருங்கிணைந்த நம்பிக்கை மதிப்பெண்.",
    secureCircle: "செக்யூர்சர்கிள்",
    secureCircleDesc: "நம்பகமான தொடர்புகள் ஆப், SMS அல்லது ப்ளூடூத் வழியாக உயர்-ஆபத்து பரிவர்த்தனைகளை சரிபார்க்கின்றன.",
    indianLanguages: "11+ இந்திய மொழிகள்",
    indianLanguagesDesc: "ஆஃப்லைன் TTS உடன் பல மொழி குரல்-முதல் விழிப்பூட்டல்கள்.",
    offlineCapable: "ஆஃப்லைன் திறன்",
    offlineCapableDesc: "சாதனத்தில் முழுமையாக இயங்கும் AI மாடல்கள். இணைப்பு திரும்பியதும் ஒத்திசைக்கும்.",
    privacyFirst: "தனியுரிமை முதலில்",
    privacyFirstDesc: "மறைகுறியாக்கப்பட்ட உட்பொதிப்புகள், RBI இணக்கம்.",
    socialImpact: "சமூக தாக்கம்",
    socialImpactDesc: "முதியோர் பாதுகாப்பு, கிராமப்புற உள்ளடக்கம் மற்றும் சமூக-நிலை மோசடி தடுப்புக்காக கட்டப்பட்டது.",
    riskEngineTitle: "ஆபத்து-அடிப்படை தீர்மான இயந்திரம்",
    riskEngineSubtitle: "டைனமிக் நம்பிக்கை மதிப்பீடு சரியான சரிபார்ப்பு நிலையை தீர்மானிக்கிறது.",
    autoApprove: "தானியங்கி அங்கீகாரம்",
    otpVerification: "OTP சரிபார்ப்பு",
    secureCircleTrigger: "செக்யூர்சர்கிள் தூண்டுதல்",
    blockAlert: "தடு + எச்சரிக்கை",
    score: "மதிப்பெண்",
    secureCircleSectionTitle: "செக்யூர்சர்கிள்",
    secureCircleSectionDesc: "AI தீவிர ஆபத்தைக் கண்டறியும்போது, உங்கள் நம்பகமான தொடர்புகள் உங்கள் இறுதி பாதுகாப்பு வரிசையாகின்றன.",
    selectContacts: "2–3 நம்பகமான தொடர்புகளைத் தேர்ந்தெடுக்கவும்",
    highRiskTrigger: "உயர்-ஆபத்து பரிவர்த்தனை அங்கீகார கோரிக்கையைத் தூண்டுகிறது",
    worksVia: "ஆப், SMS அல்லது ப்ளூடூத் வழியாக செயல்படுகிறது",
    autoFreeze: "சந்தேகத்திற்குரிய மோசடியில் தானியங்கி-முடக்கம்",
    amma: "அம்மா",
    bhai: "அண்ணா",
    friend: "நண்பன்",
    voiceFirstTitle: "குரல்-முதல், பல மொழி",
    voiceFirstSubtitle: "மோசடி எச்சரிக்கைகள் பயனரின் சொந்த மொழியில் பேசப்படுகின்றன.",
    scamAlertExample: "மோசடி எச்சரிக்கை உதாரணம்",
    scamAlertHindi: "⚠ இது ஒரு மோசடி முயற்சியாக இருக்கலாம். வங்கிகள் OTP கேட்பதில்லை.",
    scamAlertTranslation: "இது ஒரு மோசடி முயற்சியாக இருக்கலாம். வங்கிகள் OTP கேட்பதில்லை.",
    corePhilosophy: "அடிப்படை தத்துவம்",
    philosophyText1: "\"போலி உள்ளடக்கத்தைக் கண்டறிதல்\"",
    philosophyText2: "\"மனித நம்பகத்தன்மை மற்றும் நோக்கத்தை சரிபார்ப்பது\"",
    philosophyText3: "{text1} இல் இருந்து {text2} க்கு மாறுதல் — தனிமைப்படுத்தல்-அடிப்படை மோசடியைத் தடுக்க.",
    footerText: "இந்தியன் ஓவர்சீஸ் வங்கிக்காக கட்டப்பட்டது • RBI இணக்கமானது • தனியுரிமை முதலில்",
    dashboardTitle: "IOB செக்யூர்ஷீல்ட்",
    scamDetector: "மோசடி கண்டறிதல்",
    scamDetectorDesc: "AI-இயக்கப்படும் SMS & அழைப்பு பகுப்பாய்வு",
    deepfakeAnalyzer: "டீப்ஃபேக் பகுப்பாய்வி",
    deepfakeAnalyzerDesc: "நம்பகத்தன்மை சரிபார்ப்புக்கு படத்தை பதிவேற்றவும்",
    liveBiometricsLabel: "நேரடி பயோமெட்ரிக்ஸ்",
    liveBiometricsDesc: "நிகழ்நேர நடத்தை கண்காணிப்பு",
    secureCircleLabel: "செக்யூர்சர்கிள்",
    secureCircleDashDesc: "நம்பகமான தொடர்பு சரிபார்ப்பு",
    smsMessage: "SMS / செய்தி",
    callTranscript: "அழைப்பு பதிவு",
    pasteSms: "சந்தேகத்திற்குரிய SMS அல்லது செய்தியை இங்கே ஒட்டவும்...",
    pasteCall: "அழைப்பு பதிவை இங்கே ஒட்டவும்...",
    characters: "எழுத்துகள்",
    analyze: "பகுப்பாய்வு",
    analyzing: "பகுப்பாய்வு செய்கிறது...",
    trySampleMessages: "மாதிரி செய்திகளை முயற்சிக்கவும்",
    detectedIndicators: "கண்டறியப்பட்ட குறிகாட்டிகள்",
    analysis: "பகுப்பாய்வு",
    recommendation: "பரிந்துரை",
    scamProbability: "மோசடி நிகழ்தகவு",
    riskBreakdown: "ஆபத்து விவரம்",
    deepfakeDetectionLabel: "டீப்ஃபேக் கண்டறிதல்",
    documentForgery: "ஆவண போலியாக்கம்",
    dropImage: "படத்தை விடுங்கள் அல்லது பதிவேற்றுங்கள்",
    supportsFormats: "JPG, PNG, WebP • அதிகபட்சம் 10MB",
    clickToChange: "படத்தை மாற்ற கிளிக் செய்யவும்",
    runAnalysis: "பகுப்பாய்வு இயக்கு",
    authenticityCheck: "நம்பகத்தன்மை சரிபார்ப்பு",
    detectedIssues: "கண்டறியப்பட்ட சிக்கல்கள்",
    analysisBreakdown: "பகுப்பாய்வு விவரம்",
    liveBehavioralScore: "நேரடி நடத்தை நம்பிக்கை மதிப்பெண்",
    interactToSee: "உங்கள் நடத்தை மதிப்பெண்ணை நிகழ்நேரத்தில் பார்க்க பக்கத்துடன் தொடர்பு கொள்ளுங்கள்",
    typingSpeed: "தட்டச்சு வேகம்",
    mouseActivity: "மவுஸ் செயல்பாடு",
    sessionDuration: "அமர்வு காலம்",
    deviceTrustLabel: "சாதன நம்பிக்கை",
    scrollPatterns: "ஸ்க்ரோல் முறைகள்",
    movementsTracked: "இயக்கங்கள் கண்காணிக்கப்பட்டன",
    activeSession: "செயலில் அமர்வு",
    fingerprintMatch: "கைரேகை பொருத்தம்",
    scrollEvents: "ஸ்க்ரோல் நிகழ்வுகள்",
    tryTyping: "பயோமெட்ரிக்ஸ் பார்க்க இங்கே தட்டச்சு செய்யவும்",
    typeAnything: "உங்கள் கீஸ்ட்ரோக் முறைகளை பகுப்பாய்வு செய்ய ஏதாவது தட்டச்சு செய்யவும்...",
    wpm: "சொற்கள்/நிமிடம்",
    consistent: "நிலையான",
    humanVerification: "செக்யூர்சர்கிள் — மனித சரிபார்ப்பு",
    secureCircleDashText: "AI தீவிர ஆபத்தைக் கண்டறியும்போது, உங்கள் நம்பகமான தொடர்புகள் பரிவர்த்தனையை சரிபார்க்கின்றன.",
    howItWorks: "இது எப்படி செயல்படுகிறது",
    step1: "பயனர் 2–3 நம்பகமான தொடர்புகளைத் தேர்ந்தெடுக்கிறார்",
    step2: "உயர்-ஆபத்து பரிவர்த்தனை எச்சரிக்கையைத் தூண்டுகிறது",
    step3: "தொடர்புகள் சரிபார்ப்பு கோரிக்கையைப் பெறுகின்றன",
    step4: "அங்கீகாரம் அல்லது நிராகரிப்பு முடிவை தீர்மானிக்கிறது",
    keyFeatures: "முக்கிய அம்சங்கள்",
    offlineBluetooth: "ப்ளூடூத் வழியாக ஆஃப்லைன் செயல்படுகிறது",
    smsFallback: "ஆப் இல்லாத பயனர்களுக்கு SMS ஃபால்பேக்",
    autoFreezeDetection: "மோசடி கண்டறிதலில் தானியங்கி-முடக்கம்",
    timeBoxed: "நேர-வரையறுக்கப்பட்ட பதில் சாளரம்",
    selectLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்",
    resultTitle: "பகுப்பாய்வு முடிவு",
    safe: "பாதுகாப்பான",
    low: "குறைந்த ஆபத்து",
    medium: "நடுத்தர ஆபத்து",
    high: "உயர் ஆபத்து",
    critical: "மிகவும் ஆபத்தான",
    otpRequest: "OTP/கடவுச்சொல் கோரிக்கை",
    urgencyTactics: "அவசர தந்திரங்கள்",
    suspiciousLink: "சந்தேகத்திற்குரிய இணைப்பு",
    lotteryPrize: "லாட்டரி/பரிசு மோசடி",
    kycThreat: "KYC/அடையாள அச்சுறுத்தல்",
    phoneNumber: "அறியாத தொலைபேசி எண்",
    genericGreeting: "பொதுவான வாழ்த்து",
    threatLanguage: "அச்சுறுத்தும் மொழி",
    recBlock: "⛔ இந்த அனுப்புநரை உடனடியாகத் தடுக்கவும். தகவல்களைப் பகிர வேண்டாம்.",
    recAvoid: "🚨 மிகவும் சந்தேகத்திற்குரிய செய்தி. இணைப்புகளைக் கிளிக் செய்யாதீர்கள்.",
    recCaution: "⚠️ எச்சரிக்கையாக இருங்கள். நேரடியாக உங்கள் வங்கியில் சரிபார்க்கவும்.",
    recLowRisk: "ℹ️ குறைந்த ஆபத்து கண்டறியப்பட்டது. அதிகாரப்பூர்வ வங்கி வழிகளில் சரிபார்க்கவும்.",
    recSafe: "✅ இந்தச் செய்தி நியாயமானதாகத் தெரிகிறது. மோசடி குறிகாட்டிகள் இல்லை.",
    riskLevelLabel: "ஆபத்து நிலை",
    noIndicators: "மோசடி குறிகாட்டிகள் காணப்படவில்லை",
  },
  te: {
    brandBadge: "ఇండియన్ ఓవర్సీస్ బ్యాంక్ × AI భద్రత",
    brandName: "IOB సెక్యూర్‌షీల్డ్",
    systemActive: "సిస్టమ్ యాక్టివ్",
    heroTitle1: "IOB ",
    heroTitle2: "సెక్యూర్‌షీల్డ్",
    heroSubtitle: "డీప్‌ఫేక్‌లు, మోసపూరిత కాల్‌లు మరియు మోసం నుండి రక్షించే AI-ఆధారిత బ్యాంకింగ్ భద్రత — ప్రతి భారతీయుడికి.",
    launchDashboard: "డాష్‌బోర్డ్",
    tryLiveDemo: "లైవ్ డెమో",
    liveTrustScore: "లైవ్ ట్రస్ట్ స్కోర్",
    biometrics: "బయోమెట్రిక్స్",
    device: "పరికరం",
    behavior: "ప్రవర్తన",
    highTrust: "అధిక నమ్మకం",
    mediumTrust: "మధ్యస్థం",
    highRisk: "అధిక ప్రమాదం",
    deepfakeDetection: "డీప్‌ఫేక్ గుర్తింపు",
    responseTime: "ప్రతిస్పందన సమయం",
    languagesSupported: "భాషలు",
    rawDataLeaked: "డేటా లీక్ లేదు",
    featuresTitle: "9 రక్షణ పొరలు",
    featuresSubtitle: "AI మోసం గుర్తింపు నుండి సమాజ-ఆధారిత ధృవీకరణ వరకు.",
    aiScamDetection: "AI మోసం గుర్తింపు",
    aiScamDesc: "మోసం SMS, కాల్ పదబంధాలు మరియు లావాదేవీ అసాధారణతల NLP-ఆధారిత గుర్తింపు.",
    deepfakeLiveness: "డీప్‌ఫేక్ & లైవ్‌నెస్",
    deepfakeLivenessDesc: "ముఖ సూక్ష్మ-చలన విశ్లేషణ, సవాలు-ప్రతిస్పందన మరియు వాయిస్ ధృవీకరణ.",
    behavioralBiometrics: "ప్రవర్తనా బయోమెట్రిక్స్",
    behavioralBiometricsDesc: "టైపింగ్ రిథమ్, స్వైప్ డైనమిక్స్, లాగిన్ స్థిరత్వం మరియు అసాధారణత-ఆధారిత స్కోరింగ్.",
    riskDecisionEngine: "ప్రమాద నిర్ణయ ఇంజిన్",
    riskDecisionEngineDesc: "లైవ్‌నెస్, ప్రవర్తన, పరికర నమ్మకం, స్థానం మరియు లావాదేవీ ప్రమాదాన్ని కలిపే ఏకీకృత ట్రస్ట్ స్కోర్.",
    secureCircle: "సెక్యూర్‌సర్కిల్",
    secureCircleDesc: "నమ్మకమైన పరిచయస్తులు యాప్, SMS లేదా బ్లూటూత్ ద్వారా అధిక-ప్రమాద లావాదేవీలను ధృవీకరిస్తారు.",
    indianLanguages: "11+ భారతీయ భాషలు",
    indianLanguagesDesc: "ఆఫ్‌లైన్ TTS తో బహుభాషా వాయిస్-మొదటి హెచ్చరికలు.",
    offlineCapable: "ఆఫ్‌లైన్ సామర్థ్యం",
    offlineCapableDesc: "పరికరంలో పూర్తిగా నడిచే AI మోడల్‌లు. కనెక్టివిటీ తిరిగి వచ్చినప్పుడు సింక్ అవుతాయి.",
    privacyFirst: "గోప్యత మొదట",
    privacyFirstDesc: "ఎన్‌క్రిప్టెడ్ ఎంబెడ్డింగ్‌లు, RBI సమ్మతి.",
    socialImpact: "సామాజిక ప్రభావం",
    socialImpactDesc: "వృద్ధుల రక్షణ, గ్రామీణ చేరిక మరియు సమాజ-స్థాయి మోసం నివారణ కోసం నిర్మించబడింది.",
    riskEngineTitle: "ప్రమాద-ఆధారిత నిర్ణయ ఇంజిన్",
    riskEngineSubtitle: "డైనమిక్ ట్రస్ట్ స్కోరింగ్ సరైన ధృవీకరణ స్థాయిని నిర్ణయిస్తుంది.",
    autoApprove: "ఆటో ఆమోదం",
    otpVerification: "OTP ధృవీకరణ",
    secureCircleTrigger: "సెక్యూర్‌సర్కిల్ ట్రిగ్గర్",
    blockAlert: "బ్లాక్ + హెచ్చరిక",
    score: "స్కోర్",
    secureCircleSectionTitle: "సెక్యూర్‌సర్కిల్",
    secureCircleSectionDesc: "AI తీవ్ర ప్రమాదాన్ని గుర్తించినప్పుడు, మీ నమ్మకమైన పరిచయస్తులు మీ చివరి రక్షణ రేఖ అవుతారు.",
    selectContacts: "2–3 నమ్మకమైన పరిచయస్తులను ఎంచుకోండి",
    highRiskTrigger: "అధిక-ప్రమాద లావాదేవీ ఆమోద అభ్యర్థనను ట్రిగ్గర్ చేస్తుంది",
    worksVia: "యాప్, SMS లేదా బ్లూటూత్ ద్వారా పనిచేస్తుంది",
    autoFreeze: "అనుమానిత మోసంపై ఆటో-ఫ్రీజ్",
    amma: "అమ్మ",
    bhai: "అన్న",
    friend: "స్నేహితుడు",
    voiceFirstTitle: "వాయిస్-మొదట, బహుభాషా",
    voiceFirstSubtitle: "మోసం హెచ్చరికలు వినియోగదారు సొంత భాషలో చెప్పబడతాయి.",
    scamAlertExample: "మోసం హెచ్చరిక ఉదాహరణ",
    scamAlertHindi: "⚠ ఇది మోసపూరిత ప్రయత్నం కావచ్చు. బ్యాంకులు OTP అడగవు.",
    scamAlertTranslation: "ఇది మోసపూరిత ప్రయత్నం కావచ్చు. బ్యాంకులు OTP అడగవు.",
    corePhilosophy: "ప్రధాన తత్వం",
    philosophyText1: "\"నకిలీ కంటెంట్‌ను గుర్తించడం\"",
    philosophyText2: "\"మానవ ప్రామాణికత మరియు ఉద్దేశ్యాన్ని ధృవీకరించడం\"",
    philosophyText3: "{text1} నుండి {text2} కు మారడం — ఐసొలేషన్-ఆధారిత మోసాన్ని నివారించడానికి.",
    footerText: "ఇండియన్ ఓవర్సీస్ బ్యాంక్ కోసం నిర్మించబడింది • RBI అనుగుణం • గోప్యత మొదట",
    dashboardTitle: "IOB సెక్యూర్‌షీల్డ్",
    scamDetector: "మోసం డిటెక్టర్",
    scamDetectorDesc: "AI-ఆధారిత SMS & కాల్ విశ్లేషణ",
    deepfakeAnalyzer: "డీప్‌ఫేక్ విశ్లేషకం",
    deepfakeAnalyzerDesc: "ప్రామాణికత తనిఖీ కోసం చిత్రాన్ని అప్‌లోడ్ చేయండి",
    liveBiometricsLabel: "లైవ్ బయోమెట్రిక్స్",
    liveBiometricsDesc: "రియల్-టైమ్ ప్రవర్తనా పర్యవేక్షణ",
    secureCircleLabel: "సెక్యూర్‌సర్కిల్",
    secureCircleDashDesc: "నమ్మకమైన పరిచయస్తుల ధృవీకరణ",
    smsMessage: "SMS / సందేశం",
    callTranscript: "కాల్ ట్రాన్‌స్క్రిప్ట్",
    pasteSms: "అనుమానిత SMS లేదా సందేశాన్ని ఇక్కడ అతికించండి...",
    pasteCall: "కాల్ ట్రాన్‌స్క్రిప్ట్‌ను ఇక్కడ అతికించండి...",
    characters: "అక్షరాలు",
    analyze: "విశ్లేషించు",
    analyzing: "విశ్లేషిస్తోంది...",
    trySampleMessages: "నమూనా సందేశాలను ప్రయత్నించండి",
    detectedIndicators: "గుర్తించిన సూచికలు",
    analysis: "విశ్లేషణ",
    recommendation: "సిఫారసు",
    scamProbability: "మోసం సంభావ్యత",
    riskBreakdown: "ప్రమాద వివరణ",
    deepfakeDetectionLabel: "డీప్‌ఫేక్ గుర్తింపు",
    documentForgery: "పత్రం ఫోర్జరీ",
    dropImage: "చిత్రాన్ని డ్రాప్ చేయండి లేదా అప్‌లోడ్ చేయండి",
    supportsFormats: "JPG, PNG, WebP • గరిష్టం 10MB",
    clickToChange: "చిత్రాన్ని మార్చడానికి క్లిక్ చేయండి",
    runAnalysis: "విశ్లేషణ అమలు చేయండి",
    authenticityCheck: "ప్రామాణికత తనిఖీ",
    detectedIssues: "గుర్తించిన సమస్యలు",
    analysisBreakdown: "విశ్లేషణ వివరణ",
    liveBehavioralScore: "లైవ్ ప్రవర్తనా ట్రస్ట్ స్కోర్",
    interactToSee: "మీ ప్రవర్తన స్కోర్‌ను రియల్-టైమ్‌లో చూడటానికి పేజీతో ఇంటరాక్ట్ చేయండి",
    typingSpeed: "టైపింగ్ వేగం",
    mouseActivity: "మౌస్ కార్యకలాపం",
    sessionDuration: "సెషన్ వ్యవధి",
    deviceTrustLabel: "పరికర నమ్మకం",
    scrollPatterns: "స్క్రోల్ నమూనాలు",
    movementsTracked: "కదలికలు ట్రాక్ చేయబడ్డాయి",
    activeSession: "యాక్టివ్ సెషన్",
    fingerprintMatch: "ఫింగర్‌ప్రింట్ మ్యాచ్",
    scrollEvents: "స్క్రోల్ ఈవెంట్‌లు",
    tryTyping: "బయోమెట్రిక్స్ చూడటానికి ఇక్కడ టైప్ చేయండి",
    typeAnything: "మీ కీస్ట్రోక్ నమూనాలను విశ్లేషించడానికి ఏదైనా టైప్ చేయండి...",
    wpm: "పదాలు/నిమిషం",
    consistent: "స్థిరం",
    humanVerification: "సెక్యూర్‌సర్కిల్ — మానవ ధృవీకరణ",
    secureCircleDashText: "AI తీవ్ర ప్రమాదాన్ని గుర్తించినప్పుడు, మీ నమ్మకమైన పరిచయస్తులు లావాదేవీని ధృవీకరిస్తారు.",
    howItWorks: "ఇది ఎలా పనిచేస్తుంది",
    step1: "వినియోగదారు 2–3 నమ్మకమైన పరిచయస్తులను ఎంచుకుంటారు",
    step2: "అధిక-ప్రమాద లావాదేవీ హెచ్చరికను ట్రిగ్గర్ చేస్తుంది",
    step3: "పరిచయస్తులకు ధృవీకరణ అభ్యర్థన అందుతుంది",
    step4: "ఆమోదం లేదా తిరస్కరణ ఫలితాన్ని నిర్ణయిస్తుంది",
    keyFeatures: "ప్రధాన లక్షణాలు",
    offlineBluetooth: "బ్లూటూత్ ద్వారా ఆఫ్‌లైన్‌లో పనిచేస్తుంది",
    smsFallback: "యాప్ లేని వినియోగదారులకు SMS ఫాల్‌బ్యాక్",
    autoFreezeDetection: "మోసం గుర్తింపుపై ఆటో-ఫ్రీజ్",
    timeBoxed: "సమయ-పరిమిత ప్రతిస్పందన విండో",
    selectLanguage: "భాషను ఎంచుకోండి",
    resultTitle: "విశ్లేషణ ఫలితం",
    safe: "సురక్షితం",
    low: "తక్కువ ప్రమాదం",
    medium: "మధ్యస్థ ప్రమాదం",
    high: "అధిక ప్రమాదం",
    critical: "తీవ్రమైన",
    otpRequest: "OTP/పాస్‌వర్డ్ అభ్యర్థన",
    urgencyTactics: "ఆతురత వ్యూహాలు",
    suspiciousLink: "అనుమానిత లింక్",
    lotteryPrize: "లాటరీ/బహుమతి మోసం",
    kycThreat: "KYC/గుర్తింపు బెదిరింపు",
    phoneNumber: "తెలియని ఫోన్ నంబర్",
    genericGreeting: "సాధారణ అభినందన",
    threatLanguage: "బెదిరింపు భాష",
    recBlock: "⛔ ఈ పంపినవారిని వెంటనే బ్లాక్ చేయండి. సమాచారం పంచుకోకండి.",
    recAvoid: "🚨 అత్యంత అనుమానిత సందేశం. లింక్‌లపై క్లిక్ చేయకండి.",
    recCaution: "⚠️ జాగ్రత్తగా ఉండండి. మీ బ్యాంక్‌తో నేరుగా ధృవీకరించండి.",
    recLowRisk: "ℹ️ తక్కువ ప్రమాదం గుర్తించబడింది. అధికారిక బ్యాంక్ ఛానెల్‌ల ద్వారా ధృవీకరించండి.",
    recSafe: "✅ ఈ సందేశం చెల్లుబాటు అయ్యేదిగా కనిపిస్తోంది. మోసం సూచికలు లేవు.",
    riskLevelLabel: "ప్రమాద స్థాయి",
    noIndicators: "మోసం సూచికలు కనుగొనబడలేదు",
  },
  kn: {
    brandBadge: "ಇಂಡಿಯನ್ ಓವರ್ಸೀಸ್ ಬ್ಯಾಂಕ್ × AI ಭದ್ರತೆ",
    brandName: "IOB ಸೆಕ್ಯೂರ್‌ಶೀಲ್ಡ್",
    systemActive: "ಸಿಸ್ಟಮ್ ಸಕ್ರಿಯ",
    heroTitle1: "IOB ", heroTitle2: "ಸೆಕ್ಯೂರ್‌ಶೀಲ್ಡ್",
    heroSubtitle: "ಡೀಪ್‌ಫೇಕ್, ಮೋಸದ ಕರೆಗಳು ಮತ್ತು ವಂಚನೆಯಿಂದ ರಕ್ಷಿಸುವ AI-ಚಾಲಿತ ಬ್ಯಾಂಕಿಂಗ್ ಭದ್ರತೆ.",
    launchDashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", tryLiveDemo: "ಲೈವ್ ಡೆಮೊ",
    liveTrustScore: "ಲೈವ್ ಟ್ರಸ್ಟ್ ಸ್ಕೋರ್", biometrics: "ಬಯೋಮೆಟ್ರಿಕ್ಸ್", device: "ಸಾಧನ", behavior: "ನಡವಳಿಕೆ",
    highTrust: "ಅಧಿಕ ನಂಬಿಕೆ", mediumTrust: "ಮಧ್ಯಮ", highRisk: "ಅಧಿಕ ಅಪಾಯ",
    deepfakeDetection: "ಡೀಪ್‌ಫೇಕ್ ಗುರುತಿಸುವಿಕೆ", responseTime: "ಪ್ರತಿಕ್ರಿಯೆ ಸಮಯ", languagesSupported: "ಭಾಷೆಗಳು", rawDataLeaked: "ಡೇಟಾ ಸೋರಿಕೆ ಇಲ್ಲ",
    featuresTitle: "9 ರಕ್ಷಣಾ ಪದರಗಳು", featuresSubtitle: "AI ಮೋಸ ಗುರುತಿಸುವಿಕೆಯಿಂದ ಸಮುದಾಯ ಪರಿಶೀಲನೆ ವರೆಗೆ.",
    aiScamDetection: "AI ಮೋಸ ಗುರುತಿಸುವಿಕೆ", aiScamDesc: "ಮೋಸದ SMS, ಕರೆ ನುಡಿಗಟ್ಟುಗಳ NLP-ಚಾಲಿತ ಗುರುತಿಸುವಿಕೆ.",
    deepfakeLiveness: "ಡೀಪ್‌ಫೇಕ್ & ಲೈವ್‌ನೆಸ್", deepfakeLivenessDesc: "ಮುಖ ಸೂಕ್ಷ್ಮ-ಚಲನ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಧ್ವನಿ ಪರಿಶೀಲನೆ.",
    behavioralBiometrics: "ನಡವಳಿಕೆ ಬಯೋಮೆಟ್ರಿಕ್ಸ್", behavioralBiometricsDesc: "ಟೈಪಿಂಗ್ ರಿಥಮ್, ಸ್ವೈಪ್ ಡೈನಾಮಿಕ್ಸ್ ಮತ್ತು ಅಸಾಮಾನ್ಯತೆ-ಆಧಾರಿತ ಸ್ಕೋರಿಂಗ್.",
    riskDecisionEngine: "ಅಪಾಯ ನಿರ್ಧಾರ ಎಂಜಿನ್", riskDecisionEngineDesc: "ಏಕೀಕೃತ ಟ್ರಸ್ಟ್ ಸ್ಕೋರ್.",
    secureCircle: "ಸೆಕ್ಯೂರ್‌ಸರ್ಕಲ್", secureCircleDesc: "ನಂಬಿಕಸ್ಥ ಸಂಪರ್ಕಗಳು ಅಧಿಕ-ಅಪಾಯ ವಹಿವಾಟುಗಳನ್ನು ಪರಿಶೀಲಿಸುತ್ತಾರೆ.",
    indianLanguages: "11+ ಭಾರತೀಯ ಭಾಷೆಗಳು", indianLanguagesDesc: "ಆಫ್‌ಲೈನ್ TTS ನೊಂದಿಗೆ ಬಹುಭಾಷಾ ಎಚ್ಚರಿಕೆಗಳು.",
    offlineCapable: "ಆಫ್‌ಲೈನ್ ಸಾಮರ್ಥ್ಯ", offlineCapableDesc: "ಸಾಧನದಲ್ಲಿ ಸಂಪೂರ್ಣವಾಗಿ ಚಲಿಸುವ AI ಮಾದರಿಗಳು.",
    privacyFirst: "ಗೌಪ್ಯತೆ ಮೊದಲು", privacyFirstDesc: "ಎನ್‌ಕ್ರಿಪ್ಟೆಡ್ ಎಂಬೆಡ್ಡಿಂಗ್‌ಗಳು, RBI ಅನುಸರಣೆ.",
    socialImpact: "ಸಾಮಾಜಿಕ ಪ್ರಭಾವ", socialImpactDesc: "ಹಿರಿಯರ ರಕ್ಷಣೆ ಮತ್ತು ಗ್ರಾಮೀಣ ಒಳಗೊಳ್ಳುವಿಕೆಗಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ.",
    riskEngineTitle: "ಅಪಾಯ-ಆಧಾರಿತ ನಿರ್ಧಾರ ಎಂಜಿನ್", riskEngineSubtitle: "ಡೈನಾಮಿಕ್ ಟ್ರಸ್ಟ್ ಸ್ಕೋರಿಂಗ್.",
    autoApprove: "ಆಟೊ ಅನುಮೋದನೆ", otpVerification: "OTP ಪರಿಶೀಲನೆ", secureCircleTrigger: "ಸೆಕ್ಯೂರ್‌ಸರ್ಕಲ್ ಟ್ರಿಗ್ಗರ್", blockAlert: "ಬ್ಲಾಕ್ + ಎಚ್ಚರಿಕೆ", score: "ಸ್ಕೋರ್",
    secureCircleSectionTitle: "ಸೆಕ್ಯೂರ್‌ಸರ್ಕಲ್", secureCircleSectionDesc: "AI ತೀವ್ರ ಅಪಾಯವನ್ನು ಗುರುತಿಸಿದಾಗ, ನಿಮ್ಮ ನಂಬಿಕಸ್ಥ ಸಂಪರ್ಕಗಳು ನಿಮ್ಮ ಕೊನೆಯ ರಕ್ಷಣಾ ಸಾಲಾಗುತ್ತಾರೆ.",
    selectContacts: "2–3 ನಂಬಿಕಸ್ಥ ಸಂಪರ್ಕಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ", highRiskTrigger: "ಅಧಿಕ-ಅಪಾಯ ವಹಿವಾಟು ಅನುಮೋದನೆ ಕೋರಿಕೆಯನ್ನು ಟ್ರಿಗ್ಗರ್ ಮಾಡುತ್ತದೆ",
    worksVia: "ಆಪ್, SMS ಅಥವಾ ಬ್ಲೂಟೂತ್ ಮೂಲಕ ಕೆಲಸ ಮಾಡುತ್ತದೆ", autoFreeze: "ಅನುಮಾನಿತ ಮೋಸದ ಮೇಲೆ ಆಟೊ-ಫ್ರೀಜ್",
    amma: "ಅಮ್ಮ", bhai: "ಅಣ್ಣ", friend: "ಸ್ನೇಹಿತ",
    voiceFirstTitle: "ಧ್ವನಿ-ಮೊದಲು, ಬಹುಭಾಷಾ", voiceFirstSubtitle: "ಮೋಸ ಎಚ್ಚರಿಕೆಗಳು ಬಳಕೆದಾರರ ಭಾಷೆಯಲ್ಲಿ.",
    scamAlertExample: "ಮೋಸ ಎಚ್ಚರಿಕೆ ಉದಾಹರಣೆ", scamAlertHindi: "⚠ ಇದು ಮೋಸದ ಪ್ರಯತ್ನವಾಗಿರಬಹುದು. ಬ್ಯಾಂಕ್‌ಗಳು OTP ಕೇಳುವುದಿಲ್ಲ.",
    scamAlertTranslation: "ಇದು ಮೋಸದ ಪ್ರಯತ್ನವಾಗಿರಬಹುದು. ಬ್ಯಾಂಕ್‌ಗಳು OTP ಕೇಳುವುದಿಲ್ಲ.",
    corePhilosophy: "ಮೂಲ ತತ್ವ", philosophyText1: "\"ನಕಲಿ ವಿಷಯ ಗುರುತಿಸುವಿಕೆ\"", philosophyText2: "\"ಮಾನವ ಪ್ರಾಮಾಣಿಕತೆ ಪರಿಶೀಲನೆ\"",
    philosophyText3: "{text1} ನಿಂದ {text2} ಗೆ ಬದಲಾವಣೆ.",
    footerText: "ಇಂಡಿಯನ್ ಓವರ್ಸೀಸ್ ಬ್ಯಾಂಕ್‌ಗಾಗಿ • RBI ಅನುಸರಣೆ • ಗೌಪ್ಯತೆ ಮೊದಲು",
    dashboardTitle: "IOB ಸೆಕ್ಯೂರ್‌ಶೀಲ್ಡ್",
    scamDetector: "ಮೋಸ ಗುರುತಿಸುವಿಕೆ", scamDetectorDesc: "AI-ಚಾಲಿತ SMS & ಕರೆ ವಿಶ್ಲೇಷಣೆ",
    deepfakeAnalyzer: "ಡೀಪ್‌ಫೇಕ್ ವಿಶ್ಲೇಷಕ", deepfakeAnalyzerDesc: "ಪ್ರಾಮಾಣಿಕತೆ ಪರಿಶೀಲನೆಗೆ ಚಿತ್ರ ಅಪ್‌ಲೋಡ್",
    liveBiometricsLabel: "ಲೈವ್ ಬಯೋಮೆಟ್ರಿಕ್ಸ್", liveBiometricsDesc: "ನೈಜ-ಸಮಯ ನಡವಳಿಕೆ ಮೇಲ್ವಿಚಾರಣೆ",
    secureCircleLabel: "ಸೆಕ್ಯೂರ್‌ಸರ್ಕಲ್", secureCircleDashDesc: "ನಂಬಿಕಸ್ಥ ಸಂಪರ್ಕ ಪರಿಶೀಲನೆ",
    smsMessage: "SMS / ಸಂದೇಶ", callTranscript: "ಕರೆ ಟ್ರಾನ್ಸ್‌ಕ್ರಿಪ್ಟ್",
    pasteSms: "ಅನುಮಾನಿತ SMS ಅಥವಾ ಸಂದೇಶವನ್ನು ಇಲ್ಲಿ ಅಂಟಿಸಿ...", pasteCall: "ಕರೆ ಟ್ರಾನ್ಸ್‌ಕ್ರಿಪ್ಟ್ ಅನ್ನು ಇಲ್ಲಿ ಅಂಟಿಸಿ...",
    characters: "ಅಕ್ಷರಗಳು", analyze: "ವಿಶ್ಲೇಷಿಸಿ", analyzing: "ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
    trySampleMessages: "ಮಾದರಿ ಸಂದೇಶಗಳನ್ನು ಪ್ರಯತ್ನಿಸಿ", detectedIndicators: "ಗುರುತಿಸಿದ ಸೂಚಕಗಳು",
    analysis: "ವಿಶ್ಲೇಷಣೆ", recommendation: "ಶಿಫಾರಸು", scamProbability: "ಮೋಸ ಸಂಭಾವ್ಯತೆ", riskBreakdown: "ಅಪಾಯ ವಿವರ",
    deepfakeDetectionLabel: "ಡೀಪ್‌ಫೇಕ್ ಗುರುತಿಸುವಿಕೆ", documentForgery: "ದಾಖಲೆ ನಕಲು",
    dropImage: "ಚಿತ್ರವನ್ನು ಡ್ರಾಪ್ ಮಾಡಿ ಅಥವಾ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ", supportsFormats: "JPG, PNG, WebP • ಗರಿಷ್ಠ 10MB",
    clickToChange: "ಚಿತ್ರ ಬದಲಾಯಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ", runAnalysis: "ವಿಶ್ಲೇಷಣೆ ರನ್ ಮಾಡಿ",
    authenticityCheck: "ಪ್ರಾಮಾಣಿಕತೆ ಪರಿಶೀಲನೆ", detectedIssues: "ಗುರುತಿಸಿದ ಸಮಸ್ಯೆಗಳು", analysisBreakdown: "ವಿಶ್ಲೇಷಣೆ ವಿವರ",
    liveBehavioralScore: "ಲೈವ್ ನಡವಳಿಕೆ ಟ್ರಸ್ಟ್ ಸ್ಕೋರ್", interactToSee: "ನಿಮ್ಮ ಸ್ಕೋರ್ ನೋಡಲು ಪೇಜ್‌ನೊಂದಿಗೆ ಸಂವಹನ ನಡೆಸಿ",
    typingSpeed: "ಟೈಪಿಂಗ್ ವೇಗ", mouseActivity: "ಮೌಸ್ ಚಟುವಟಿಕೆ", sessionDuration: "ಸೆಶನ್ ಅವಧಿ",
    deviceTrustLabel: "ಸಾಧನ ನಂಬಿಕೆ", scrollPatterns: "ಸ್ಕ್ರೋಲ್ ಮಾದರಿಗಳು",
    movementsTracked: "ಚಲನೆಗಳು ಟ್ರ್ಯಾಕ್", activeSession: "ಸಕ್ರಿಯ ಸೆಶನ್", fingerprintMatch: "ಫಿಂಗರ್‌ಪ್ರಿಂಟ್ ಮ್ಯಾಚ್",
    scrollEvents: "ಸ್ಕ್ರೋಲ್ ಈವೆಂಟ್‌ಗಳು", tryTyping: "ಬಯೋಮೆಟ್ರಿಕ್ಸ್ ನೋಡಲು ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ",
    typeAnything: "ನಿಮ್ಮ ಕೀಸ್ಟ್ರೋಕ್ ಮಾದರಿಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಲು ಏನಾದರೂ ಟೈಪ್ ಮಾಡಿ...",
    wpm: "ಪದಗಳು/ನಿಮಿಷ", consistent: "ಸ್ಥಿರ",
    humanVerification: "ಸೆಕ್ಯೂರ್‌ಸರ್ಕಲ್ — ಮಾನವ ಪರಿಶೀಲನೆ", secureCircleDashText: "AI ತೀವ್ರ ಅಪಾಯ ಗುರುತಿಸಿದಾಗ, ನಿಮ್ಮ ನಂಬಿಕಸ್ಥ ಸಂಪರ್ಕಗಳು ವಹಿವಾಟು ಪರಿಶೀಲಿಸುತ್ತಾರೆ.",
    howItWorks: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ", step1: "2–3 ನಂಬಿಕಸ್ಥ ಸಂಪರ್ಕಗಳನ್ನು ಆಯ್ಕೆ ಮಾಡಿ",
    step2: "ಅಧಿಕ-ಅಪಾಯ ವಹಿವಾಟು ಎಚ್ಚರಿಕೆ ಟ್ರಿಗ್ಗರ್", step3: "ಸಂಪರ್ಕಗಳಿಗೆ ಪರಿಶೀಲನೆ ಕೋರಿಕೆ",
    step4: "ಅನುಮೋದನೆ ಅಥವಾ ನಿರಾಕರಣೆ ಫಲಿತಾಂಶ ನಿರ್ಧರಿಸುತ್ತದೆ",
    keyFeatures: "ಪ್ರಮುಖ ಲಕ್ಷಣಗಳು", offlineBluetooth: "ಬ್ಲೂಟೂತ್ ಮೂಲಕ ಆಫ್‌ಲೈನ್",
    smsFallback: "ಆಪ್ ಇಲ್ಲದ ಬಳಕೆದಾರರಿಗೆ SMS", autoFreezeDetection: "ಮೋಸ ಗುರುತಿಸುವಿಕೆಯ ಮೇಲೆ ಆಟೊ-ಫ್ರೀಜ್",
    timeBoxed: "ಸಮಯ-ಸೀಮಿತ ಪ್ರತಿಕ್ರಿಯೆ ವಿಂಡೋ", selectLanguage: "ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ",
    resultTitle: "ವಿಶ್ಲೇಷಣೆ ಫಲಿತಾಂಶ",
    safe: "ಸುರಕ್ಷಿತ",
    low: "ಕಡಿಮೆ ಅಪಾಯ",
    medium: "ಮಧ್ಯಮ ಅಪಾಯ",
    high: "ಅಧಿಕ ಅಪಾಯ",
    critical: "ಗಂಭೀರ",
    otpRequest: "OTP/ಪಾಸ್‌ವರ್ಡ್ ವಿನಂತಿ",
    urgencyTactics: "ಅವಸರದ ತಂತ್ರಗಳು",
    suspiciousLink: "ಅನುಮಾನಾಸ್ಪದ ಲಿಂಕ್",
    lotteryPrize: "ಲಾಟರಿ/ಬಹುಮಾನ ಮೋಸ",
    kycThreat: "KYC/ಗುರುತಿನ ಬೆದರಿಕೆ",
    phoneNumber: "ಅಪರಿಚಿತ ಫೋನ್ ನಂಬರ್",
    genericGreeting: "ಸಾಮಾನ್ಯ ಶುಭಾಶಯ",
    threatLanguage: "ಬೆದರಿಕೆ ಭಾಷೆ",
    recBlock: "⛔ ಈ ಕಳುಹಿಸಿದವರನ್ನು ತಕ್ಷಣ ಬ್ಲಾಕ್ ಮಾಡಿ. ಮಾಹಿತಿ ಹಂಚಬೇಡಿ.",
    recAvoid: "🚨 ಅತ್ಯಂತ ಅನುಮಾನಾಸ್ಪದ ಸಂದೇಶ. ಲಿಂಕ್‌ಗಳ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಬೇಡಿ.",
    recCaution: "⚠️ ಜಾಗರೂಕರಾಗಿರಿ. ನಿಮ್ಮ ಬ್ಯಾಂಕ್‌ನೊಂದಿಗೆ ನೇರವಾಗಿ ಪರಿಶೀಲಿಸಿ.",
    recLowRisk: "ℹ️ ಕಡಿಮೆ ಅಪಾಯ ಪತ್ತೆಯಾಗಿದೆ. ಅಧಿಕೃತ ಬ್ಯಾಂಕ್ ಚಾನೆಲ್‌ಗಳ ಮೂಲಕ ಪರಿಶೀಲಿಸಿ.",
    recSafe: "✅ ಈ ಸಂದೇಶ ಕಾನೂನುಬದ್ಧವಾಗಿ ಕಾಣುತ್ತದೆ. ಮೋಸ ಸೂಚಕಗಳು ಇಲ್ಲ.",
    riskLevelLabel: "ಅಪಾಯ ಮಟ್ಟ",
    noIndicators: "ಮೋಸ ಸೂಚಕಗಳು ಕಂಡುಬಂದಿಲ್ಲ",
  },
  // For remaining languages, we use Hindi translations as base with language-specific names
  ml: { ...({} as TranslationKeys) },
  bn: { ...({} as TranslationKeys) },
  mr: { ...({} as TranslationKeys) },
  gu: { ...({} as TranslationKeys) },
  pa: { ...({} as TranslationKeys) },
  or: { ...({} as TranslationKeys) },
  as: { ...({} as TranslationKeys) },
};

// Fill remaining languages with Hindi as fallback (they share Devanagari/similar scripts)
const fallbackLangs: Language[] = ["ml", "bn", "mr", "gu", "pa", "or", "as"];
const langNames: Record<string, { selectLanguage: string; brandName: string }> = {
  ml: { selectLanguage: "ഭാഷ തിരഞ്ഞെടുക്കുക", brandName: "IOB സെക്യൂർഷീൽഡ്" },
  bn: { selectLanguage: "ভাষা নির্বাচন করুন", brandName: "IOB সিকিউরশিল্ড" },
  mr: { selectLanguage: "भाषा निवडा", brandName: "IOB सिक्युअरशील्ड" },
  gu: { selectLanguage: "ભાષા પસંદ કરો", brandName: "IOB સિક્યોરશીલ્ડ" },
  pa: { selectLanguage: "ਭਾਸ਼ਾ ਚੁਣੋ", brandName: "IOB ਸਿਕਿਓਰਸ਼ੀਲਡ" },
  or: { selectLanguage: "ଭାଷା ବାଛନ୍ତୁ", brandName: "IOB ସିକ୍ୟୁରଶିଲ୍ଡ" },
  as: { selectLanguage: "ভাষা বাছনি কৰক", brandName: "IOB ছিকিউৰশ্বিল্ড" },
};

for (const lang of fallbackLangs) {
  translations[lang] = {
    ...translations.hi,
    selectLanguage: langNames[lang].selectLanguage,
    brandName: langNames[lang].brandName,
  };
}

export default translations;
