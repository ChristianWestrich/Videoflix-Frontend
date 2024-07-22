import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import videojs from "video.js";
import { ActivatedRoute, Router } from "@angular/router";
import { Movie } from "../interfaces/movie";
import { MovieService } from "../services/movie.service";

@Component({
  selector: "app-movie-player",
  standalone: true,
  imports: [],
  templateUrl: "./movie-player.component.html",
  styleUrl: "./movie-player.component.scss",
})
export class MoviePlayerComponent {
  movieId: string | null = "";
  @ViewChild("videoPlayerElement", { static: true })
  videoPlayerElement!: ElementRef;
  videoPlayer = videojs.players;

  currentMovie?: Movie;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get("id");
    this.currentMovie = this.movieService.allMovies.find(
      (movie) => movie.id.toString() === this.movieId,
    );
    this.videoPlayer = videojs(this.videoPlayerElement.nativeElement, {
      controls: true,
      autoplay: false,
      preload: "auto",
      sources: [{ src: this.currentMovie?.video_file, type: "video/mp4" }],
    });
  }

  ngOnDestroy(): void {
    if (this.videoPlayer) {
      this.videoPlayer.dispose();
    }
  }

  goBack() {
    this.router.navigateByUrl("home");
  }

  switchResolution(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const resolution = target?.value;
    const newSource: string = this.findResolution(resolution);
    this.videoPlayer.src({ src: newSource, type: "video/mp4" });
    this.videoPlayer.load();
    this.videoPlayer.play();
  }

  findResolution(resolution: string): string {
    let resolutionUrl: string = this.currentMovie!.video_480p;
    switch (resolution) {
      case "480p":
        resolutionUrl = this.currentMovie!.video_480p;
        break;
      case "720p":
        resolutionUrl = this.currentMovie!.video_720p;
        break;
      case "1080p":
        resolutionUrl = this.currentMovie!.video_1080p;
        break;
    }
    return resolutionUrl;
  }
}
