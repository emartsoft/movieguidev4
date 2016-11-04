import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the SearchService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SearchService {
  data: any = null;
  public apiKey: string = '7e06a4fd0118214660a718df4a73c51c';
  public baseUrl: string = 'http://api.themoviedb.org/3/';

  constructor(public http: Http) {}

  //Search the movie, tv show and person collections with a single query. 
  //Each item returned in the result array has a media_type field that maps to either movie, tv or person.
  //http://api.themoviedb.org/3/search/multi
  multiSearch(query) {
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {

      var url = this.baseUrl + 'search/multi?api_key=' + this.apiKey + '&query=' + query.value;
      console.log('multi search name url: ', url);
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  getMultiSearch(query) {
    return this.multiSearch(query);
  }
}

