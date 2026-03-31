import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./components/Search.jsx";
import SearchResults from "./pages/SearchResults.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/results" element={<SearchResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
