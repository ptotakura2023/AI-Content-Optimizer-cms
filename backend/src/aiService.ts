import { GoogleGenerativeAI } from '@google/generative-ai';
import { ArticleEnrichment } from './types';

// Initialize the Google AI client with the API key from our .env file
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
// FIX: Switched to a more current and compatible model name
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

/**
 * Analyzes the content of an article using Google Gemini to generate
 * SEO metadata, tags, and a social media summary.
 * @param title The title of the article.
 * @param body The main body content of the article.
 * @returns A promise that resolves to an object containing the enriched data.
 */
export async function enrichArticleContent(title: string, body: string): Promise<ArticleEnrichment> {
  console.log('Starting AI content enrichment with Google Gemini...');

  const prompt = `
    You are an expert content strategist and SEO specialist.
    Analyze the following article and return ONLY a single, raw JSON object with the following structure:
    {
      "seoMetaDescription": "A concise, compelling meta description (max 160 characters) that includes relevant keywords.",
      "tags": ["An array of 5-7 relevant keywords or phrases for tagging."],
      "socialMediaSummary": "A brief, engaging summary suitable for platforms like Twitter or LinkedIn."
    }

    Here is the article content:
    Title: ${title}
    Body: ${body}
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean the response to ensure it's valid JSON by removing markdown code fences
    const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();

    console.log('Gemini enrichment successful.');
    return JSON.parse(jsonString);

  } catch (error) {
    console.error('Error during Gemini AI enrichment:', error);
    throw new Error('Failed to enrich article content with Gemini AI.');
  }
}

