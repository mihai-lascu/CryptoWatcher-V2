import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UserServiceProvider} from "./user-rest.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [UserServiceProvider]
})
export class UserModule {
}
