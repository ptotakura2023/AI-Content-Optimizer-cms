// This mirrors the structure in our backend's types.ts
export interface Article {
  id: string;
  title: string;
  author: string;
  body: string;
  seoMetaDescription?: string;
  tags?: string[];
  socialMediaSummary?: string;
}
