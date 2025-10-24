import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LeaderboardComponent } from "../leaderboard/leaderboard.component";
import { WheelComponent } from "../wheel/wheel.component";

@Component({
  selector: 'app-promotions-page',
  imports: [MatIconModule, MatButtonModule, LeaderboardComponent, WheelComponent],
  templateUrl: './promotions-page.component.html',
  styleUrl: './promotions-page.component.scss',
})
export class PromotionsPageComponent {
  private router = inject(Router);

  goBack() {
    this.router.navigate(['/users']);
  }
}
