import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange, onCategoryChange }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      <select 
        onChange={(e) => onCategoryChange(e.target.value)}
        className="category-select"
      >
        <option value="">All Categories</option>
        <option value="mentorship">Mentorship</option>
        <option value="funding">Funding</option>
        <option value="qa">Q&A</option>
      </select>
    </div>
  );
};

export default SearchBar; 