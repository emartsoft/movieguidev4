import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { TvShowSeasonViewPage } from '../tv-show-season-view/tv-show-season-view';
import { TvShowService } from '../../providers/tv-show-service/tv-show-service';

import { GoogleAnalytics } from 'ionic-native';
/*
  Generated class for the TvShowSeasonsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'tv-show-seasons.html'
})
export class TvShowSeasonsPage {
  seasons: any;
  season: any;
  title: string = '';
  tvID: string = '';
  seasonNumber: string = '';
  public baseImageUrl: string = 'http://image.tmdb.org/t/p/w300';

  constructor(public nav: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public tvShowService: TvShowService) {
    console.log('seasons data list', this.navParams.data);
    this.seasons = [];
    this.seasons = this.navParams.data.seasons;
    this.title = this.navParams.data.title;
    this.tvID = this.navParams.data.tvID;
    //this.fetchTVSeasonByID(this.tvID, this.navParams.data.seasons.season_number);
    console.log('seasons page', this.seasons);


    this.platform.ready().then(() => {
      GoogleAnalytics.trackView("TV Show Seasons Page");
    });
  }

  fetchTVSeasonByID(tvID, tvSeasonID) {
    this.tvShowService.getSearchTVSeason(tvID, tvSeasonID).then(_body => {
      this.seasons = _body;
      console.log('seasons info', this.seasons);
    });
  }

  goToSeasonDetail(season) {
    this.nav.push(TvShowSeasonViewPage, {
      season: season,
      tvID: this.tvID,
      title: this.title
    })
  }
}
