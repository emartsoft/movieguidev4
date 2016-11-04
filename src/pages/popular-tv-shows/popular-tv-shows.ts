import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { TvShowService } from '../../providers/tv-show-service/tv-show-service';
import { TvDetailsPage } from '../tv-details/tv-details';

import { GoogleAnalytics } from 'ionic-native';
/*
  Generated class for the PopularTvShowsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'popular-tv-shows.html'
})
export class PopularTvShowsPage {
  public popularTvShowsFound = [];
  public cachedTVShowsFound = [];
  public baseImageUrl: string = 'http://image.tmdb.org/t/p/w300';
  public tvRows = [];
  public tvDatas: TvShowService;
  searchQuery: string = '';
  pageNo: number = 1;
  totalPages: number = 1;

  constructor(public nav: NavController,
    public platform: Platform,
    public tvShowService: TvShowService) {
    this.loadPopularTVShows();

    this.platform.ready().then(() => {
      GoogleAnalytics.trackView("Popular TV Shows Page");
    });
  }

  loadPopularTVShows() {
    this.tvShowService.getPopularTVShows(this.pageNo).then(_body => {
      this.popularTvShowsFound = _body.results;
      this.totalPages = _body.total_pages;
      this.tvRows = Array.from(Array(Math.ceil(this.popularTvShowsFound.length / 3)).keys());
      this.cachedTVShowsFound = this.popularTvShowsFound;
    });
  }

  goToTVDetail(tv) {
    this.nav.push(TvDetailsPage, {
      tv: tv,
      isTV: '1'
    });
  }

  searchTVShows() {
    this.tvShowService.getSearchTVShowsByTitle(this.searchQuery).then(_body => {
      console.log('search query', this.searchQuery);
      this.popularTvShowsFound = _body.results;
      this.tvRows = Array.from(Array(Math.ceil(this.popularTvShowsFound.length / 3)).keys());
    });
  }

  clearFilterTVShows() {
    this.popularTvShowsFound = this.cachedTVShowsFound;
  }


  nextPage() {
    if (this.pageNo <= this.totalPages) {
      this.pageNo++;
      this.popularTvShowsFound = null;
      this.tvShowService.getPopularTVShows(this.pageNo).then(_body => {
        console.log(_body);
        this.totalPages = _body.total_pages;
        this.popularTvShowsFound = _body.results;
        this.tvRows = Array.from(Array(Math.ceil(this.popularTvShowsFound.length / 3)).keys());
        this.cachedTVShowsFound = this.popularTvShowsFound;
      });
    }
  }

  previousPage() {
    if (this.pageNo > 1) {
      this.pageNo--;
      this.popularTvShowsFound = null;
      this.tvShowService.getPopularTVShows(this.pageNo).then(_body => {
        console.log(_body);
        this.totalPages = _body.total_pages;
        this.popularTvShowsFound = _body.results;
        this.tvRows = Array.from(Array(Math.ceil(this.popularTvShowsFound.length / 3)).keys());
        this.cachedTVShowsFound = this.popularTvShowsFound;
      });
    }
  }
}
