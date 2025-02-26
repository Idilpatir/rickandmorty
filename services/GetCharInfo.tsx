
import axios from 'axios';
import { ApiResponse } from '../types/Info'; // Import the shared types
import { Character } from '../types/Character';

const instance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/',
  timeout: 10000,
  headers: { 'X-Custom-Header': 'foobar' },
});

class CharacterService {
  static async getCharacters(page: number = 1): Promise<ApiResponse> {
    let characters: Character[] = [];
    let url = `character?page=${page}`; // Start from the given page

    try {
      // Fetch characters for the given page
      const response = await instance.get(url);
      const data = response.data;

      // Add the characters from the current page to the list
      characters = data.results;

      // Return the characters along with the pagination info
      return {
        results: characters,
        info: data.info, // Include the pagination info (next, prev, etc.)
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`Failed to fetch characters: ${error.response.data.error}`);
      } else {
        throw new Error('Failed to fetch characters: Unknown error');
      }
    }
  }
}

export default CharacterService;
