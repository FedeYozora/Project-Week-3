import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  userForm!: NgForm;
  user: User = {
    id: 0,
    nome: '',
    cognome: '',
    city: '',
    genre: '',
    email: '',
    password: '',
    role: '',
  };
  id!: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userSrv: UserService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);
    this.loadUserData();
  }

  private loadUserData() {
    this.userSrv.getUser(this.id).subscribe((utente) => {
      this.user = utente;
    });
  }

  onSubmit() {
    this.authService.updateUserInfo(this.user, this.id).subscribe(() => {
      this.router.navigate(['']);
    });
  }
  cancel(): void {
    this.router.navigate(['profile']);
  }
}
