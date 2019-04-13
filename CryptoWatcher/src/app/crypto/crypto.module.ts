import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CryptoServiceProvider} from "./crypto-rest.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [CryptoServiceProvider]
})
export class CryptoModule {
}
