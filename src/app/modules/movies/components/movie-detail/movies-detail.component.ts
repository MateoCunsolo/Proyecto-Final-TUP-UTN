import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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
  flag: boolean = false;
  videoUrl: SafeResourceUrl | undefined;
  movieId: number = 0;
  movie: Movie | undefined;
  isImgClicked = false;
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
    'Netflix': 'assets/netflix.webp',
    'Amazon Prime Video': 'assets/prime-video.webp',
    'Apple TV Plus': 'assets/apple-tv-plus.webp',
    'Apple TV': 'assets/apple-tv.webp',
    'BHD': 'assets/bhd.webp',
    'Claro video': 'assets/claro-video.webp',
    'Classix': 'assets/classix.webp',
    'Contar': 'assets/contar.webp',
    'Crunchyroll': 'assets/crunchyroll.webp',
    'Cultpix': 'assets/cultpix.webp',
    'Curiosity Stream': 'assets/curiosity-stream.webp',
    'DAFilms': 'assets/dafilms.webp',
    'Dek-Koo': 'assets/dek-koo.webp',
    'DirecTV Go': 'assets/directv-go.webp',
    'Disney Plus': 'assets/disney-plus.webp',
    'Docs Ville': 'assets/docs-ville.webp',
    'Eventive': 'assets/eventive.webp',
    'Film Box': 'assets/film-box.webp',
    'Filmzie': 'assets/filmzie.webp',
    'Google Play Movies': 'assets/google-play-movies.webp',
    'HBO Max Free': 'assets/hbo-max-free.webp',
    'HBO Max': 'assets/hbo-max.webp',
    'History Play': 'assets/history-play.webp',
    'Hoichoi': 'assets/hoichoi.webp',
    'Kocowa': 'assets/kocowa.webp',
    'Lionsgate Plus': 'assets/lionsgate-plus.webp',
    'Magellan TV': 'assets/magellan-tv.webp',
    'MGM Amazon Channel': 'assets/MGM-amazon-channel.webp',
    'Movistar Play': 'assets/movistar-play.webp',
    'Mubi': 'assets/mubi.webp',
    'OnDemandKorea': 'assets/ondemandkorea.webp',
    'Paramount Plus Apple TV Channel ': 'assets/paramount-plus-apple-tv-channel.webp',
    'Paramount Plus': 'assets/paramount-plus.webp',
    'Pluto TV': 'assets/pluto-tv.webp',
    'Qubit TV': 'assets/qubit-tv.webp',
    'Runtime': 'assets/runtime.webp',
    'Shahid': 'assets/shahid.webp',
    'Spamflix': 'assets/Spamflix.webp',
    'Star Plus': 'assets/star-plus.webp',
    'Sun Nxt': 'assets/sun-nxt.webp',
    'Talkfix': 'assets/talkfix.webp',
    'Trash': 'assets/trash.png',
    'True Story': 'assets/true-story.webp',
    'Vix': 'assets/vix.webp',
    'Wow Plus': 'assets/wow-plus.webp',
  };
  
  constructor(private route: ActivatedRoute, private movieService : PeliculasService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
      window.scrollTo(0, 0);
      this.loadMovieDetails();
      this.loadAvailableStreaming();
      
      this.movieId = JSON.parse(sessionStorage.getItem('id') || '{}');
      this.showVideo(this.movieId);
  }

  loadMovieDetails() {
    const id = JSON.parse(sessionStorage.getItem('id') || '{}');
    this.movieService.getMovieDetails(id).subscribe((data: any) => {
      this.movie = data;
      console.log(this.movie);
    });
  }
  

toggleImgClicked() {
   this.isImgClicked = !this.isImgClicked;
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

  showVideo(movieId: number): void {
    
    this.movieService.getVideoKey(movieId).subscribe((data: any) => {
      if (data.results.length > 0) {

        for(let i = 0; i < data.results.length; i++) {
          if (data.results[i].type === 'Trailer' && this.flag === false) {
            const videoKey = data.results[i].key;
            const videoUrl = `https://www.youtube.com/embed/${videoKey}`;
            this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
            this.flag = true;
          }
        }

      }
    });
  }
  

}