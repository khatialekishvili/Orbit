import { Component, computed, signal } from '@angular/core';

type WeekType = 'I' | 'II' | 'III' | 'IV';

interface LeaderboardItem {
  customerId: number;
  loginName: string;
  place: number;
  week: WeekType;
}

@Component({
  selector: 'app-leaderboard',
  imports: [],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss'
})
export class LeaderboardComponent {
  weeks: (WeekType | 'ALL')[] = ['I', 'II', 'III', 'IV', 'ALL'];
  active = signal<WeekType | 'ALL'>('ALL');
  data = signal<LeaderboardItem[]>(this.generateData());

  filtered = computed(() =>
    this.active() === 'ALL' ? this.data() : this.data().filter(d => d.week === this.active())
  );

  setActive(w: WeekType | 'ALL') { this.active.set(w); }

  private generateData(): LeaderboardItem[] {
    const result: LeaderboardItem[] = [];
    const weeks: WeekType[] = ['I','II','III','IV'];
    let place = 1;
    for (const w of weeks) {
      for (let i = 0; i < 12; i++) {
        result.push({
          customerId: Math.floor(Math.random() * 1_000_000),
          loginName: `user_${w}_${i}`,
          place: place++,
          week: w
        });
      }
    }
    return result;
  }
}
