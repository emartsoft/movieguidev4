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
  templateUrl: 'popular-movies.html'
})
export class PopularMoviesPage {
  public popularMoviesFound = [];
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
    this.loadPopularMovies();
    //this.searchQuery = '';

    this.platform.ready().then(() => {
      GoogleAnalytics.trackView("Popular Movies Page");
    });
  }

  loadPopularMovies() {
    this.movieService.getPopularMovies(this.pageNo).then(_body => {
      this.popularMoviesFound = _body.results;
      this.totalPages = _body.total_pages;
      this.movieRows = Array.from(Array(Math.ceil(this.popularMoviesFound.length / 3)).keys());
      this.cachedMoviesFound = this.popularMoviesFound;
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
      this.popularMoviesFound = _body.results;
      this.movieRows = Array.from(Array(Math.ceil(this.popularMoviesFound.length / 3)).keys());
    });
  }

  clearFilterMovie() {
    this.popularMoviesFound = this.cachedMoviesFound;
  }

  nextPage() {
    if (this.pageNo <= this.totalPages) {
      this.pageNo++;
      this.popularMoviesFound = null;
      this.movieService.getPopularMovies(this.pageNo).then(_body => {
        console.log(_body);
        this.totalPages = _body.total_pages;
        this.popularMoviesFound = _body.results;
        this.movieRows = Array.from(Array(Math.ceil(this.popularMoviesFound.length / 3)).keys());
        this.cachedMoviesFound = this.popularMoviesFound;
      });
    }
  }

  previousPage() {
    if (this.pageNo > 1) {
      this.pageNo--;
      this.popularMoviesFound = null;
      this.movieService.getPopularMovies(this.pageNo).then(_body => {
        console.log(_body);
        this.totalPages = _body.total_pages;
        this.popularMoviesFound = _body.results;
        this.movieRows = Array.from(Array(Math.ceil(this.popularMoviesFound.length / 3)).keys());
        this.cachedMoviesFound = this.popularMoviesFound;
      });
    }
  }
}
