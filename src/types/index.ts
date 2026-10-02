export interface CarLoanOption {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  keyFeatures: string[];
  iconName: string;
  badge: string;
  carLoanOptions?: CarLoanOption[];
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
