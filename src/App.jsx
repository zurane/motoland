import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./components/Search.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import Tutorial from './pages/Tutorial.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/results" element={<SearchResults />} />
        <Route path="/tutorials" element={<Tutorial />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
