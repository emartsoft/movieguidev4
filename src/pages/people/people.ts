import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { PeopleService } from '../../providers/people-service/people-service';
import { CastDetailPage } from '../cast-detail/cast-detail';

import { GoogleAnalytics } from 'ionic-native';
/*
  Generated class for the PeoplePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'people.html'
})
export class PeoplePage {
  peoples: any;
  public cachedPeopleFound = [];
  public peopleRows = [];
  public baseImageUrl: string = 'http://image.tmdb.org/t/p/w300';
  public bgurl: string = '';
  public findCast: any;
  movietitle: string = '';
  searchQuery: string = '';

  pageNo: number = 1;
  totalPages: number = 1;


  constructor(public nav: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public peopleService: PeopleService) {
    this.loadPopularPeople();

    this.platform.ready().then(() => {
      GoogleAnalytics.trackView("People Page");
    });
  }

  loadPopularPeople() {
    this.peopleService.getListPopularPeople(this.pageNo).then(_body => {
      this.peoples = _body.results;
      this.totalPages = _body.total_pages;
      console.log('body', _body.results);

      this.peopleRows = Array.from(Array(Math.ceil(this.peoples.length / 3)).keys());
      this.cachedPeopleFound = this.peoples;
    });
  }

  goToCastDetail(people) {
    this.nav.push(CastDetailPage, {
      id: people.id,
      movietitle: this.movietitle
    });
  }

  searchPeople() {
    this.peopleService.getSearchPersonByName(this.searchQuery).then(_body => {
      console.log('search person query', this.searchQuery);
      this.peoples = _body.results;
      this.peopleRows = Array.from(Array(Math.ceil(this.peoples.length / 3)).keys());
    });
  }

  clearFilterPeople() {
    this.peoples = this.cachedPeopleFound;
  }

  nextPage() {
    if (this.pageNo <= this.totalPages) {
      this.pageNo++;
      this.peoples = null;
      this.peopleService.getListPopularPeople(this.pageNo).then(_body => {
        console.log(_body);
        this.totalPages = _body.total_pages;
        this.peoples = _body.results;
        this.peopleRows = Array.from(Array(Math.ceil(this.peoples.length / 3)).keys());
        this.cachedPeopleFound = this.peoples;
      });
    }
  }

  previousPage() {
    if (this.pageNo > 1) {
      this.pageNo--;
      this.peoples = null;
      this.peopleService.getListPopularPeople(this.pageNo).then(_body => {
        console.log(_body);
        this.totalPages = _body.total_pages;
        this.peoples = _body.results;
        this.peopleRows = Array.from(Array(Math.ceil(this.peoples.length / 3)).keys());
        this.cachedPeopleFound = this.peoples;
      });
    }
  }
}
