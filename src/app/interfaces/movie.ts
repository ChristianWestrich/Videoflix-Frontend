export class Movie {
  title: string;
  video_file: string;
  description: string;
  id: number;
  thumbnail: string;
  releaseDate: Date;
  categories: string[];
  video_480p: string;
  video_720p: string;
  video_1080p: string;

  constructor(obj: any) {
    this.title = obj.title ? obj.title : "";
    this.video_file = obj.video_file ? obj.video_file : "";
    this.description = obj.description ? obj.description : "";
    this.id = obj.id ? obj.id : -1;
    this.thumbnail = obj.thumbnail ? obj.thumbnail : "";
    this.releaseDate = new Date(obj.releaseDate);
    this.categories = obj.categories ? obj.categories : [];
    this.video_480p = obj.video_480p ? obj.video_480p : "";
    this.video_720p = obj.video_720p ? obj.video_720p : "";
    this.video_1080p = obj.video_1080p ? obj.video_1080p : "";
  }

  toJSON(obj: any): any {
    this.title = obj.title;
    this.video_file = obj.video_file;
    this.description = obj.description;
    this.id = obj.id;
    this.thumbnail = obj.thumbnail;
    this.releaseDate = obj.releaseDate;
    this.categories = obj.categories;
    this.video_480p = obj.video_480p;
    this.video_720p = obj.video_720p;
    this.video_1080p = obj.video_1080p;
  }
}
