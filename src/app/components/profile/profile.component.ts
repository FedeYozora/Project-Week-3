import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  constructor(private userSrv: UserService) {}

  ngOnInit(): void {
    this.currentUser = this.userSrv.getUserFromLocalStorage();
    console.log(this.currentUser);
  }
}
