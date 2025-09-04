import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Article } from '../types';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../apiConfig'; // Import the base URL

const ArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Use the live backend URL
        const response = await axios.get(`${API_BASE_URL}/api/articles`);
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem' }}>All Articles</h2>
        <Link to="/new" style={{ backgroundColor: '#007bff', color: 'white', padding: '0.6rem 1.2rem', borderRadius: '5px', fontWeight: '500', textDecoration: 'none' }}>
          + New Article
        </Link>
      </div>
      {articles.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'white', border: '1px solid #dee2e6', borderRadius: '5px' }}>
          <h3>No articles found.</h3>
          <p>Why not create one?</p>
        </div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {articles.map(article => (
            <li key={article.id}>
              <Link to={`/article/${article.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', padding: '1.5rem', border: '1px solid #dee2e6', borderRadius: '5px', backgroundColor: 'white', transition: 'box-shadow 0.2s' }}
                onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'}
                onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}
              >
                <h3 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '1.25rem' }}>{article.title}</h3>
                <p style={{ marginBottom: 0, color: '#6c757d' }}>by {article.author}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ArticleList;

