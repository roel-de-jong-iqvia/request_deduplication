import { Component, EventEmitter, inject, OnInit } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { injectQuery, injectQueryClient } from "@ngneat/query";
import { Observable, take, pipe } from "rxjs";
import { QueryService } from "./query.service";

@Component({
  selector: "app-root",
  template: `
    <div>
      <button (click)="invalidate()">Invalidate Query</button>
      <custom-dialog [event]="reload"></custom-dialog>
      <custom-dialog [event]="reload"></custom-dialog>
      <custom-dialog [event]="reload"></custom-dialog>
      <custom-dialog [event]="reload"></custom-dialog>
    </div>
  `,
})
export class AppComponent {
  queryClient = injectQueryClient();
  queryService = inject(QueryService);
  reload = new EventEmitter();

  invalidate() {
    this.queryService.invalidateQueries("joehoe");
    this.reload.emit();
  }
}
