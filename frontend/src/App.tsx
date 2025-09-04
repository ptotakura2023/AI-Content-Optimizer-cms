import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import ArticleEditor from './components/ArticleEditor';
import ArticleDetail from './components/ArticleDetail';

function App() {
  return (
    <Router>
      <div>
        <header style={{ 
          backgroundColor: 'white',
          borderBottom: '1px solid #dee2e6' 
        }}>
          <nav style={{ 
            maxWidth: '960px',
            margin: '0 auto',
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '1rem 2rem', 
          }}>
            <h1 style={{ margin: 0, fontSize: '1.5rem' }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>AI Content Optimizer</Link>
            </h1>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', gap: '1.5rem', fontSize: '1rem' }}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/new">Create New</Link></li>
            </ul>
          </nav>
        </header>

        {/* This main container is key to the new layout */}
        <main style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem' }}>
          <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/new" element={<ArticleEditor />} />
            <Route path="/article/:id" element={<ArticleDetail />} /> 
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

