import React, { useState, useEffect } from 'react';
import CharacterCard from './CardofChar';
import CharacterService from '../services/GetCharInfo';
import { ApiResponse } from '../types/Info'; // Import the shared types

const GetData: React.FC = () => {
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1); // Track current page
  const [totalPages, setTotalPages] = useState<number>(1); // Track total pages

  // Fetch data when component mounts or currentPage changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await CharacterService.getCharacters(currentPage);
        setApiData(result);
        // Calculate total pages from the info.meta data
        setTotalPages(Math.ceil(parseInt(result.info.count) / 20)); // Adjust page size if necessary
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      }
    };
    fetchData();
  }, [currentPage]); // Fetch data whenever the page changes

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.trim());
  };

  const filteredCharacters = apiData?.results.filter((character) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!apiData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 text-center dark:text-white">
        Characters from Rick and Morty
      </h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search characters..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Display no characters if no results match the search query */}
      {filteredCharacters.length === 0 && searchQuery && (
        <div className="text-3xl font-bold mb-4 text-center dark:text-white">
          No characters found 🙁
        </div>
      )}

      {/* Display characters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredCharacters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        {/* Previous Button */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className=" hover:scale-105 transition-all duration-300 bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
        >
          Previous
        </button>

        {/* Page Info */}
        <span className="self-center">Page {currentPage} of {totalPages}</span>

        {/* Next Button */}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="hover:scale-105 transition-all duration-300 bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GetData;
