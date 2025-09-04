import 'dotenv/config';
import express from 'express';
import articleRouter from './articleRouter';
import cors from 'cors'; // 1. Import the cors package

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // 2. Enable CORS for all routes
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is healthy' });
});

// 2. Use the article router for any requests to /api/articles
app.use('/api/articles', articleRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

