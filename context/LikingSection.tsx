import React, { useState, useEffect } from 'react';

interface LikeButtonProps {
  characterId: string; // Pass the character ID as a prop
}

const LikeButton: React.FC<LikeButtonProps> = ({ characterId }) => {
  const [liked, setLiked] = useState(false);

  // Check localStorage for the "liked" status on initial render
  useEffect(() => {
    const storedLikeStatus = localStorage.getItem(`liked-${characterId}`);
    if (storedLikeStatus === 'true') {
      setLiked(true); // If liked is stored as true in localStorage, set state to true
    } else {
      setLiked(false); // Otherwise, default to false
    }
  }, [characterId]);

  // Persist like status in localStorage when it changes
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the parent click handler from triggering when clicking the Like button
    const newLikedStatus = !liked;
    setLiked(newLikedStatus); // Toggle liked state

    // Store the like status in localStorage
    localStorage.setItem(`liked-${characterId}`, newLikedStatus.toString());
  };

  return (
    <button
      onClick={handleLike}
      className={`absolute top-2 left-2 px-3 py-1 flex flex-col dark:text-white rounded-full z-10`}
    >
      {liked ? '❤️ Liked' : '🤍 Like'}
    </button>
  );
};

export default LikeButton;
