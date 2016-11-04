import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { MovieService } from '../../providers/movie-service/movie-service';
import { MovieDetailsPage } from '../movie-details/movie-details';

import { GoogleAnalytics } from 'ionic-native';
/*
  Generated class for the MovieLatestInTheatrePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'movie-latest-in-theatre.html'
})
export class MovieLatestInTheatrePage {

  public latestMoviesFound = [];
  public baseImageUrl: string = 'http://image.tmdb.org/t/p/w300';
  public movieRows = [];
  isLoading = true;
  pageNoMovie: number = 1;
  totalPagesMovie: number = 1;

  constructor(public nav: NavController,
    public movieService: MovieService,
    public platform: Platform) {
    this.loadLatestMovie();

    this.platform.ready().then(() => {
      GoogleAnalytics.trackView("Movie Latest in Theatre Page");
    });

  }

  loadLatestMovie() {
    this.movieService.getLatestMovies(this.pageNoMovie).then(_body => {
      this.latestMoviesFound = _body.results;
      this.isLoading = false;
      this.totalPagesMovie = _body.total_pages;
      this.movieRows = Array.from(Array(Math.ceil(this.latestMoviesFound.length / 3)).keys());
    });
  }

  goToMovieDetail(movie) {
    this.nav.push(MovieDetailsPage, {
      movie: movie,
      isTV: '0'
    });
  }

  nextPageMovie() {
    if (this.pageNoMovie <= this.totalPagesMovie) {
      this.pageNoMovie++;
      this.latestMoviesFound = null;
      this.movieService.getLatestMovies(this.pageNoMovie).then(_body => {
        console.log(_body);
        this.totalPagesMovie = _body.total_pages;
        this.latestMoviesFound = _body.results;
        this.movieRows = Array.from(Array(Math.ceil(this.latestMoviesFound.length / 3)).keys());
        //this.cachedMoviesFound = this.latestMoviesFound;
      });
    }
  }

  previousPageMovie() {
    if (this.pageNoMovie > 1) {
      this.pageNoMovie--;
      this.latestMoviesFound = null;
      this.movieService.getLatestMovies(this.pageNoMovie).then(_body => {
        console.log(_body);
        this.totalPagesMovie = _body.total_pages;
        this.latestMoviesFound = _body.results;
        this.movieRows = Array.from(Array(Math.ceil(this.latestMoviesFound.length / 3)).keys());
        //this.cachedMoviesFound = this.latestMoviesFound;
      });
    }
  }

  home() {
    this.pageNoMovie = 1;
    this.loadLatestMovie();
  }

}
