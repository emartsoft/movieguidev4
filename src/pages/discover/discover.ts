import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { GenreService } from '../../providers/genre-service/genre-service';
import { DiscoverService } from '../../providers/discover-service/discover-service';
import { MovieDetailsPage } from '../movie-details/movie-details';
import { TvDetailsPage } from '../tv-details/tv-details';

import { GoogleAnalytics } from 'ionic-native';
/*
  Generated class for the DiscoverPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'discover.html'
})
export class DiscoverPage {

  discoveredMovies: any;
  discoveredTVShows: any;

  media_type: any;
  year: any;
  sort_by: any;
  genre: any;

  public yearsPopulated = [];
  public years = [];
  public genres = [];

  public isTV: boolean = false;
  public isMovie: boolean = false;

  public movieRows = [];
  public tvRows = [];

  pageNoMovie: number = 1;
  totalPagesMovie: number = 1;

  pageNoTV: number = 1;
  totalPagesTV: number = 1;

  genreSelected: string = '';
  yearSelected: string = '';
  sortBySelected: string = '';
  public baseImageUrl: string = 'http://image.tmdb.org/t/p/w300';

  constructor(public navCtrl: NavController,
    public platform: Platform,
    public genreService: GenreService,
    public discoverService: DiscoverService) {
    this.populateYears();
    this.loadMovieGenres();

    this.platform.ready().then(() => {
      GoogleAnalytics.trackView("Discover Page");
    });
  }

  populateYears() {
    for (let x = 1900; x < 2017; x++) {
      this.yearsPopulated.push(x);
    }
    this.years = this.yearsPopulated.sort((n1, n2) => n2 - n1)
  }

  loadMovieGenres() {
    this.genreService.getListMovieGenres().then(_body => {
      this.genres = _body.genres;
      console.log('genres', this.genres)
    });
  }

  discoverMovies(year, genres, sortby, pageNo) {
    this.discoverService.getDiscoverMovies(year, genres, sortby, pageNo).then(_body => {
      this.discoveredMovies = _body.results;
      this.totalPagesMovie = _body.total_pages;
      this.movieRows = Array.from(Array(Math.ceil(this.discoveredMovies.length / 4)).keys());
      console.log('Discovered Movies: ', this.discoveredMovies)
    });
  }

  discoverTVShows(year, genres, sortby, pageNo) {
    this.discoverService.getDiscoverTVShows(year, genres, sortby, pageNo).then(_body => {
      this.discoveredTVShows = _body.results;
      this.totalPagesTV = _body.total_pages;
      this.tvRows = Array.from(Array(Math.ceil(this.discoveredTVShows.length / 4)).keys());
      console.log('Discovered TV Shows: ', this.discoveredTVShows)
    });
  }

  discover() {
    if (this.genreSelected == '' && this.sortBySelected == '' && this.yearSelected == '')
      return;

    if (this.isMovie == true) {
      this.discoverMovies(this.yearSelected, this.genreSelected, this.sortBySelected, this.pageNoMovie);
    }
    else if (this.isTV == true) {
      this.discoverTVShows(this.yearSelected, this.genreSelected, this.sortBySelected, this.pageNoTV);
    }
  }


  goToMovieDetail(movie) {
    this.navCtrl.push(MovieDetailsPage, {
      movie: movie,
      isTV: '0'
    });
  }

  goToTVDetail(tv) {
    this.navCtrl.push(TvDetailsPage, {
      tv: tv,
      isTV: '1'
    });
  }

  genreChanged(selectedGenre) {
    console.log('Selected Genre:', selectedGenre);
    this.genreSelected = '';
    for (let x = 0; x < selectedGenre.length; x++) {
      if (this.genreSelected == '')
        this.genreSelected = selectedGenre[x];
      else
        this.genreSelected = this.genreSelected + ',' + selectedGenre[x];
      console.log('genre Selected:', this.genreSelected);
    }

    this.discover();
  }

  sortByChanged(sortedBy) {
    console.log('Sorted By:', sortedBy);
    this.sortBySelected = sortedBy;

    this.discover();
  }

  yearChanged(selectedYear) {
    console.log('Selected Year:', selectedYear);
    this.yearSelected = selectedYear;

    this.discover();
  }

  mediaTypeChanged(selectedMediaType) {
    console.log('Selected MediaType:', selectedMediaType);
    this.isMovie = false; this.isTV = false;
    if (selectedMediaType == 'Movie') {
      this.isMovie = true;
    }
    else if (selectedMediaType == 'TV Show') {
      this.isTV = true;
    }
    console.log('is tv:', this.isTV);
    this.discover();
  }

  nextPage() {
    if (this.isMovie == true) {
      if (this.pageNoMovie <= this.totalPagesMovie) {
        this.pageNoMovie++;
        this.discoveredMovies = null;

        this.discoverMovies(this.yearSelected, this.genreSelected, this.sortBySelected, this.pageNoMovie);
      }

    } else if (this.isTV == true) {
      if (this.pageNoTV <= this.totalPagesMovie) {
        this.pageNoTV++;
        this.discoveredTVShows = null;

        this.discoverTVShows(this.yearSelected, this.genreSelected, this.sortBySelected, this.pageNoTV);
      }
    }
  }

  previousPage() {
    this.discoveredMovies = null;
    if (this.isMovie == true) {
      if (this.pageNoMovie > 1) {
        this.pageNoMovie--;
        this.discoveredMovies = null;

        this.discoverMovies(this.yearSelected, this.genreSelected, this.sortBySelected, this.pageNoMovie);
      }

    } else if (this.isTV == true) {
      if (this.pageNoTV > 1) {
        this.pageNoTV--;
        this.discoveredTVShows = null;

        this.discoverTVShows(this.yearSelected, this.genreSelected, this.sortBySelected, this.pageNoTV);
      }
    }
  }
}
