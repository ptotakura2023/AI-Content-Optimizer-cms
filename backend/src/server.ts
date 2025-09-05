import 'dotenv/config';
import express from 'express';
import articleRouter from './articleRouter';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express'; // Import Swagger
import yaml from 'yamljs'; // Import YAML parser
import path from 'path'; // Import path module

const app = express();
const PORT = process.env.PORT || 3000;

// Load the OpenAPI document from the correct path
const swaggerDocument = yaml.load(path.join(__dirname, '../openapi.yaml'));

app.use(cors());
app.use(express.json());

// --- API Routes ---
app.use('/api/articles', articleRouter);

// --- API Documentation Route ---
// This must be defined AFTER the other middleware but BEFORE the server starts listening
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health check endpoint (can be removed if not needed)
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is healthy' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API docs available on http://localhost:${PORT}/api-docs`); // Add a log for convenience
});

