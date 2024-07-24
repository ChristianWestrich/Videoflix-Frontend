import { Component, ElementRef, inject, Input, ViewChild } from "@angular/core";
import videojs from "video.js";
import { ActivatedRoute, Router } from "@angular/router";
import { Movie } from "../interfaces/movie";
import { MovieService } from "../services/movie.service";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-movie-player",
  templateUrl: "./movie-player.component.html",
  styleUrls: ["./movie-player.component.scss"],
  standalone: true,
})
export class MoviePlayerComponent {
  movieId!: number | null;
  @ViewChild("videoPlayerElement", { static: true })
  videoPlayerElement!: ElementRef;
  videoPlayer = videojs.players;
  authService = inject(AuthService);
  currentMovie?: Movie;

  private url = "http://localhost:8000/media/";

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.movieId = this.getMovieIdFromRoute();
    this.currentMovie = this.getMovieFromMemory();

    if (!this.currentMovie) {
      this.getMovieFromAPI();
    }
    setTimeout(() => {
      this.initVideoPlayer();
    }, 500);
  }

  ngOnDestroy() {
    if (this.videoPlayer && typeof this.videoPlayer.dispose === "function") {
      this.videoPlayer.dispose();
    }
  }

  getMovieIdFromRoute(): number | null {
    let id = this.route.snapshot.paramMap.get("id");
    if (id == null) {
      console.error("id not found");
      return null;
    } else {
      return +id;
    }
  }

  getMovieFromMemory(): Movie | undefined {
    return this.movieService.allMovies.find(
      (movie) => movie.id === this.movieId,
    );
  }

  getMovieFromAPI() {
    if (this.movieId) {
      this.movieService.loadSingleMovie(this.movieId).subscribe(
        (movie) => {
          this.currentMovie = movie;
        },
        (error) => {
          console.error("Error occurred while fetching the movie: ", error);
        },
      );
    }
  }

  initVideoPlayer() {
    if (!this.currentMovie) {
      return;
    }

    const playerOptions = {
      controls: true,
      autoplay: false,
      preload: "auto",
      sources: [{ src: this.currentMovie.video_file, type: "video/mp4" }],
    };

    this.videoPlayer = videojs(
      this.videoPlayerElement.nativeElement,
      playerOptions,
    );
  }

  goBack() {
    if (this.authService.isActivated()) {
      this.router.navigateByUrl("home");
    } else {
      // Handle case when user is not logged in.
      console.log("User is not logged in.");
    }
  }

  switchResolution(event: Event) {
    const target = event.target as HTMLSelectElement;
    const resolution = target?.value;
    const newSource: string = this.findResolution(resolution);
    this.videoPlayer.src({ src: newSource, type: "video/mp4" });
    this.videoPlayer.load();
    this.videoPlayer.play();
  }

  findResolution(resolution: string): string {
    if (!this.currentMovie) {
      console.error("Movie not found");
      return "";
    }

    let resolutionUrl: string = this.currentMovie.video_480p;

    switch (resolution) {
      case "Orig":
        resolutionUrl = this.currentMovie.video_file;
            break
      case "480p":
        resolutionUrl = this.url + this.currentMovie.video_480p;
        break;
      case "720p":
        resolutionUrl = this.url +  this.currentMovie.video_720p;
        break;
      case "1080p":
        resolutionUrl =this.url + this.currentMovie.video_1080p;
        break;
    }
    return resolutionUrl;
  }
}
