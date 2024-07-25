import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Movie } from "../interfaces/movie";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MovieService {
  private url = "http://localhost:8000/movies/";
  categories = ["New", "Documentary", "Drama", "Romance"];
  selectedMovieSig$ = signal(new Movie({}));
  selectedMovieIdSig$ = signal(0);
  allMovies: Movie[] = [];
  movieSub;
  currentMovie?: Movie;

  constructor(private http: HttpClient) {
    this.movieSub = this.loadAllMovies().subscribe((data: Movie[]) => {
      this.allMovies = data;
      this.currentMovie = new Movie(data[0]);
      this.selectedMovieIdSig$.set(this.allMovies[0].id);
    });
  }

  filterMoviesByCategory(category: string): Movie[] {
    return this.allMovies.filter(
      (movie: Movie) => movie.categories && movie.categories.includes(category),
    );
  }

  getThumbnailUrl(thumbnailPath: string): string {
    if (!thumbnailPath) {
      return "http://via.placeholder.com/150";
    }
    return thumbnailPath;
  }

  loadAllMovies(): Observable<Movie[]> {
    let httpHeaders = new HttpHeaders({
      Authorization: "Token " + localStorage.getItem("token"),
    });
    return this.http.get<Movie[]>(this.url, { headers: httpHeaders });
  }

  loadSingleMovie(id: number): Observable<Movie> {
    let httpHeaders = new HttpHeaders({
      Authorization: "Token " + localStorage.getItem("token"),
    });
    return this.http.get<Movie>(`${this.url}${id}/`, { headers: httpHeaders });
  }
}
