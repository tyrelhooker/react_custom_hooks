import React from 'react';

const Search = ({ onSearch, userSearch }) => {

  return (
    <div>
      <label htmlFor="search">Search: </label>
      {/* Callback handler is used here but calls back to place it was defined (App Component) */}
      <input id="search" type="text" value={userSearch} onChange={onSearch} />

      <p>Searching for: <strong>{`${userSearch}`}</strong></p>
    </div>
  );
};

export default Search;