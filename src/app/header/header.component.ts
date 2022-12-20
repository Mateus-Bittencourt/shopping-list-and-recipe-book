import { Component,  OnDestroy,  OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { dataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private userSub: Subscription;


  collapsed = true;

  constructor(private dataStorageService: dataStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    })
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
