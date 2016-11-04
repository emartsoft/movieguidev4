import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { TvDetailsPage } from '../tv-details/tv-details';
import { TvShowService } from '../../providers/tv-show-service/tv-show-service';

import { GoogleAnalytics } from 'ionic-native';
/*
  Generated class for the TvShowSimilarsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'tv-show-similars.html'
})
export class TvShowSimilarsPage {
  public baseImageUrl: string = 'http://image.tmdb.org/t/p/w300';
  public tvRows = [];
  similar: any;
  title: string = '';
  types: string = '';
  tvID: string = '';
  pageNo: number = 1;
  totalPages: number = 1;

  constructor(public nav: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public tvShowService: TvShowService) {
    console.log('similar data', this.navParams.data);
    this.similar = [];
    this.similar = this.navParams.data.similar;
    this.title = this.navParams.data.title;
    this.tvID = this.navParams.data.tvID;
    this.types = this.navParams.data.type;
    console.log('similar page', this.similar);
    this.tvRows = Array.from(Array(Math.ceil(this.similar.length / 3)).keys());

    this.platform.ready().then(() => {
      GoogleAnalytics.trackView("TV Show Episode View Page");
    });
  }

  goToTVDetail(tv) {
    this.nav.push(TvDetailsPage, {
      tv: tv,
      isTV: '1'
    });
  }

  nextPage() {
    if (this.pageNo <= this.totalPages) {
      this.pageNo++;
      this.similar = null;
      this.tvShowService.getSimilarTVShows(this.tvID, this.pageNo).then(_body => {
        console.log(_body);
        this.totalPages = _body.total_pages;
        this.similar = _body.results;
        this.tvRows = Array.from(Array(Math.ceil(this.similar.length / 3)).keys());
        //this.cachedMoviesFound = this.similar;
      });
    }
  }

  previousPage() {
    if (this.pageNo > 1) {
      this.pageNo--;
      this.similar = null;
      this.tvShowService.getSimilarTVShows(this.tvID, this.pageNo).then(_body => {
        console.log(_body);
        this.totalPages = _body.total_pages;
        this.similar = _body.results;
        this.tvRows = Array.from(Array(Math.ceil(this.similar.length / 3)).keys());
        //this.cachedMoviesFound = this.similar;
      });
    }
  }
}
