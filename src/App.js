import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CharactersList, CharacterDetails, LocationList, CharactersByLocation } from 'pages';

function App() {
  return (
    <div className="App">
      <h1>Mostrans Technical Test | Rick and Morty Characters</h1>
      <Router>
        <nav>
          <Link to="/">Characters</Link>
          <Link to="/locations">Locations</Link>
        </nav>
        <Routes>
          <Route path="/" element={<CharactersList />} />
          <Route path="/characters/:id" element={<CharacterDetails />} />
          <Route path="/locations" element={<LocationList />} />
          <Route path="/locations/:location" element={<CharactersByLocation />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
