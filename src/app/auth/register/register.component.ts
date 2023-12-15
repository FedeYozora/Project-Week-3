import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { BannedMail } from 'src/app/models/banned-mail';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  admin!: User | null;
  bannedUser: BannedMail[] = [];
  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {
    let utente = localStorage.getItem('user');
    if (utente) {
      let isUser = JSON.parse(utente);
      this.admin = isUser;
    }
  }

  registra(form: NgForm) {
    this.checkBannedEmail(form.value.email).subscribe((isBanned) => {
      if (isBanned) {
        alert('Fermo, la tua Email non é consentita!');
        this.router.navigate(['/register']);
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
    });
  }

  checkBannedEmail(email: BannedMail) {
    return this.authSrv.checkBannedEmail(email);
  }
}
