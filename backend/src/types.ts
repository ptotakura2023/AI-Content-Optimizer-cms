// Defines the structure of the AI's response
export interface ArticleEnrichment {
  seoMetaDescription: string;
  tags: string[];
  socialMediaSummary: string;
}

// Defines the full structure of an article, including the AI-generated parts
export interface Article extends ArticleEnrichment {
  id: string;
  title: string;
  author: string;
  body: string;
}