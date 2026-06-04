import { Component, inject, output } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public readonly authService = inject(AuthService);

  readonly loginClick = output<void>();
  readonly adminNavClick = output<void>();

  onLoginClick(): void {
    this.loginClick.emit();
  }

  onAdminNavClick(): void {
    this.adminNavClick.emit();
  }

  logout(): void {
    this.authService.logout();
  }
}
