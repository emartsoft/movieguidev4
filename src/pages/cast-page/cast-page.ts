import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { PeopleService } from '../../providers/people-service/people-service';
import { CastDetailPage } from '../cast-detail/cast-detail';

import { GoogleAnalytics } from 'ionic-native';
/*
  Generated class for the CastPagePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'cast-page.html'
})
export class CastPagePage {
  casts: any;
  public castRows = [];
  public baseImageUrl: string = 'http://image.tmdb.org/t/p/w300';
  public bgurl: string = '';
  public findCast: any;
  movietitle: string = '';
  constructor(public nav: NavController,
    public navParams: NavParams,
    public peopleService: PeopleService,
    public platform: Platform) {
    console.log('casts', this.navParams.data.casts);

    this.casts = this.navParams.data.casts;
    this.movietitle = this.navParams.data.movietitle;
    this.castRows = Array.from(Array(Math.ceil(this.casts.length / 3)).keys());

    this.platform.ready().then(() => {
      GoogleAnalytics.trackView("Cast Page");
    });
  }

  fetchPersonByID(personID) {
    this.peopleService.getSearchPersonByID(personID).then(_body => {
      this.findCast = _body;
      console.info('Finished receiving data, async operation complete');
    });
  }

  goToCastDetail(cast) {
    this.nav.push(CastDetailPage, {
      id: cast.id,
      movietitle: this.movietitle
    });
  }

}
