import { Component, EventEmitter, inject, Input, OnInit } from "@angular/core";
import { Observable, switchMap, take } from "rxjs";
import { QueryService } from "./query.service";

@Component({
  selector: "custom-dialog",
  template: `
    <ng-container *ngIf="characters$ | async as characters">
      <p *ngIf="characters.status === 'loading'">Loading...</p>
      <p *ngIf="characters.status === 'error'">Error :(</p>
      <ng-container *ngIf="characters.status === 'success'">
        <article *ngFor="let person of characters.data">
          {{ person.name }} - {{ person.gender }}: {{ person.species }}
        </article>
      </ng-container>
    </ng-container>
  `,
})
export class DialogComponent implements OnInit {
  queryService = inject(QueryService);

  @Input() event = new EventEmitter();

  characters$ = new Observable<any>();

  ngOnInit() {
    this.characters$ = this.event.pipe(
      switchMap(() => this.queryService.character$("joehoe").pipe(take(1)))
    );
  }
}
