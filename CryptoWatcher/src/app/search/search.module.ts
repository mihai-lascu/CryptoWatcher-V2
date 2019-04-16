import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {CryptoModule} from "../crypto/crypto.module";
import {SearchComponent} from "./search.component";
import {SearchRoutingModule} from "./search-routing.module";
import {CommonsModule} from "../commons/commons.module";

@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SearchRoutingModule,
    CryptoModule,
    CommonsModule
  ],
  providers: []
})
export class SearchModule {
}
