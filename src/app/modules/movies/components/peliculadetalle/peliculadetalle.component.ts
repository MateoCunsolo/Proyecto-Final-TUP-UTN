import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/core/movie.interface';

@Component({
  selector: 'app-peliculadetalle',
  templateUrl: './peliculadetalle.component.html',
  styleUrls: ['./peliculadetalle.component.css']
})
export class PeliculaDetalleComponent implements OnInit {
  movieId: number = 0;
  movie: Movie | undefined;
  genreMap: { [key: number]: string } = {
    28: 'Acción',
    12: 'Aventura',
    16: 'Animación',
    35: 'Comedia',
    80: 'Crimen',
    99: 'Documental',
    18: 'Drama',
    10751: 'Familia',
    14: 'Fantasía',
    36: 'Historia',
    27: 'Terror',
    10402: 'Música',
    9648: 'Misterio',
    10749: 'Romance',
    878: 'Ciencia ficción',
    10770: 'Película de TV',
    53: 'Suspense',
    10752: 'Bélica',
    37: 'Western'
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