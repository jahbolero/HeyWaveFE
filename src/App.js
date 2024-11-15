import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SearchBar from './components/SearchBar';
import RecipientCard from './components/RecipientCard';
import BottomMenu from './components/BottomMenu';
import recipients from './data/recipients';

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredRecipients = recipients.filter(recipient => {
    const matchesSearch = recipient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || recipient.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePlaceBid = (recipient) => {
    console.log(`Placing bid for ${recipient.name}`);
  };

  return (
    <main className="main-content">
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCategoryChange={setSelectedCategory}
      />
      <div className="recipients-grid">
        {filteredRecipients.map(recipient => (
          <RecipientCard
            key={recipient.id}
            recipient={recipient}
            onPlaceBid={handlePlaceBid}
          />
        ))}
      </div>
    </main>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Find Recipients</h1>
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/placeholder1" element={<div>Menu 2 Content</div>} />
          <Route path="/placeholder2" element={<div>Menu 3 Content</div>} />
          <Route path="/placeholder3" element={<div>Menu 4 Content</div>} />
        </Routes>
        <BottomMenu />
      </div>
    </Router>
  );
}

export default App;
