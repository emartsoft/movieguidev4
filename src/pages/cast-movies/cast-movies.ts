import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { MovieDetailsPage } from '../movie-details/movie-details';
import { TvDetailsPage } from '../tv-details/tv-details';

import { GoogleAnalytics } from 'ionic-native';
/*
  Generated class for the CastMoviesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'cast-movies.html',
})
export class CastMoviesPage {
  public baseImageUrl: string = 'http://image.tmdb.org/t/p/w300';
  public movieRows = [];
  public tvRows = [];
  castMovies: any;
  castTvShows: any;
  castName: string = '';

  constructor(public nav: NavController,
    public navParams: NavParams,
    public platform: Platform) {
    console.log('cast movie data', this.navParams.data);
    this.castMovies = [];
    this.castMovies = this.navParams.data.castMovies;
    this.castTvShows = [];
    this.castTvShows = this.navParams.data.castTvShows;

    this.castName = this.navParams.data.castName;
    console.log('cast movie page', this.castMovies);
    this.movieRows = Array.from(Array(Math.ceil(this.castMovies.length / 4)).keys());
    this.tvRows = Array.from(Array(Math.ceil(this.castTvShows.length / 4)).keys());

    this.platform.ready().then(() => {
      GoogleAnalytics.trackView("Cast Movies Page");
    });
  }


  goToMovieDetail(movie) {
    this.nav.push(MovieDetailsPage, {
      movie: movie,
      isTV: '0'
    });
  }

  goToTVDetail(tv) {
    this.nav.push(TvDetailsPage, {
      tv: tv,
      isTV: '1'
    });
  }


}
