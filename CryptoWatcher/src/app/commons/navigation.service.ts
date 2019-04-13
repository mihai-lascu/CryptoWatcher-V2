import {Injectable, InjectionToken, Provider} from '@angular/core';
import {Router} from "@angular/router";

export interface INavigationService {
  goHome(): Promise<boolean>;
}

@Injectable()
export class NavigationService implements INavigationService {

  constructor(private router: Router) {
  }

  goHome(): Promise<boolean> {
    return this.router.navigate(['home']);
  }
}

export const NAVIGATION_SERVICE: InjectionToken<INavigationService> = new InjectionToken('NAVIGATION_SERVICE');

export const NavigationServiceProvider: Provider = {
  provide: NAVIGATION_SERVICE,
  useClass: NavigationService
};
