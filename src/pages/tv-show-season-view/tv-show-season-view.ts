import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { TvShowService } from '../../providers/tv-show-service/tv-show-service';
import { TvShowEpisodeViewPage } from '../tv-show-episode-view/tv-show-episode-view';

import { GoogleAnalytics } from 'ionic-native';
/*
  Generated class for the TvShowSeasonViewPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'tv-show-season-view.html'
})
export class TvShowSeasonViewPage {
  seasonDet: any;
  externalID: any;
  tvID: string = '';
  seasonNumber: string = '';
  title: string = '';
  episodes: any;
  public baseImageUrl: string = 'http://image.tmdb.org/t/p/w300';

  constructor(public nav: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public tvShowService: TvShowService) {
    console.log('seasons details data', this.navParams.data);
    this.tvID = this.navParams.data.tvID;
    this.seasonDet = [];
    this.seasonNumber = this.navParams.data.season.season_number;
    this.title = this.navParams.data.title;
    this.fetchSeasonDetail(this.tvID, this.seasonNumber);
    this.fetchSeasonExternalIDs(this.tvID);

    this.platform.ready().then(() => {
      GoogleAnalytics.trackView("TV Show Episode View Page");
    });
  }

  fetchSeasonDetail(tvID, seasonNumber) {
    this.tvShowService.getSearchTVSeason(tvID, seasonNumber).then(_body => {
      this.seasonDet = _body;
      this.episodes = this.seasonDet.episodes;
      // for (let x = 0; x < this.seasonDet.episodes.length; x++) {
      //   //console.log('air date null:', this.seasonDet.episodes[x].air_date);
      //   // if (this.seasonDet.episodes[x].air_date != null) {

      //   // }
      // }
      console.log('seasons det page', this.seasonDet);
    });
  }

  fetchSeasonExternalIDs(tvID) {
    this.tvShowService.getExternalIDsFetch(tvID).then(_body => {
      this.externalID = _body;
      console.log('external ids', this.externalID);
    });
  }

  goToEpisodeDetail(episode) {
    this.nav.push(TvShowEpisodeViewPage, {
      episode: episode,
      title: this.title,
      seasonNumber: this.seasonNumber,
      tvID: this.tvID
    });
  }
}
