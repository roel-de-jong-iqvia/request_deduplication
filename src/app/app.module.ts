import { BrowserModule } from "@angular/platform-browser";
import { inject, NgModule, ENVIRONMENT_INITIALIZER } from "@angular/core";

import { AppComponent } from "./app.component";
import { DialogComponent } from "./dialog.component";
import { QueryService } from "./query.service";
import { HttpClientModule } from "@angular/common/http";
import { provideQueryDevTools } from "@ngneat/query-devtools";

@NgModule({
  declarations: [AppComponent, DialogComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    QueryService,
    provideQueryDevTools({ buttonPosition: "bottom-right" }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
