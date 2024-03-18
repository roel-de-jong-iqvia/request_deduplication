import { Component, EventEmitter, inject, Input, OnInit } from "@angular/core";
import { map, Observable, switchMap, take } from "rxjs";
import { API_URL, QueryService } from "./query.service";
import { HttpClient } from "@angular/common/http";

/* 
  <p *ngIf="characters.status === 'loading'">Loading...</p>
      <p *ngIf="characters.status === 'error'">Error :(</p>
      <ng-container *ngIf="characters.status === 'success'">
*/

@Component({
  selector: "custom-dialog",
  template: `
        <article *ngFor="let person of characters$ | async as characters">
          {{ person.name }} - {{ person.gender }}: {{ person.species }}
        </article>
  `,
})
export class DialogComponent implements OnInit {
  queryService = inject(QueryService);
  http = inject(HttpClient);

  @Input() event = new EventEmitter();

  characters$ = new Observable<any>();

  ngOnInit() {
    this.characters$ = this.event.pipe(
      switchMap(() => this.queryService.character$("joehoe").pipe(take(1)))
    );
  }
}
