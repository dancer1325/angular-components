import { Component } from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  imports: [MatSlideToggleModule],    // Import it  -- to use -- Material slide toggle component
  template: `<mat-slide-toggle>Toggle me!</mat-slide-toggle>`,
  standalone: true,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'gettingStarted';
}
