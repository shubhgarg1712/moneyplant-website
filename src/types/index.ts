export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  keyFeatures: string[];
  iconName: string;
  badge: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  content: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  tag?: string;
}
