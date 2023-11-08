import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Genre, Movie } from 'src/app/core/movie.interface';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-peliculadetalle',
  templateUrl: './movies-detail.component.html',
  styleUrls: ['./movies-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movieId: number = 0;
  movie: Movie | undefined;
  public defaultImageURL = 'assets/IMAGE NOT AVAILABLE.png';  
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

  constructor(private route: ActivatedRoute, private movieService : PeliculasService) {}

  ngOnInit() {
      window.scrollTo(0, 0);
      this.loadMovieDetails();
  }

  loadMovieDetails() {
    const id = JSON.parse(sessionStorage.getItem('id') || '{}');
    this.movieService.getMovieDetails(id).subscribe((data: any) => {
      this.movie = data;
      console.log(this.movie);
    });
  }

  extractYear(date: string): string {
    return date.substr(0, 4);
  }

  getGenreNames(genres: Genre[] | undefined): string []{
    if (!genres) {
      return [''];
    }

    let genreNames: string[] = [];
    genres.forEach((genre) =>  genreNames.push(genre.name));
    return genreNames;
  }
  
  lenguageReturn(language: string): string {
    return this.languageMap[language] || 'Unknown';
  };

}