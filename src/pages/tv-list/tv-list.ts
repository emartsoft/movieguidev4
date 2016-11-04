import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { TvShowService } from '../../providers/tv-show-service/tv-show-service';
import { TvDetailsPage } from '../tv-details/tv-details';

import { GoogleAnalytics } from 'ionic-native';
/*
  Generated class for the TvListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'tv-list.html'
})
export class TvListPage {
  public tvAiringTodayFound = [];
  public cachedTVShowsFound = [];
  public baseImageUrl: string = 'http://image.tmdb.org/t/p/w300';
  public tvRows = [];
  public tvDatas: TvShowService;
  searchQuery: string = '';

  constructor(public nav: NavController,
    public platform: Platform,
    public tvShowService: TvShowService) {
    this.loadTVAiringToday(tvShowService);

    this.platform.ready().then(() => {
      GoogleAnalytics.trackView("TV List (Airing Today) Page");
    });
  }

  loadTVAiringToday(tvData) {
    tvData.getTVAiringToday().then(_body => {
      this.tvAiringTodayFound = _body.results;
      this.tvRows = Array.from(Array(Math.ceil(this.tvAiringTodayFound.length / 3)).keys());
      this.cachedTVShowsFound = this.tvAiringTodayFound;
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
      this.tvAiringTodayFound = _body.results;
      this.tvRows = Array.from(Array(Math.ceil(this.tvAiringTodayFound.length / 3)).keys());
    });
  }

  clearFilterTVShows() {
    this.tvAiringTodayFound = this.cachedTVShowsFound;
  }

}

