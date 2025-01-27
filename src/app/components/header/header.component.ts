import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true
})
export class HeaderComponent {

  constructor(private router: Router){}
  onLogout(){
    localStorage.removeItem('authToken');
    this.router.navigate(['login']);
  }
}
