import React, { useState, useEffect } from 'react';
import axios from 'axios';
import type { Article } from '../types';
import { Link } from 'react-router-dom';

const ArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/articles');
        setArticles(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch articles:", err);
        setError("Failed to load articles. Please make sure the backend server is running.");
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>All Articles</h2>
        <Link to="/new" style={{ textDecoration: 'none', backgroundColor: '#007bff', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px' }}>
          + New Article
        </Link>
      </div>
      {articles.length === 0 ? (
        <p>No articles found. Why not create one?</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {articles.map(article => (
            <li key={article.id} style={{ marginBottom: '1rem' }}>
              {/* Make each list item a link to the detail page */}
              <Link to={`/article/${article.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                <h3 style={{ marginTop: 0 }}>{article.title}</h3>
                <p style={{ marginBottom: 0 }}>by {article.author}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ArticleList;

