import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { MovieService } from '../../providers/movie-service/movie-service';
import { MovieDetailsPage } from '../movie-details/movie-details';

import { GoogleAnalytics } from 'ionic-native';
/*
  Generated class for the MovieListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'movie-list.html'
})
export class MovieListPage {
  public latestMoviesFound = [];
  public cachedMoviesFound = [];
  public baseImageUrl: string = 'http://image.tmdb.org/t/p/w300';
  public movieRows = [];
  public movieDatas: MovieService;
  searchQuery: string = '';
  pageNo: number = 1;
  totalPages: number = 1;

  constructor(public nav: NavController,
    public platform: Platform,
    public movieService: MovieService) {
    this.loadLatestMovie();

    this.platform.ready().then(() => {
      GoogleAnalytics.trackView("Movie List Page");
    });
  }

  loadLatestMovie() {
    this.movieService.getLatestMovies(this.pageNo).then(_body => {
      console.log(_body);
      this.totalPages = _body.total_pages;
      this.latestMoviesFound = _body.results;
      this.movieRows = Array.from(Array(Math.ceil(this.latestMoviesFound.length / 3)).keys());
      this.cachedMoviesFound = this.latestMoviesFound;
    });
  }

  goToMovieDetail(movie) {
    this.nav.push(MovieDetailsPage, {
      movie: movie,
      isTV: '0'
    });
  }

  searchMovies() {
    this.movieService.getSearchMoviesByTitle(this.searchQuery).then(_body => {
      console.log('search query', this.searchQuery);
      this.latestMoviesFound = _body.results;
      this.movieRows = Array.from(Array(Math.ceil(this.latestMoviesFound.length / 3)).keys());
    });
  }

  clearFilterMovie() {
    this.latestMoviesFound = this.cachedMoviesFound;
  }

  nextPage() {
    if (this.pageNo <= this.totalPages) {
      this.pageNo++;
      this.latestMoviesFound = null;
      this.movieService.getLatestMovies(this.pageNo).then(_body => {
        console.log(_body);
        this.totalPages = _body.total_pages;
        this.latestMoviesFound = _body.results;
        this.movieRows = Array.from(Array(Math.ceil(this.latestMoviesFound.length / 3)).keys());
        this.cachedMoviesFound = this.latestMoviesFound;
      });
    }
  }

  previousPage() {
    if (this.pageNo > 1) {
      this.pageNo--;
      this.latestMoviesFound = null;
      this.movieService.getLatestMovies(this.pageNo).then(_body => {
        console.log(_body);
        this.totalPages = _body.total_pages;
        this.latestMoviesFound = _body.results;
        this.movieRows = Array.from(Array(Math.ceil(this.latestMoviesFound.length / 3)).keys());
        this.cachedMoviesFound = this.latestMoviesFound;
      });
    }
  }
}
