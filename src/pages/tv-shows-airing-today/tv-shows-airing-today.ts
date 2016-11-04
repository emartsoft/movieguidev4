import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { TvShowService } from '../../providers/tv-show-service/tv-show-service';
import { TvDetailsPage } from '../tv-details/tv-details';

import { GoogleAnalytics } from 'ionic-native';
/*
  Generated class for the TvShowsAiringTodayPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'tv-shows-airing-today.html'
})
export class TvShowsAiringTodayPage {

  public tvAiringTodayFound = [];
  public baseImageUrl: string = 'http://image.tmdb.org/t/p/w300';
  public tvRows = [];
  isLoading = true;
  pageNoTV: number = 1;
  totalPagesTV: number = 1;

  constructor(public nav: NavController,
    public tvShowService: TvShowService,
    public platform: Platform) {

    this.loadTVAiringToday();

    this.platform.ready().then(() => {
      GoogleAnalytics.trackView("TV Shows Airing Today Page");
    });
  }

  loadTVAiringToday() {
    this.tvShowService.getTVAiringToday(this.pageNoTV).then(_body => {
      this.tvAiringTodayFound = _body.results;
      this.totalPagesTV = _body.total_pages;
      this.tvRows = Array.from(Array(Math.ceil(this.tvAiringTodayFound.length / 3)).keys());
    });
  }

  goToTVDetail(tv) {
    this.nav.push(TvDetailsPage, {
      tv: tv,
      isTV: '1'
    });
  }

  nextPageTV() {
    if (this.pageNoTV <= this.totalPagesTV) {
      this.pageNoTV++;
      this.tvAiringTodayFound = null;
      this.tvShowService.getTVAiringToday(this.pageNoTV).then(_body => {
        console.log(_body);
        this.totalPagesTV = _body.total_pages;
        this.tvAiringTodayFound = _body.results;
        this.tvRows = Array.from(Array(Math.ceil(this.tvAiringTodayFound.length / 3)).keys());
        //this.cachedMoviesFound = this.tvAiringTodayFound;
      });
    }
  }

  previousPageTV() {
    if (this.pageNoTV > 1) {
      this.pageNoTV--;
      this.tvAiringTodayFound = null;
      this.tvShowService.getTVAiringToday(this.pageNoTV).then(_body => {
        console.log(_body);
        this.totalPagesTV = _body.total_pages;
        this.tvAiringTodayFound = _body.results;
        this.tvRows = Array.from(Array(Math.ceil(this.tvAiringTodayFound.length / 3)).keys());
        //this.cachedMoviesFound = this.tvAiringTodayFound;
      });
    }
  }
}
