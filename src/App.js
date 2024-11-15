import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import RecipientCard from './components/RecipientCard';
import recipients from './data/recipients';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredRecipients = recipients.filter(recipient => {
    const matchesSearch = recipient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || recipient.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePlaceBid = (recipient) => {
    // Implement bid placement logic here
    console.log(`Placing bid for ${recipient.name}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Find Recipients</h1>
      </header>
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
    </div>
  );
}

export default App;
