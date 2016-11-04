import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { MovieDetailsPage } from '../movie-details/movie-details';
import { MovieService } from '../../providers/movie-service/movie-service';

import { GoogleAnalytics } from 'ionic-native';
/*
  Generated class for the SimilarMoviesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'similar-movies.html'
})
export class SimilarMoviesPage {
  public baseImageUrl: string = 'http://image.tmdb.org/t/p/w300';
  public movieRows = [];
  similar: any;
  title: string = '';
  types: string = '';
  movieID: string = '';
  pageNo: number = 1;
  totalPages: number = 1;

  constructor(public nav: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public movieService: MovieService) {
    console.log('similar data', this.navParams.data);
    this.similar = [];
    this.similar = this.navParams.data.similar;
    this.title = this.navParams.data.movietitle;
    this.types = this.navParams.data.type;
    this.movieID = this.navParams.data.movieID;
    console.log('similar page', this.similar);
    this.movieRows = Array.from(Array(Math.ceil(this.similar.length / 3)).keys());

    this.platform.ready().then(() => {
      GoogleAnalytics.trackView("Similar Movies Page");
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
      this.similar = null;
      this.movieService.getSimilarMovieShows(this.movieID, this.pageNo).then(_body => {
        console.log(_body);
        this.totalPages = _body.total_pages;
        this.similar = _body.results;
        this.movieRows = Array.from(Array(Math.ceil(this.similar.length / 3)).keys());
        //this.cachedMoviesFound = this.similar;
      });
    }
  }

  previousPage() {
    if (this.pageNo > 1) {
      this.pageNo--;
      this.similar = null;
      this.movieService.getSimilarMovieShows(this.movieID, this.pageNo).then(_body => {
        console.log(_body);
        this.totalPages = _body.total_pages;
        this.similar = _body.results;
        this.movieRows = Array.from(Array(Math.ceil(this.similar.length / 3)).keys());
        //this.cachedMoviesFound = this.similar;
      });
    }
  }

}
