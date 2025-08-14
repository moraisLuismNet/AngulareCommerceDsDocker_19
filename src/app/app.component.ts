import { Component, OnInit, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';

@Component({
    selector: 'app-root',
    imports: [
        CommonModule,
        RouterModule,
        NavbarComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'AngulareCommerceDs';

  constructor() {
    // One-time initialization after the first render
    afterNextRender(() => {
      // Any DOM-dependent initialization can go here
    });
  }

  ngOnInit(): void {
    // Component initialization logic
  }
}
