import {Component, Inject} from '@angular/core';
import {INavigationService, NAVIGATION_SERVICE} from "./commons/navigation.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(@Inject(NAVIGATION_SERVICE) private navigationService: INavigationService) {
  }

  goToHome() {
    return this.navigationService.goHome();
  }

  // getToken() {
  //   this.userService.getToken('user@yolomail.com', 'parola12345').subscribe(data => this.token = data.token);
  // }
  //
  // getUser() {
  //   this.userService.getUser(this.token).subscribe(user => {
  //     this.user.name = user.name;
  //     this.user.email = user.email;
  //     console.log(this.user);
  //   });
  // }
  //
  // createUser() {
  //   this.userService.createUser('user3@yolomail.com', 'parola12345', 'Mihai').subscribe();
  // }
  //
  // getCoins() {
  //   this.cryptoService.getCoins(this.token).subscribe(data => {
  //     this.portfolio.name = 'My portfolio';
  //     data.forEach(current => this.portfolio.coins.push(current));
  //     console.log(this.portfolio);
  //   });
  // }
  //
  // addCoin() {
  //   this.cryptoService.addCoin(this.token, 'ada', 10000, 2000).subscribe();
  // }
}

