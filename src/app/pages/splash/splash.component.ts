import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  standalone: true,
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.scss'
})
export class SplashComponent implements OnInit {

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/create-game']);
    }, 2500);
  }
}
