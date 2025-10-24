import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHoverAnimate]',
})
export class HoverAnimateDirective {
  @HostBinding('style.transition') transition = 'transform 150ms ease, box-shadow 150ms ease';
  @HostBinding('style.transform') transform = 'translateZ(0)'; // GPU kick
  @HostBinding('style.boxShadow') shadow = '';

  @HostListener('mouseenter') onEnter() {
    this.transform = 'scale(1.04)';
    this.shadow = '0 2px 10px rgba(0,0,0,0.12)';
  }
  @HostListener('mouseleave') onLeave() {
    this.transform = 'scale(1)';
    this.shadow = '';
  }
}
