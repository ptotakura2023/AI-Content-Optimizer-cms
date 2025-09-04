import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ArticleEditor = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Send only the user-written content to the backend
      const response = await axios.post('http://localhost:3000/api/articles', {
        title,
        author,
        body,
      });

      // After a successful creation, navigate back to the homepage
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

  return (
    <div>
      <h2>Create New Article</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem' }}>Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="author" style={{ display: 'block', marginBottom: '0.5rem' }}>Author</label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="body" style={{ display: 'block', marginBottom: '0.5rem' }}>Body</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows={15}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" disabled={isSubmitting} style={{ padding: '0.75rem 1.5rem' }}>
          {isSubmitting ? 'Submitting...' : 'Save and Optimize'}
        </button>
      </form>
    </div>
  );
};

export default ArticleEditor;

