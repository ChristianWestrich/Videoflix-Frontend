import { HttpClient } from '@angular/common/http';
import {Injectable, signal} from '@angular/core';
import {Movie} from "../interfaces/movie";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private url = 'http://localhost:8000/home/movies/';

  selectedMovieSig$ = signal({
    title: "Breakout",
    movieUrl: "/assets/-3cae-4a03-9fec-35b85b56c003.mp4",
    description: "In a high-security prison, a wrongly convicted man\n" +
        "            formulates a meticulous plan to break out an prove his\n" +
        "            innocence. He must navigate a weg of alliances and betrayals to reclaim his freedom and expose the truth",
    id: 8,
    thumbnail: "/assets/img/Frame172.png",
    releaseDate: new Date(),
    category: ["drama"]
  })
  selectedMovieIdSig$ = signal(3)
    allMovies$: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([])

  constructor(private http: HttpClient) {
    this.allMovies$.next(this.movies)
  }


  getThumbnailUrl(thumbnailPath: string): string {
    if (!thumbnailPath) {
      return 'http://via.placeholder.com/150';
    }
    return thumbnailPath;
  }

  loadAllMovies() {
    return this.http.get(this.url);
  }

  loadSingleMovie(id: number) {
    return this.http.get(`${this.url}${id}/`);
  }

  movies = [
    {
      title: "Baby´s secret Language",
      movieUrl: "/assets/boat.mp4",
      description: "A documentation how babys communicate.",
      id: 1,
      thumbnail: "/assets/img/Frame164.png",
      releaseDate: new Date(),
      category: ["new", "documentary"],
    },
    {
      title: "Der Herr der Ringe 2",
      movieUrl: "test",
      description: "Ein Fantasie-Film von J.R.Tolkien",
      id: 2,
      thumbnail: "/assets/img/Frame165.png",
      releaseDate: new Date(),
      category: ["new", "drama"]
    },
    {
      title: "Der Herr der Ringe 3",
      movieUrl: "test",
      description: "Ein Fantasie-Film von J.R.Tolkien",
      id: 3,
      thumbnail: "/assets/img/Frame167.png",
      releaseDate: new Date(),
      category: ["new", "documentary"]
    },
    {
      title: "Der Herr der Ringe 3",
      movieUrl: "test",
      description: "Ein Fantasie-Film von J.R.Tolkien",
      id: 4,
      thumbnail: "/assets/img/Frame168.png",
      releaseDate: new Date(),
      category: ["new", "drama"]
    },
    {
      title: "Der Herr der Ringe 3",
      movieUrl: "test",
      description: "Ein Fantasie-Film von J.R.Tolkien",
      id: 5,
      thumbnail: "/assets/img/Frame169.png",
      releaseDate: new Date(),
      category: ["new", "documentary"]
    },
    {
      title: "Der Herr der Ringe 3",
      movieUrl: "test",
      description: "Ein Fantasie-Film von J.R.Tolkien",
      id: 6,
      thumbnail: "/assets/img/Frame170.png",
      releaseDate: new Date(),
      category: ["new", "drama"]
    },
    {
      title: "Der Herr der Ringe 3",
      movieUrl: "test",
      description: "Ein Fantasie-Film von J.R.Tolkien",
      id: 7,
      thumbnail: "/assets/img/Frame171.png",
      releaseDate: new Date(),
      category: ["drama"]
    },
    {
      title: "Breakout",
      movieUrl: "/assets/-3cae-4a03-9fec-35b85b56c003.mp4",
      description: "In a high-security prison, a wrongly convicted man\n" +
          "            formulates a meticulous plan to break out an prove his\n" +
          "            innocence. He must navigate a weg of alliances and betrayals to reclaim his freedom and expose the truth",
      id: 8,
      thumbnail: "/assets/img/Frame172.png",
      releaseDate: new Date(),
      category: ["drama"]
    },
    {
      title: "Der Herr der Ringe 3",
      movieUrl: "test",
      description: "Ein Fantasie-Film von J.R.Tolkien",
      id:9,
      thumbnail: "/assets/img/Frame173.png",
      releaseDate: new Date(),
      category: ["romance"]
    },
    {
      title: "Der Herr der Ringe 3",
      movieUrl: "test",
      description: "Ein Fantasie-Film von J.R.Tolkien",
      id: 10,
      thumbnail: "/assets/img/Frame174.png",
      releaseDate: new Date(),
      category: ["romance"]
    },
  ];
}



