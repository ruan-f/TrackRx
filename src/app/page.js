
"use client";
// App.js or similar file where routing is set up
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import PersonalInfo from './pages/personal-info';
import Home from './pages/Home'; // Assuming you have a Home component
import AIAssistant from './pages/AI-Assistant';
import Tracking from "./pages/tracking";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personal-info" element={<PersonalInfo />} />
        <Route path="/AI-Assistant" element={<AIAssistant />} />
        <Route path="/tracking" element={<Tracking />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
