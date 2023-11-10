export interface Movie {
genres: Genre[]|undefined;
    adult: boolean;
    backdrop_path: string;
    genre_ids: Genre[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }
  
  export interface MovieData {
    dates: {
      maximum: string;
      minimum: string;
    };
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  }
  

export interface Genre {
  id: number;
  name: string;
}