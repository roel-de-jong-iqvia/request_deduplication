import { enableProdMode } from "@angular/core";
import { platformBrowser } from "@angular/platform-browser";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";
import 'zone.js';

if (environment.production) {
  enableProdMode();
}

platformBrowser()
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));
