import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  admin!: User | null;
  bannedUser: any = [];
  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.checkUser();
    let utente = localStorage.getItem('user');
    if (utente) {
      let isUser = JSON.parse(utente);
      if (isUser.user.role === 'admin') {
        this.admin = isUser;
      }
    }
  }

  registra(form: NgForm) {
    if (this.bannedUser.includes(form.value.email)) {
      const audio = new Audio();
      audio.src = '../../../assets/Stop.mp3';
      setTimeout(() => {
        audio.play();
      });
      // alert('Stop, questa mail é bandita');
      return;
    }
    if (!this.admin) {
      form.value.role = 'user';
      try {
        this.authSrv.register(form.value).subscribe();
        this.router.navigate(['/login']);
      } catch (error: any) {
        console.log(error);
        if (error.status === 400) {
          alert('Email già registrata!');
          this.router.navigate(['/register']);
        }
      }
    } else {
      try {
        this.authSrv.register(form.value).subscribe();
        this.router.navigate(['/login']);
      } catch (error: any) {
        console.log(error);
        if (error.status === 400) {
          alert('Email già registrata!');
          this.router.navigate(['/register']);
        }
      }
    }
  }

  checkUser() {
    this.authSrv.checkEmail().subscribe((data) => {
      this.bannedUser = data.map((user) => user.email);
    });
  }
}
