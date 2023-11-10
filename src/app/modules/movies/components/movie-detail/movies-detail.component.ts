import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Genre, Movie } from 'src/app/core/movie.interface';
import { PeliculasService } from 'src/app/services/peliculas.service';
interface StreamingProvider {
  name: string;
  logoUrl: string;
}
@Component({
  selector: 'app-peliculadetalle',
  templateUrl: './movies-detail.component.html',
  styleUrls: ['./movies-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movieId: number = 0;
  movie: Movie | undefined;
  availableStreaming: StreamingProvider[] = [];
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
  
    logos: { [key: string]: string } = {
      'Netflix': 'assets/netflix.png',
      'Amazon Prime Video': 'assets/amazon-prime.png',
      'HBO Max': 'assets/hbo-max.png',
      'Disney Plus': 'assets/disney.png',
      'Apple TV Plus': 'assets/apple-tv.png',
      'Paramount Plus Apple TV Channel ': 'assets/apple-tv.png',
      'Google Play Movies': 'assets/google-play-movies.png',
      'YouTube': 'assets/youtube-movies.png',
      'Paramount Plus': 'assets/paramount-plus.png',
      'Movistar Play': 'assets/movistar-play.png',
      'Star Plus': 'assets/star-plus.svg',
    };
  
  constructor(private route: ActivatedRoute, private movieService : PeliculasService) {}

  ngOnInit() {
      window.scrollTo(0, 0);
      this.loadMovieDetails();
      this.loadAvailableStreaming();
  }

  loadMovieDetails() {
    const id = JSON.parse(sessionStorage.getItem('id') || '{}');
    this.movieService.getMovieDetails(id).subscribe((data: any) => {
      this.movie = data;
      console.log(this.movie);
    });
  }

  loadAvailableStreaming() {
    const id = JSON.parse(sessionStorage.getItem('id') || '{}');
    this.movieService.getAvaliableStreaming(id).subscribe((data: any) => {
      for (let i = 0; i < data.results.AR.flatrate.length; i++) {
        const providerName = data.results.AR.flatrate[i].provider_name;
          if (this.logos.hasOwnProperty(providerName)) {
          this.availableStreaming.push({
            name: providerName,
            logoUrl: this.logos[providerName]
          });
        }
        else {
          this.availableStreaming.push({
            name: providerName,
            logoUrl: this.defaultImageURL
          });
        }
      }
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