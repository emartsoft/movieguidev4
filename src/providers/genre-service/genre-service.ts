import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the GenreService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GenreService {
  data: any = null;
  public apiKey: string = '7e06a4fd0118214660a718df4a73c51c';
  public baseUrl: string = 'http://api.themoviedb.org/3/';

  constructor(public http: Http) { }

  //Get the list of movie genres: http://api.themoviedb.org/3/genre/movie/list
  listMovieGenres() {
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      var url = this.baseUrl + 'genre/movie/list?api_key=' + this.apiKey;
      console.log('genre url', url);
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  getListMovieGenres() {
    return this.listMovieGenres();
  }

  //Get the list of movies for a particular genre by id. By default, only movies with 10 or more votes are included: 
  //http://api.themoviedb.org/3/genre/id/movies
  listMovieGenresByID(genreID, pageNo) {
    this.data=null;
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      var url = this.baseUrl + 'genre/'+ genreID +'/movies?api_key=' + this.apiKey + '&page=' + pageNo;
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  getListMovieGenresByID(genreID, pageNo) {
    return this.listMovieGenresByID(genreID, pageNo);
  }
}

