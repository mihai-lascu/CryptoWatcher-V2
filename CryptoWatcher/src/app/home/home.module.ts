import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HomeRoutingModule} from "./home-routing.module";
import {HomeComponent} from "./home.component";
import {CryptoModule} from "../crypto/crypto.module";

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    HomeRoutingModule,
    CryptoModule
  ],
  providers: []
})
export class HomeModule {
}
