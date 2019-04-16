import {Injectable, InjectionToken, Provider} from '@angular/core';
import {Router} from "@angular/router";

export interface INavigationService {
  goHome(): Promise<boolean>;

  goSearch(symbol: string): Promise<boolean>;

  getParam(activatedRoute, paramName: string): string;

  getQueryParam(activatedRoute, paramName: string): string;
}

@Injectable()
export class NavigationService implements INavigationService {

  constructor(private router: Router) {
  }

  goHome(): Promise<boolean> {
    return this.router.navigate(['home']);
  }

  goSearch(symbol: string): Promise<boolean> {
    return this.router.navigate(['search', symbol]);
  }

  getParam(activatedRoute, paramName: string): string {
    return activatedRoute.snapshot.params[paramName];
  }

  getQueryParam(activatedRoute, paramName: string): string {
    return activatedRoute.snapshot.queryParams[paramName];
  }
}

export const NAVIGATION_SERVICE: InjectionToken<INavigationService> = new InjectionToken('NAVIGATION_SERVICE');

export const NavigationServiceProvider: Provider = {
  provide: NAVIGATION_SERVICE,
  useClass: NavigationService
};
