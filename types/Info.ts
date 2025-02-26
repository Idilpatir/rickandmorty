
import { Character } from './Character'; 

export interface Info {
  count: string; // Total number of characters
  pages: number; // Total number of pages
  next: string | null; // URL for the next page (null if no more pages)
  prev: string | null; // URL for the previous page (null if it's the first page)
}

export interface ApiResponse {
  results: Character[]; // Array of characters
  info: Info; // Pagination info
}
