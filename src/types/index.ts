export interface NotableInvestment {
  companyName: string;
  amount: string;
  date: string;
  round: string;
  description: string;
  exitStatus?: string;
  exitValue?: string;
}

export interface KeyContact {
  name: string;
  title: string;
  focusArea: string;
  experience: string;
  relevanceReason?: string;
  isUserContact?: boolean;
  contactInfo?: string;
}

export interface VCFirmProfile {
  name: string;
  description: string;
  founded: string;
  location: string;
  website: string;
  focusAreas: string[];
  typicalInvestmentSize: string;
  stage: string[];
  notableInvestments: NotableInvestment[];
  keyContacts: KeyContact[];
}

export interface RecentNews {
  title: string;
  source: string;
  date: string;
  url?: string;
  summary: string;
}

export interface Investment {
  companyName: string;
  amount: string;
  date: string;
  round: string;
  description: string;
}

export interface CompetitiveAnalysis {
  companyName: string;
  similarity: string;
  reasoning: string;
  potentialConcerns: string[];
}

export interface AlternativeVC {
  name: string;
  reasoning: string;
  focusAlignment: string;
  contactInfo?: string;
}

export interface VCResearchReport {
  firmProfile: VCFirmProfile;
  recentNews: RecentNews[];
  recentInvestments: Investment[];
  competitiveAnalysis: CompetitiveAnalysis[];
  alternativeVCs: AlternativeVC[];
  generatedAt: string;
}

export interface ResearchRequest {
  vcFirmName: string;
  companyName: string;
  contactName?: string;
}