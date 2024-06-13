import React from 'react';

const SearchBar = ({background,searchQuery, setSearchQuery}) => {
  const handleSearch = () => {
    setSearchQuery(searchQuery);
  };
  return (
    <div className="flex items-center rounded-md px-4 py-2 border border-white" style={background={background}}>
      <input
        type="text"
        placeholder="Search Song, Artist"
        className="flex-grow bg-transparent outline-none px-2 placeholder-white"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="text-white hover:text-gray-700" onClick={handleSearch}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35M18.8 11a7.8 7.8 0 11-15.6 0 7.8 7.8 0 0115.6 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
