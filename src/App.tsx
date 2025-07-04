import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GlobalStorage } from './Contexts/GlobalContext';
import Home from './Components/Home';
import Details from './Components/Details';

function App() {
  return (
    <Router>
      <GlobalStorage>
        <Routes>
          {/* Home route (for "/" or GitHub Pages base path) */}
          <Route path="/" element={<Home />} />
          
          {/* Redirect for GitHub Pages base path */}
          <Route path="/rest-countries-api-with-color-theme-switcher" element={<Navigate to="/" replace />} />

          {/* Country detail route by alpha code */}
          <Route path="/country/:alpha" element={<Details />} />

          {/* Optional fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </GlobalStorage>
    </Router>
  );
}

export default App;
