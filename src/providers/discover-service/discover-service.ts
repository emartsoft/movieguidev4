import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DiscoverService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DiscoverService {
  data: any = null;
  public apiKey: string = '7e06a4fd0118214660a718df4a73c51c';
  public baseUrl: string = 'http://api.themoviedb.org/3/';

  constructor(public http: Http) { }
  //http://api.themoviedb.org/3/discover/movie?api_key=7e06a4fd0118214660a718df4a73c51c&primary_release_year=2015&with_genres=12,16

  discoverMovies(year, genres, sortby, pageNo) {
    this.data = null;
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      var url = this.baseUrl + 'discover/movie?api_key=' + this.apiKey + '&year=' + year + '&with_genres=' + genres + '&sort_by=' + sortby + '&page=' + pageNo;
      console.log('discover movies url', url);
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  getDiscoverMovies(year, genres, sortby, pageNo) {
    return this.discoverMovies(year, genres, sortby, pageNo);
  }

  discoverTVShows(year, genres, sortby, pageNo) {
    this.data = null;
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      var url = this.baseUrl + 'discover/tv?api_key=' + this.apiKey + '&year=' + year + '&with_genres=' + genres + '&sort_by=' + sortby + '&page=' + pageNo;
      console.log('discover tv shows url', url);
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  getDiscoverTVShows(year, genres, sortby, pageNo) {
    return this.discoverTVShows(year, genres, sortby, pageNo);
  }

}

