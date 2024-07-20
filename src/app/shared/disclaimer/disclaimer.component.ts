import { Component } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  selector: "app-disclaimer",
  standalone: true,
  imports: [],
  templateUrl: "./disclaimer.component.html",
  styleUrl: "./disclaimer.component.scss",
})
export class DisclaimerComponent {
  constructor(private location: Location) {}
  goBack() {
    this.location.back();
  }
}
