import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { GenreService } from '../../providers/genre-service/genre-service';
import { MovieGenreListPage } from '../movie-genre-list/movie-genre-list';

import { GoogleAnalytics } from 'ionic-native';
/*
  Generated class for the MovieGenresPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'movie-genres.html'
})
export class MovieGenresPage {
  genres: any;
  genreRows = [];
  constructor(public nav: NavController,
    public platform: Platform,
    public genreService: GenreService) {
    this.loadMovieGenres();

    this.platform.ready().then(() => {
      GoogleAnalytics.trackView("Movie Genre Page");
    });
  }

  loadMovieGenres() {
    this.genreService.getListMovieGenres().then(_body => {
      this.genres = _body.genres;
      //this.genreRows = Array.from(Array(Math.ceil(this.genres.length / 2)).keys());
      console.log('genres', this.genres)
    });
  }

  viewMovieGenres(genre) {
    this.nav.push(MovieGenreListPage, genre)
  }

}
