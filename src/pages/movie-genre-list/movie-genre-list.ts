import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { GenreService } from '../../providers/genre-service/genre-service';
import { MovieDetailsPage } from '../movie-details/movie-details';

import { GoogleAnalytics } from 'ionic-native';
/*
  Generated class for the MovieGenreListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'movie-genre-list.html'
})
export class MovieGenreListPage {
  movieGenre: any;
  public cachedMoviesFound = [];
  public movieRows = [];
  public baseImageUrl: string = 'http://image.tmdb.org/t/p/w300';
  title: string = '';

  pageNo: number = 1;
  totalPages: number = 1;
  genreID = "";

  constructor(public nav: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public genreService: GenreService) {
    this.movieGenre = this.navParams.data;
    this.title = this.navParams.data.name;
    console.log('navparams', this.navParams.data.id);
    this.genreID = this.navParams.data.id;
    this.loadMovie(this.navParams.data.id);

    this.platform.ready().then(() => {
      GoogleAnalytics.trackView("Movie Genre List Page");
    });
  }

  loadMovie(genreID) {
    this.genreService.getListMovieGenresByID(genreID, this.pageNo).then(_body => {
      this.movieGenre = _body.results;
      this.totalPages = _body.total_pages;
      console.log('body', _body.results);
      this.movieRows = Array.from(Array(Math.ceil(this.movieGenre.length / 3)).keys());
      this.cachedMoviesFound = this.movieGenre;
    });
  }

  goToMovieDetail(movie) {
    this.nav.push(MovieDetailsPage, {
      movie: movie,
      isTV: '0'
    });
  }

  nextPage() {
    if (this.pageNo <= this.totalPages) {
      this.pageNo++;
      this.movieGenre = null;
      this.genreService.getListMovieGenresByID(this.genreID, this.pageNo).then(_body => {
        console.log(_body);
        this.totalPages = _body.total_pages;
        this.movieGenre = _body.results;
        this.movieRows = Array.from(Array(Math.ceil(this.movieGenre.length / 3)).keys());
        this.cachedMoviesFound = this.movieGenre;
      });
    }
  }

  previousPage() {
    if (this.pageNo > 1) {
      this.pageNo--;
      this.movieGenre = null;
      this.genreService.getListMovieGenresByID(this.genreID, this.pageNo).then(_body => {
        console.log(_body);
        this.totalPages = _body.total_pages;
        this.movieGenre = _body.results;
        this.movieRows = Array.from(Array(Math.ceil(this.movieGenre.length / 3)).keys());
        this.cachedMoviesFound = this.movieGenre;
      });
    }
  }
}
