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
      <ng-container *ngIf="characters$ | async as characters">
        <p *ngIf="characters.status === 'loading'">Loading...</p>
        <p *ngIf="characters.status === 'error'">Error :(</p>
        <ng-container *ngIf="characters.status === 'success'">
          <article *ngFor="let person of characters.data">
            {{ person.name }} - {{ person.gender }}: {{ person.species }}
          </article>
        </ng-container>
      </ng-container>
      <custom-dialog [event]="reload"></custom-dialog>
      <custom-dialog [event]="reload"></custom-dialog>
      <custom-dialog [event]="reload"></custom-dialog>
      <custom-dialog [event]="reload"></custom-dialog>
    </div>
  `,
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  query = injectQuery();
  queryClient = injectQueryClient();
  queryService = inject(QueryService);
  reload = new EventEmitter();

  showDialog = false;
  characters$: Observable<any>;

  ngOnInit() {
    this.characters$ = this.queryService.character$("joehoe").pipe(take(1));
  }

  invalidate() {
    this.queryService.invalidateQueries("joehoe");
    this.reload.emit();
  }
}
