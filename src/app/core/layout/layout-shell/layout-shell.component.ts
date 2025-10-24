import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-layout-shell',
  imports: [HeaderComponent, SidenavComponent, RouterOutlet],
  templateUrl: './layout-shell.component.html',
  styleUrl: './layout-shell.component.scss'
})
export class LayoutShellComponent {
  constructor(public layout: LayoutService) {}
}
