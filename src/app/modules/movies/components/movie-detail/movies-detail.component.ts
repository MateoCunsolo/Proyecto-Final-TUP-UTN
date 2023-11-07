import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/core/movie.interface';

@Component({
  selector: 'app-peliculadetalle',
  templateUrl: './movies-detail.component.html',
  styleUrls: ['./movies-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movieId: number = 0;
  movie: Movie | undefined;
  public defaultImageURL = 'assets/IMAGE NOT AVAILABLE.png';
  genreMap: { [key: number]: string } = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
  };
  
  languageMap: { [key: string]: string } = {
    en: 'English',
    es: 'Spanish',
    ru: 'Russian',
    fr: 'French',
    ja: 'Japanese',
    it: 'Italian',
    de: 'German',
    pt: 'Portuguese',
    ko: 'Korean',
    hi: 'Hindi',
    zh: 'Chinese',
    ar: 'Arabic',
    sv: 'Swedish',
    cs: 'Czech',
    da: 'Danish',
    fi: 'Finnish',
    el: 'Greek',
    he: 'Hebrew',
    nl: 'Dutch',
    no: 'Norwegian',
    pl: 'Polish',
    ro: 'Romanian',
    tr: 'Turkish',
    uk: 'Ukrainian',
    hu: 'Hungarian',
    vi: 'Vietnamese',
    bg: 'Bulgarian',
    id: 'Indonesian',
    ms: 'Malay',
    sr: 'Serbian',
    hr: 'Croatian',
    sl: 'Slovenian',
    et: 'Estonian',
    lt: 'Lithuanian',
    sk: 'Slovak',
    lv: 'Latvian',
    sq: 'Albanian',
    mk: 'Macedonian',
    bs: 'Bosnian',
    is: 'Icelandic',
    af: 'Afrikaans',
    fo: 'Faroese',
    gl: 'Galician',
    eu: 'Basque',
    ca: 'Catalan',
    es_419: 'Latin American Spanish',
    th: 'Thai',
    fa: 'Persian',
    en_gb: 'British English',
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieId = +params['id'];
      window.scrollTo(0, 0);
      this.loadMovieDetails();
      console.log(this.movie);
    });
  }

  loadMovieDetails() {
    this.movie = JSON.parse(sessionStorage.getItem('movieClicked') || '{}');
  }

  extractYear(date: string): string {
    return date.substr(0, 4);
  }

  getGenres(genreIds: number[]): string[] {
    const genres: string[] = [];

    genreIds.forEach((genreId) => {
      const genreName = this.genreMap[genreId];
      if (genreName) {
        genres.push(genreName);
      }
    });

    return genres;
  }
  
  lenguageReturn(language: string): string {
    return this.languageMap[language] || 'Unknown';
  };

}