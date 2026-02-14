export interface ScamIndicator {
  type: string;
  weight: number;
}

export interface ScamResult {
  probability: number;
  riskLevel: "safe" | "low" | "medium" | "high" | "critical";
  indicators: string[];
  recommendation: string;
  breakdown: { label: string; score: number }[];
}

interface IndicatorPattern {
  patterns: RegExp[];
  indicatorKey: string;
  weight: number;
}

const INDICATOR_PATTERNS: IndicatorPattern[] = [
  {
    patterns: [/\botp\b/i, /\bpin\b/i, /\bpassword\b/i, /\bcvv\b/i, /share.*code/i, /send.*code/i],
    indicatorKey: "otpRequest",
    weight: 30,
  },
  {
    patterns: [/urgent/i, /immediately/i, /24\s*hours?/i, /48\s*hours?/i, /blocked/i, /suspend/i, /expire/i, /last\s*chance/i, /act\s*now/i],
    indicatorKey: "urgencyTactics",
    weight: 25,
  },
  {
    patterns: [/bit\.ly/i, /tinyurl/i, /click\s*here/i, /http[s]?:\/\/[^\s]+/i, /\.xyz/i, /\.tk/i],
    indicatorKey: "suspiciousLink",
    weight: 20,
  },
  {
    patterns: [/won\b/i, /winner/i, /lottery/i, /prize/i, /congratulations/i, /reward/i, /claim/i, /₹\s*\d{4,}/i, /Rs\.?\s*\d{4,}/i],
    indicatorKey: "lotteryPrize",
    weight: 25,
  },
  {
    patterns: [/\bkyc\b/i, /\bpan\b/i, /\baadhar\b/i, /\baadhaar\b/i, /update.*details/i, /verify.*account/i],
    indicatorKey: "kycThreat",
    weight: 20,
  },
  {
    patterns: [/call\s*\d{10}/i, /\d{10}/, /contact\s*\d/i],
    indicatorKey: "phoneNumber",
    weight: 10,
  },
  {
    patterns: [/dear\s*customer/i, /valued\s*customer/i, /dear\s*user/i, /dear\s*sir/i],
    indicatorKey: "genericGreeting",
    weight: 10,
  },
  {
    patterns: [/account.*block/i, /bank.*never/i, /fraud.*attempt/i, /unauthorized/i],
    indicatorKey: "threatLanguage",
    weight: 15,
  },
];

export type IndicatorKey = 
  | "otpRequest" | "urgencyTactics" | "suspiciousLink" | "lotteryPrize" 
  | "kycThreat" | "phoneNumber" | "genericGreeting" | "threatLanguage";

export function analyzeScamMessage(text: string): ScamResult {
  const detectedIndicators: string[] = [];
  let totalWeight = 0;
  const breakdownMap = new Map<string, number>();

  for (const { patterns, indicatorKey, weight } of INDICATOR_PATTERNS) {
    const matched = patterns.some((p) => p.test(text));
    if (matched) {
      detectedIndicators.push(indicatorKey);
      totalWeight += weight;
      breakdownMap.set(indicatorKey, weight);
    }
  }

  // Normalize probability 0-100
  const probability = Math.min(98, Math.round((totalWeight / 120) * 100));

  let riskLevel: ScamResult["riskLevel"];
  let recommendationKey: string;

  if (probability >= 80) {
    riskLevel = "critical";
    recommendationKey = "recBlock";
  } else if (probability >= 60) {
    riskLevel = "high";
    recommendationKey = "recAvoid";
  } else if (probability >= 35) {
    riskLevel = "medium";
    recommendationKey = "recCaution";
  } else if (probability > 10) {
    riskLevel = "low";
    recommendationKey = "recLowRisk";
  } else {
    riskLevel = "safe";
    recommendationKey = "recSafe";
  }

  const breakdown = Array.from(breakdownMap.entries()).map(([label, score]) => ({
    label,
    score: Math.round((score / Math.max(totalWeight, 1)) * 100),
  }));

  return {
    probability,
    riskLevel,
    indicators: detectedIndicators,
    recommendation: recommendationKey,
    breakdown,
  };
}
