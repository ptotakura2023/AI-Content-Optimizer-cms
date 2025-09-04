import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import type { Article } from '../types';
import { API_BASE_URL } from '../apiConfig'; // Import the base URL

const ArticleDetail = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      try {
        // Use the live backend URL
        const response = await axios.get(`${API_BASE_URL}/api/articles/${id}`);
        setArticle(response.data);
      } catch (err) {
        console.error("Failed to fetch article:", err);
        setError("Failed to load the article.");
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading) return <p>Loading article...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!article) return <p>Article not found.</p>;

  return (
    <div style={{ backgroundColor: 'white', padding: '2rem', border: '1px solid #dee2e6', borderRadius: '5px' }}>
      <article>
        <Link to="/" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>&larr; Back to all articles</Link>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{article.title}</h1>
        <p style={{ color: '#6c757d', marginBottom: '2rem', fontStyle: 'italic' }}>by {article.author}</p>
        <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.7', fontSize: '1.1rem' }}>
          {article.body}
        </div>
      </article>

      <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #dee2e6' }}>
        <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>AI Optimizations</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <strong>SEO Meta Description:</strong>
            <p style={{ marginTop: '0.5rem', color: '#555', backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '4px' }}>{article.seoMetaDescription}</p>
          </div>
          <div>
            <strong>Tags:</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
              {article.tags?.map(tag => (
                <span key={tag} style={{ backgroundColor: '#e9ecef', padding: '0.25rem 0.75rem', borderRadius: '15px', fontSize: '0.9rem' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div>
            <strong>Social Media Summary:</strong>
            <p style={{ marginTop: '0.5rem', color: '#555', backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '4px' }}>{article.socialMediaSummary}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;

