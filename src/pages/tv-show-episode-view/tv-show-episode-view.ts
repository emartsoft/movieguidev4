import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { TvShowService } from '../../providers/tv-show-service/tv-show-service';
import { CastDetailPage } from '../cast-detail/cast-detail';

import { GoogleAnalytics } from 'ionic-native';

/*
  Generated class for the TvShowEpisodeViewPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'tv-show-episode-view.html'
})
export class TvShowEpisodeViewPage {
  episode_detail: any;
  tvID: string = '';
  seasonNumber: string = '';
  episodeNumber: string = '';
  title: string = '';
  episodes: any;
  crews: any;
  guest_stars: any;
  public crewRows = [];
  public guestStarRows = [];

  public baseBigImageUrlBig: string = '';
  public baseImageUrl: string = 'http://image.tmdb.org/t/p/w300';
  public baseBigImageUrl: string = 'http://image.tmdb.org/t/p/w500';
  public baseBiggerImageUrl: string = 'http://image.tmdb.org/t/p/w1000';

  screenWidth: number;

  constructor(public nav: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public tvShowService: TvShowService) {
    console.log('episode details data', this.navParams.data);
    this.tvID = this.navParams.data.tvID;
    this.seasonNumber = this.navParams.data.seasonNumber;
    this.title = this.navParams.data.title;
    this.episode_detail = [];
    this.episode_detail = this.navParams.data.episode;
    this.episodeNumber = this.navParams.data.episode.episode_number;
    this.fetchMoreEpisodeDetail(this.tvID, this.seasonNumber, this.episodeNumber);

    if (this.screenWidth > 600)
      this.baseBigImageUrlBig = this.baseBiggerImageUrl;
    else
      this.baseBigImageUrlBig = this.baseBigImageUrl;

    this.platform.ready().then(() => {
      GoogleAnalytics.trackView("TV Show Episode View Page");
    });

  }

  fetchMoreEpisodeDetail(tvID, seasonNumber, episodeNumber) {
    this.tvShowService.getSearchTVEpisode(tvID, seasonNumber, episodeNumber).then(_body => {
      this.episode_detail = _body;
      this.crews = this.episode_detail.crew;
      this.guest_stars = this.episode_detail.guest_stars;
      if (this.crews != undefined)
        this.crewRows = Array.from(Array(Math.ceil(this.crews.length / 3)).keys());
      if (this.guest_stars != undefined)
        this.guestStarRows = Array.from(Array(Math.ceil(this.guest_stars.length / 3)).keys());
      //console.log('crews', this.crews);
      //this.episodes = this.episode_detail.episodes;
      console.log('episode det page', this.episode_detail);
    });
  }

  goToCastDetail(cast) {
    this.nav.push(CastDetailPage, {
      id: cast.id,
      movietitle: this.title
    });
  }

}
