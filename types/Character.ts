
export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  origin: { name: string; url: string };  // Origin must have both 'name' and 'url'
  location: { name: string; url: string }; // Location must have both 'name' and 'url'
  episode: string[];
  type?: string;  // Add `type` as an optional property
}

export interface CharacterCardProps {
  character: Character;
}

