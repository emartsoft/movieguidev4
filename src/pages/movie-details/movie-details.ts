import { Component, NgZone } from '@angular/core';
import { NavController, Platform, ViewController, ToastController, NavParams } from 'ionic-angular';
import { Toast } from 'ionic-native';
import { MovieService } from '../../providers/movie-service/movie-service';
import { CastPagePage } from '../cast-page/cast-page';
import { BackdropsPage } from '../backdrops/backdrops';
import { TrailersPage } from '../trailers/trailers';
import { SimilarMoviesPage } from '../similar-movies/similar-movies';
import { CastDetailPage } from '../cast-detail/cast-detail';
import { ImagePopoverPage } from '../image-popover/image-popover';
import { Reviews } from '../reviews/reviews';

import { GoogleAnalytics, InAppBrowser } from 'ionic-native';
/*
  Generated class for the MovieDetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'movie-details.html'
})
export class MovieDetailsPage {
  movie: any;
  public omdbMovie: any;
  isTV: '0';
  _zone: any;
  platform: any;
  title: any;
  movieID: any;
  backdrops: any;
  casts: any;
  similar: any;
  videos: any;
  reviews:any;
  public castRows = [];
  genres: string = '';
  productioncompanies: string = '';
  public bgurl: string = '';
  public tomatourl: string = '';
  public tomatoImage: string = '';
  public flixsterImage: string = '';

  public shouldHide: boolean = false;
  metaScore: string = '';
  tomatoMeter: string = '';
  flixster: string = '';
  imdb: string = '';
  movieYear: string = '';

  director: string = '';
  writer: string = '';

  screenWidth: number;

  metaScoreColor: string = '';
  imdbid: string = '';
  //tomatourl: string = '';

  public baseBigImageUrlBig: string = '';
  public baseImageUrl: string = 'http://image.tmdb.org/t/p/w300';
  public baseBigImageUrl: string = 'http://image.tmdb.org/t/p/w500';
  public baseBiggerImageUrl: string = 'http://image.tmdb.org/t/p/w1000';

  constructor(public nav: NavController,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    platform: Platform,
    public viewCtrl: ViewController,
    public movieService: MovieService,
    _zone: NgZone) {
    this.isTV = this.navParams.data.isTV;
    this.movie = this.navParams.data.movie;
    this.fetchMovieByID(this.movie.id);

    console.log('nav params', this.navParams);
    console.log('my movie title:', this.movie.title);

    this.screenWidth = window.innerWidth;
    //console.log('screen height:', this.screenHeight);
    //this.screenHeight = 'Screen Height: ' + this.screenHeight;
    //this.showToast(this.screenWidth, 'bottom');

    if (this.screenWidth > 600)
      this.baseBigImageUrlBig = this.baseBiggerImageUrl;
    else
      this.baseBigImageUrlBig = this.baseBigImageUrl;

    this._zone = _zone;
    this.platform = platform;

    this.platform.ready().then(() => {
      GoogleAnalytics.trackView("Movie Details Page");
    });
  }

  fetchMovieByID(movieID) {
    this.movieService.getMovieByID(movieID).then(_body => {
      //console.log(_body);
      this.movie = _body;
      this.fetchOMDbMovie();
      console.log('movie det', this.movie);
      //console.log('movie images', this.movie.images.backdrops);
      // console.log('movie cast', this.movie.credits.cast);
      this.title = this.movie.title;
      this.movieID = this.movie.id;

      //console.log('bg url',  this.bgurl);
      this.casts = this.movie.credits.cast;
      console.log('casts', this.casts);
      if (this.casts.length > 0)
        this.shouldHide = true;

      this.castRows = Array.from(Array(Math.ceil(1)).keys());

      this.backdrops = this.movie.images.backdrops;
      this.similar = this.movie.similar.results;
      this.videos = this.movie.videos.results;
      this.reviews = this.movie.reviews.results;
      console.log('similar', this.similar);
      //this.castRows = Array.from(Array(Math.ceil(this.movie.credits.cast.length / 3)).keys());
      //console.log('my movie runtime:', this.movie.runtime);
      this.bgurl = this.baseBigImageUrl + this.movie.backdrop_path;
      //console.log('movie backdrops', this.backdrops);

      for (let i = 0; i < this.movie.genres.length; i++) {
        if (this.genres == '')
          this.genres = this.movie.genres[i].name;
        else
          this.genres = this.genres + ', ' + this.movie.genres[i].name;
      }
      //console.log('genres', this.genres);
      // console.log('genres', this.movie.production_companies);
      for (let i = 0; i < this.movie.production_companies.length; i++) {
        if (this.productioncompanies == '')
          this.productioncompanies = this.movie.production_companies[i].name;
        else
          this.productioncompanies = this.productioncompanies + ', ' + this.movie.production_companies[i].name;
      }

      setTimeout(() => {
        if (this.productioncompanies == '')
          this.productioncompanies = this.omdbMovie.Production;
      }, 3000);
      //console.log('production', this.productioncompanies);
      //console.info('Finished receiving data, async operation complete');
      //this.showToast('Staff List Refreshed');
    });
  }

  fetchOMDbMovie() {
    this.movieService.getomdbIMDBIDFetch(this.movie.imdb_id).then(_body1 => {
      this.omdbMovie = _body1;
      console.log('omdbmovie', this.omdbMovie);
      if (this.omdbMovie.Response == 'True') {
        this.director = this.omdbMovie.Director;
        this.writer = this.omdbMovie.Writer;
        this.movieYear = '(' + this.omdbMovie.Year + ')';
        if (this.omdbMovie.metaScore != 'N/A') {
          this.metaScore = (this.omdbMovie.Metascore != 'N/A') ? this.omdbMovie.Metascore : '--';
          //green: #6c3
          if (parseInt(this.omdbMovie.Metascore) > 60) {
            this.metaScoreColor = '#6c3';
          }
          //yellow: #fc3
          if (parseInt(this.omdbMovie.Metascore) >= 40 && parseInt(this.omdbMovie.Metascore) <= 59) {
            this.metaScoreColor = '#fc3';
          }
          //red: #f00
          if (parseInt(this.omdbMovie.Metascore) >= 0 && parseInt(this.omdbMovie.Metascore) <= 39) {
            this.metaScoreColor = '#f00';
          }

          console.log('metascore color', this.metaScoreColor);
        }
        this.tomatoMeter = (this.omdbMovie.tomatoMeter != 'N/A') ? this.omdbMovie.tomatoMeter + '%' : '--';
        this.flixsterImage = 'flixster';
        if (this.omdbMovie.tomatoUserRating != 'N/A') {
          if (parseInt(this.omdbMovie.tomatoUserRating) >= 3.5)
            this.flixsterImage = 'flixster';
          else
            this.flixsterImage = 'flixster_spilled';
        }
        this.flixster = (this.omdbMovie.tomatoUserMeter != 'N/A') ? this.omdbMovie.tomatoUserMeter + '%' : '--';
        this.imdb = (this.omdbMovie.imdbRating != 'N/A') ? this.omdbMovie.imdbRating : '--';
        this.tomatoImage = (this.omdbMovie.tomatoImage != 'N/A') ? this.omdbMovie.tomatoImage : 'rottentomatoes';
        this.tomatourl = (this.omdbMovie.tomatoURL != 'N/A') ? this.omdbMovie.tomatoURL : '';
        console.log('tomato url', this.tomatourl)
      } else {
        this.metaScore = '--';
        this.tomatoMeter = '--';
        this.flixster = '--';
        this.imdb = '--';
        this.tomatoImage = 'rottentomatoes';
        this.tomatourl = '';
      }
    });
  }

  viewCastDetail(casts) {
    if (casts.length == 0)
      this.showToast('No Casts to Show', 'bottom');
    else {
      this.nav.push(CastPagePage, {
        casts: casts,
        movietitle: this.title,
        type: 'Movies'
      });
    }
  }

  viewBackdrops(backdrops) {
    if (backdrops.length == 0)
      this.showToast('No Backdrops to Show', 'bottom');
    else
      this.nav.push(BackdropsPage, {
        backdrops: backdrops,
        movietitle: this.title,
      });
  }

  viewSimilar(similar) {
    if (similar.length == 0) {
      console.log('platform', this.platform);
      this.platform.ready().then(() => {
        this.showToast('No Similar Movies', 'bottom');
      });
    }
    else {
      this.nav.push(SimilarMoviesPage, {
        similar: similar,
        movietitle: this.title,
        movieID: this.movieID,
        type: 'Movies'
      });
    }
  }

  viewTrailers(videos) {
    console.log('videos', videos);

    if (videos.length > 0)
      this.nav.push(TrailersPage, videos);
    else
      this.showToast('No Trailers', 'bottom');
  }

  showToast(message, position) {
    Toast.show(message, "short", position).subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

  goToCastDetail(cast) {
    this.nav.push(CastDetailPage, {
      id: cast.id,
      movietitle: this.title
    });
  }

  openImage() {
    var index: string = '';
    this.nav.push(ImagePopoverPage, {
      images: this.movie.images.posters,
      index: index
    });
  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  readMore() {
    new InAppBrowser('https://www.google.com/search?q=' + this.title, '_blank', 'location=yes');
  }

  //http://www.imdb.com/title/tt1860357/criticreviews?ref_=tt_ov_rt
  viewMetacritic() {
    if (this.movie.imdb_id != '')
      new InAppBrowser('http://www.imdb.com/title/' + this.movie.imdb_id + '/criticreviews?ref_=tt_ov_rt', '_blank', 'location=yes');
  }

  viewTomato() {
    console.log('imdb url', this.tomatourl);
    if (this.tomatourl != '')
      new InAppBrowser(this.tomatourl, '_blank', 'location=yes');
  }

  viewIMDB() {
    console.log('imdb url', this.movie.imdb_id);
    if (this.movie.imdb_id != '')
      new InAppBrowser('http://www.imdb.com/title/' + this.movie.imdb_id, '_blank', 'location=yes');
  }

  viewReviews() {
    if (this.reviews.length == 0)
      this.showToast('No Reviews to Show', 'bottom');
    else
      this.nav.push(Reviews, {
        reviews: this.reviews,
        title: this.title,
      });
  }
}
