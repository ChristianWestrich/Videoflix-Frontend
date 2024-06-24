import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private url = 'http://localhost:8000/home/movies/';
  
  constructor(private http: HttpClient) {}

  loadAllMovies() {
    return this.http.get(this.url);
  }

  loadSingleMovie(id: number) {
    return this.http.get(`${this.url}${id}/`);
  }
}

