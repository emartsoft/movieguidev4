import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { TvShowService } from '../../providers/tv-show-service/tv-show-service';
import { TvDetailsPage } from '../tv-details/tv-details';

import { GoogleAnalytics } from 'ionic-native';
/*
  Generated class for the UpcomingTvPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'upcoming-tv.html'
})
export class UpcomingTvPage {
  upcomingShowsFound = [];
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
    this.loadUpcomingTVShows();
    this.searchQuery = '';

    this.platform.ready().then(() => {
      GoogleAnalytics.trackView("Upcoming TV Page");
    });
  }

  loadUpcomingTVShows() {
    this.tvShowService.getUpcomingTVShows(this.pageNo).then(_body => {
      this.upcomingShowsFound = _body.results;
      this.totalPages = _body.total_pages;
      this.tvRows = Array.from(Array(Math.ceil(this.upcomingShowsFound.length / 3)).keys());
      this.cachedTVShowsFound = this.upcomingShowsFound;
    });
  }

  goToTVDetail(tv) {
    this.nav.push(TvDetailsPage, {
      tv: tv,
      isTV: '1'
    });
  }

  searchTVShows(queryWords) {
    this.tvShowService.getSearchTVShowsByTitle(queryWords.value).then(_body => {
      console.log('search query', queryWords.value);
      this.upcomingShowsFound = _body.results;
      this.tvRows = Array.from(Array(Math.ceil(this.upcomingShowsFound.length / 3)).keys());
    });
  }

  clearFilterTVShows(queryWords) {
    this.upcomingShowsFound = this.cachedTVShowsFound;
  }

  nextPage() {
    if (this.pageNo <= this.totalPages) {
      this.pageNo++;
      this.upcomingShowsFound = null;
      this.tvShowService.getUpcomingTVShows(this.pageNo).then(_body => {
        console.log(_body);
        this.totalPages = _body.total_pages;
        this.upcomingShowsFound = _body.results;
        this.tvRows = Array.from(Array(Math.ceil(this.upcomingShowsFound.length / 3)).keys());
        this.cachedTVShowsFound = this.upcomingShowsFound;
      });
    }
  }

  previousPage() {
    if (this.pageNo > 1) {
      this.pageNo--;
      this.upcomingShowsFound = null;
      this.tvShowService.getUpcomingTVShows(this.pageNo).then(_body => {
        console.log(_body);
        this.totalPages = _body.total_pages;
        this.upcomingShowsFound = _body.results;
        this.tvRows = Array.from(Array(Math.ceil(this.upcomingShowsFound.length / 3)).keys());
        this.cachedTVShowsFound = this.upcomingShowsFound;
      });
    }
  }
}
