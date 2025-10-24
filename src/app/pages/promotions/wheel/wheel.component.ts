import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-wheel',
  imports: [ReactiveFormsModule, MatIcon],
  templateUrl: './wheel.component.html',
  styleUrl: './wheel.component.scss'
})
export class WheelComponent {
  sectorCtrl = new FormControl<number | null>(null, {
    validators: [Validators.required, Validators.min(1), Validators.max(10)]
  });

  rotation = signal(0);
  spinning = signal(false);

  readonly per = 36;
  readonly offset = 18;
  readonly labels = Array.from({ length: 10 }, (_, i) => i + 1);

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value === '' ? null : input.valueAsNumber;
    this.sectorCtrl.setValue(value);
  }

  spin() {
    const v = this.sectorCtrl.value;

    if (this.sectorCtrl.invalid || v == null) {
      this.sectorCtrl.markAsTouched();
      this.sectorCtrl.markAsDirty();
      return;
    }

    this.spinning.set(true);

    const current = ((this.rotation() % 360) + 360) % 360;
    const theta = (v - 1) * this.per + this.offset;
    const delta = (360 - theta - current + 360) % 360;
    const next = this.rotation() + 360 * 6 + delta;

    this.rotation.set(next);

    setTimeout(() => this.spinning.set(false), 2600);
  }

  reset() {
    this.rotation.set(0);
    this.sectorCtrl.reset(null);
  }

  angleFor(i: number): number {
    return i * this.per + this.offset;
  }
}
