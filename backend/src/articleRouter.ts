import { Router } from 'express';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { Article } from './types';
import { enrichArticleContent } from './aiService';

const router = Router();
const dbPath = path.join(__dirname, '../db.json');

// --- GET /api/articles --- (RESTORED)
// Retrieves all articles from the database.
router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    const db = JSON.parse(data);
    res.status(200).json(db.articles);
  } catch (error) {
    console.error('Error reading from database:', error);
    res.status(500).json({ message: 'Failed to retrieve articles.' });
  }
});

// --- GET /api/articles/:id ---
// Retrieves a single article by its ID.
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fs.readFile(dbPath, 'utf-8');
    const db = JSON.parse(data);
    const article = db.articles.find((a: Article) => a.id === id);

    if (article) {
      res.status(200).json(article);
    } else {
      res.status(404).json({ message: 'Article not found.' });
    }
  } catch (error) {
    console.error('Error reading from database:', error);
    res.status(500).json({ message: 'Failed to retrieve article.' });
  }
});

// --- POST /api/articles ---
// Creates a new article, enriches it with AI, and saves it.
router.post('/', async (req, res) => {
  try {
    const { title, author, body } = req.body;

    if (!title || !author || !body) {
      return res.status(400).json({ message: 'Title, author, and body are required.' });
    }

    const enrichmentData = await enrichArticleContent(title, body);

    const newArticle: Article = {
      id: uuidv4(),
      title,
      author,
      body,
      seoMetaDescription: enrichmentData.seoMetaDescription,
      tags: enrichmentData.tags,
      socialMediaSummary: enrichmentData.socialMediaSummary,
    };

    const data = await fs.readFile(dbPath, 'utf-8');
    const db = JSON.parse(data);
    db.articles.push(newArticle);

    await fs.writeFile(dbPath, JSON.stringify(db, null, 2));

    res.status(201).json(newArticle);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ message: 'Failed to create article.' });
  }
});

export default router;

