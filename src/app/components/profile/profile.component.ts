import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  currentUser: { nome: string; cognome: string; email: string } | null = null;
  constructor(private userSrv: UserService) {}

  ngOnInit(): void {
    this.currentUser = this.userSrv.getCurrentUser();
  }
}
