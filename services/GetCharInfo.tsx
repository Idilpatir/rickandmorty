import axios, { AxiosInstance } from 'axios';
import { ApiResponse } from '../types/Info'; // Import the shared types

// Create an Axios instance with a default configuration.
const instance: AxiosInstance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/',
  timeout: 10000, // Timeout after 10 seconds
  headers: { 'X-Custom-Header': 'foobar' }, // Custom header if needed
});

class CharacterService {
  // Get characters for a given page.
  static async getCharacters(page: number = 1): Promise<ApiResponse> {
    const url = `character?page=${page}`; // URL with pagination parameter

    try {
      // Making the GET request to fetch characters.
      const response = await instance.get(url);
      const { results, info } = response.data; // Destructure the response data

      // Returning the characters along with pagination info
      return { results, info };
    } catch (error) {
      console.error('Error fetching data:', error);

      // Handle error specifically for Axios
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`Failed to fetch characters: ${error.response.data.error}`);
      } else {
        // Handle unexpected errors
        throw new Error('Failed to fetch characters: Unknown error');
      }
    }
  }

  // Fetch episode data by episode ID
  static async getEpisodeData(episodeId: string) {
    try {
      const response = await instance.get(`episode/${episodeId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching episode data:', error);

      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`Failed to fetch episode: ${error.response.data.error}`);
      } else {
        throw new Error('Failed to fetch episode: Unknown error');
      }
    }
  }
}

export default CharacterService;
