import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import type { Article } from '../types';

const ArticleDetail = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>(); // Get the article ID from the URL

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/articles/${id}`);
        setArticle(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch article:", err);
        setError("Failed to load the article. It might not exist or the server is down.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]); // Rerun effect if the ID in the URL changes

  if (loading) {
    return <p>Loading article...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!article) {
    return <p>Article not found.</p>;
  }

  return (
    <div>
      <Link to="/">&larr; Back to all articles</Link>
      <article style={{ marginTop: '1rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>{article.title}</h1>
        <p style={{ fontStyle: 'italic', color: '#555', marginTop: 0 }}>by {article.author}</p>
        <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{article.body}</div>
        
        <div style={{ marginTop: '3rem', padding: '1rem', backgroundColor: '#f9f9f9', border: '1px solid #eee', borderRadius: '4px' }}>
          <h3>AI Optimized Content</h3>
          <div>
            <strong>SEO Meta Description:</strong>
            <p style={{ marginTop: '0.25rem' }}>{article.seoMetaDescription}</p>
          </div>
          <div>
            <strong>Tags:</strong>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
              {article.tags?.map(tag => (
                <span key={tag} style={{ backgroundColor: '#e0e0e0', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.9rem' }}>{tag}</span>
              ))}
            </div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <strong>Social Media Summary:</strong>
            <p style={{ marginTop: '0.25rem' }}>{article.socialMediaSummary}</p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ArticleDetail;
