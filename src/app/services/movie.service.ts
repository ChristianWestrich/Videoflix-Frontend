import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Movie } from "../interfaces/movie";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MovieService {
  private url = "http://localhost:8000/movies/";
  categories = ["New", "Documentary", "Drama", "Romance"];
  selectedMovieSig$: any;
  selectedMovieIdSig$ = signal(0);
  allMovies: Movie[] = [];
  movieSub;
  currentMovie!: Movie;

  constructor(private http: HttpClient) {
    this.movieSub = this.loadAllMovies().subscribe((data: Movie[]) => {
      this.allMovies = data;
      this.currentMovie = new Movie(data[0]);
    });
  }

  filterMoviesByCategory(category: string) {
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

  loadSingleMovie(id: number) {
    return this.http.get<Movie>(`${this.url}${id}/`);
  }

  ngOnDestroy() {
    this.movieSub.unsubscribe();
  }
}
