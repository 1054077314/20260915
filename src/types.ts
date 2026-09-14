export type StatusType = "pass" | "warn" | "fail" | "none";

export interface KillLineRecord {
  id: string;
  model: string;
  tier: "T0" | "T1" | "T2" | "T3" | "T4";
  category: "Flagship" | "Flash" | "OpenSource" | "Thinking";
  gold: string;
  diamond: string;
  king: string;
  goldStatus: StatusType;
  diamondStatus: StatusType;
  kingStatus: StatusType;
  quote: string;
  timestamp: string;
  episodesTested: string;
  costEstimate: string;
  tokensConsumed: string;
  analysis: string;
  strengths: string[];
  weaknesses: string[];
  bestFor: string;
  score: number; // 0 - 100 benchmark performance score
}

export interface CostRecord {
  id: string;
  model: string;
  cost: string;
  tokens: string;
  source: string;
  verdict: string;
  badge: string;
  costColor: string;
  estimatedCostYuan: number;
  tokenMillions: number;
  efficiencyRating: "S" | "A" | "B" | "C" | "F";
}

export interface TierRecord {
  tier: "T0" | "T1" | "T2" | "T3" | "T4";
  models: string;
  desc: string;
  badgeColor: string;
  summary: string;
}
