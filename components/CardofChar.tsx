import React, { useState, useEffect } from 'react';
import { useDarkMode } from '../context/DarkModeContext'; // Assuming DarkModeContext is correctly set up
import { CharacterCardProps } from '../types/chartype';  // Import the Character type

const extractIdFromUrl = (url: string, type: string): string | null => {
  const match = url.match(/\/(\w+)\/(\d+)/);
  return match ? match[2] : null;
};

function CharacterCard({ character }: CharacterCardProps) {
  const { isDarkMode } = useDarkMode(); // Fetch dark mode state from context
  const [isClicked, setIsClicked] = useState(false); // Modal state
  const [liked, setLiked] = useState(false); // Like button state
  const [episodeData, setEpisodeData] = useState<{ name: string; episodeNumber: string } | null>(null); // State for episode data

  const handleClick = () => {
    setIsClicked(!isClicked); // Toggle modal visibility
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card click handler from triggering when clicking the Like button
    setLiked(!liked); // Toggle liked state
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from propagating to the parent div (card) when clicking inside the modal
  };

  const displayType = character.type || null;

  // Fetch episode data
  useEffect(() => {
    const fetchEpisodeData = async () => {
      if (character.episode.length > 0) {
        const episodeUrl = character.episode[0];
        const episodeId = extractIdFromUrl(episodeUrl, 'episode');
        if (episodeId) {
          const response = await fetch(`https://rickandmortyapi.com/api/episode/${episodeId}`);
          const data = await response.json();
          setEpisodeData({ name: data.name, episodeNumber: data.id.toString() });
        }
      }
    };

    fetchEpisodeData();
  }, [character.episode]);

  // Status color logic
  const statusColor = character.status === 'Alive'
    ? 'bg-green-500'  // Green for alive
    : character.status === 'Dead'
    ? 'bg-red-500'    // Red for dead
    : 'bg-yellow-500'; // Yellow for unknown

  return (
    <div
      className={`${
        isDarkMode ? 'bg-green-800 text-white' : 'bg-white text-gray-900'
      } shadow-md rounded-lg p-4 w-full h-full cursor-pointer transition-all duration-300`}
      onClick={handleClick} // Open modal when card is clicked
    >
      {/*card components are at same div cause of adding hover element */}
      <div className='group hover:scale-105 transition-all duration-300'>
        {/* Container for Like and Status */}
        <div className="relative z-20">
          {/* Like Button - Positioned at the top-left, above the image */}
          <button
            onClick={handleLike}
            className={`absolute top-2 left-2 px-3 py-1 flex flex-col dark:text-white rounded-full z-10`}
          >
            {liked ? '❤️ Liked' : '🤍 Like'}
          </button>

          {/* Status - Positioned at the top-right, above the image */}
          <div
            className={`absolute top-2 right-2 flex items-center space-x-2 font-semibold z-10`}
          >
            {/* Status Color Dot */}
            <span className={`w-3 h-3 rounded-full ${statusColor}`} />
            <p className="text-sm text-white">{character.status}</p>
          </div>
          {/* Character Image */}
          < img src={character.image} alt={character.name} className="w-full h-48 object-cover rounded-lg mb-4" />
          {/* Character Name */}
          <h2 className="text-xl font-bold mt-7 mb-2">{character.name}</h2>
        </div>
      </div>
      {/* Modal for additional character details */}
      {isClicked && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 flex justify-center items-center z-50"
          onClick={handleClick} // Close modal when clicking outside
        >
          <div
            className={`${
              isDarkMode ? 'bg-green-800 text-white' : 'bg-white text-emerald-600'
            } p-6 rounded-lg w-4/5 max-w-4xl flex flex-col relative`}
            onClick={handleModalClick} // Prevent click from closing modal when clicking inside
          >
            {/* Like button inside the modal at the top-left */}
            <button
              onClick={handleLike}
              className={`absolute top-2 left-2 px-3 py-1 flex flex-col dark:text-white rounded-full `}
            >
              {liked ? '❤️ Liked' : '🤍 Like'}
            </button>

            <div className="text-center mb-4">
              <h3 className="text-3xl font-bold">Details of</h3>
              <h3 className="text-2xl font-bold">{character.name}</h3>
            </div>

            {/* Flexbox Layout: Left side - Character Image, Right side - Character Details */}
            <div className="flex flex-col sm:flex-row w-full items-center sm:items-start">
              <div className="sm:w-1/2 pr-4 mt-5 hover:scale-105 transition-all duration-300">
                {/* Adjusting Image in Modal to not be cropped */}
                <img src={character.image} alt={character.name} className="w-full h-auto object-cover rounded-lg" />
              </div>

              <div className="sm:w-1/2 pl-4 mt-5 flex flex-col justify-center">
                {/* Align the text vertically to the center */}
                <p className="mb-4 text-left">Species: {character.species}</p>
                <p className="mb-4 text-left">Status: {character.status}</p>
                <p className="mb-4 text-left">Gender: {character.gender}</p>
                <p className="mb-4 text-left">
                  Origin:{" "}
                  <a
                    href={`https://rickandmortyapi.com/api/origin/${extractIdFromUrl(character.origin.url, 'origin')}`}
                    className="hover:scale-105 transition-all duration-300 hover:text-emerald-300 hover:underline"
                  >
                    {character.origin.name}
                  </a>
                </p>
                <p className="mb-4 text-left">
                  Location:{" "}
                  <a
                    href={`https://rickandmortyapi.com/api/location/${extractIdFromUrl(character.location.url, 'location')}`}
                    className="hover:scale-105 transition-all duration-300 hover:text-emerald-300 hover:underline"
                  >
                    {character.location.name}
                  </a>
                </p>
                <p className="mb-4 text-left">
                  First Episode:{" "}
                  {episodeData ? (
                    <>
                      <a
                        href={`https://rickandmortyapi.com/api/episode/${episodeData.episodeNumber}`}
                        className="hover:scale-105 transition-all duration-300 hover:text-emerald-300 hover:underline"
                      >
                        "{episodeData.name}" / Episode-{episodeData.episodeNumber}
                      </a>
                    </>
                  ) : (
                    <span>Loading...</span>
                  )}
                </p>
              </div>
            </div>

            <div className="text-right mt-4">
              <button onClick={handleClick} className="px-4 py-2 bg-green-950 text-white rounded-md">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CharacterCard;
