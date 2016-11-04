import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PeopleService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PeopleService {
  data: any = null;
  public apiKey: string = '7e06a4fd0118214660a718df4a73c51c';
  public baseUrl: string = 'http://api.themoviedb.org/3/';

  constructor(public http: Http) { }

  //Get the general person information for a specific id.: http://api.themoviedb.org/3/person/id
  searchPersonByID(PersonID) {
    this.data=null;
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {

      var url = this.baseUrl + 'person/' + PersonID + '?api_key=' + this.apiKey + '&append_to_response=combined_credits,images';
      console.log('search person by id url: ', url);
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  getSearchPersonByID(PersonID) {
    return this.searchPersonByID(PersonID);
  }

  //Search for people by name.: http://api.themoviedb.org/3/search/person
  searchPersonByName(personName) {
    //this.data=null;
    if (!this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {

      var url = this.baseUrl + 'search/person?api_key=' + this.apiKey + '&query=' + personName;
      console.log('search person name url: ', url);
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  getSearchPersonByName(personName) {
    return this.searchPersonByName(personName);
  }

  //Get the list of popular people on The Movie Database. This list refreshes every day:
  //http://api.themoviedb.org/3/person/popular
  listPopularPeople(pageNo) {
    this.data=null;
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {

      var url = this.baseUrl + 'person/popular?api_key=' + this.apiKey + '&page=' + pageNo;
      console.log('popular person name url: ', url);
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  getListPopularPeople(pageNo) {
    return this.listPopularPeople(pageNo);
  }
}

