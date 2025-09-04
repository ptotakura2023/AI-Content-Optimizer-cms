import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../apiConfig'; // Import the base URL

const ArticleEditor = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author || !body) {
      setError("All fields are required.");
      return;
    }
    setIsSubmitting(true);
    setError(null);

    try {
      // Use the live backend URL
      const response = await axios.post(`${API_BASE_URL}/api/articles`, {
        title,
        author,
        body,
      });
      if (response.status === 201) {
        navigate('/');
      }
    } catch (err) {
      console.error("Failed to create article:", err);
      setError("Failed to create article. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyles: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box'
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '2rem', border: '1px solid #dee2e6', borderRadius: '5px' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Create New Article</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Title</label>
          <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyles} />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="author" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Author</label>
          <input id="author" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} style={inputStyles} />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="body" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Body</label>
          <textarea id="body" value={body} onChange={(e) => setBody(e.target.value)} rows={15} style={inputStyles} />
        </div>

        {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

        <button type="submit" disabled={isSubmitting} style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          color: 'white',
          backgroundColor: isSubmitting ? '#6c757d' : '#007bff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          width: '100%'
        }}>
          {isSubmitting ? 'Submitting...' : 'Save and Optimize'}
        </button>
      </form>
    </div>
  );
};

export default ArticleEditor;

