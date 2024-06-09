import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CurrentAffair from './pages/CurrentAffair';
import QuizApp from './components/Quiz';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CurrentAffair />} />
        <Route path="/quiz/:month/:id" element={<QuizApp />} />
      </Routes>
    </Router>
  );
};

export default App;

