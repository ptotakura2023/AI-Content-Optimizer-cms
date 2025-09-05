# AI Content Optimizer & CMS
A full-stack application featuring an AI agent that automatically enriches blog content with SEO descriptions, tags, and social media summaries. Built entirely in TypeScript with a Node.js/Express backend and a React/Vite frontend.

**Live Demo**: https://ai-content-optimizer-cms.vercel.app/
#### The Problem Solved
For content creators, the work isn't over after writing an article. Manual tasks like crafting SEO-friendly meta descriptions, generating relevant tags, and writing separate summaries for social media are tedious and time-consuming. This project automates that entire workflow, allowing creators to focus on what they do best: creating.
### Core Features
* **Full-Stack Application**: A complete frontend and backend built from scratch.

* **AI-Powered Content Enrichment**: Leverages the Google Gemini API to intelligently analyze article content.

* **Automated SEO Optimization**: Automatically generates a concise, keyword-rich meta description.

* **Smart Tagging**: Creates a list of relevant tags to improve content discoverability.

* **Social Media Integration**: Generates a ready-to-use summary perfect for sharing on platforms like Twitter or LinkedIn.

*  **Architecture**: A standalone React frontend that communicates with a separate Node.js backend, deployed independently.

* **Interactive API Documentation**: The backend includes a Swagger/OpenAPI interface for clear, interactive API documentation.

### Tech Stack & Architecture
This project uses a modern, decoupled architecture.

**Backend** 
* **Runtime**: Node.js
* **Framework**: Express.js
* **Language**: TypeScript
* **AI**: Google Gemini API (@google/generative-ai)
* **API Documentation**: OpenAPI (Swagger)
* **Database**: Flat-file JSON (for development simplicity)

**Frontend**
* **Library**: React
* **Build Tool**: Vite
* **Language**: TypeScript
* **API Client**: Axios
* **Routing**: React Router DOM

**Deployment**
* **Backend**: Deployed as a Web Service on Render.
* **Frontend**: Deployed as a Static Site on Vercel.

### Getting Started Locally
To run this project on your own machine, follow these steps.
**Prerequisites**
* Node.js (v20+)
* An API key from Google AI Studio

**1. Clone the Repository**
```bash 
git clone https://github.com/ptotakura2023/AI-Content-Optimizer-cms.git
cd AI-Content-Optimizer-cms
```
**2. Set Up the Backend**
```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create a .env file in the backend folder
# and add your Google API key
echo "GOOGLE_API_KEY=YOUR_GEMINI_API_KEY_HERE" > .env

# Start the backend server (runs on http://localhost:3000)
npm run dev
```
**3. Set Up the Frontend**
```bash
# Open a new terminal and navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the frontend dev server (runs on http://localhost:5173)
npm run dev
```
Your application should now be running! Open your browser to http://localhost:5173.

This project was built as a comprehensive portfolio piece demonstrating modern full-stack development and practical AI integration.

### License
This project is licensed under the MIT License.

Copyright (c) 2025 ptotakura2023
