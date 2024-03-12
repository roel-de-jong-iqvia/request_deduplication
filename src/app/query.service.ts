import { inject, Injectable } from "@angular/core";
import {
  filterSuccessResult,
  injectQuery,
  injectQueryClient,
  queryOptions,
} from "@ngneat/query";

import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";

const API_URL = "https://rickandmortyapi.com/api/character";

@Injectable({ providedIn: "root" })
export class QueryService {
  http = inject(HttpClient);
  queryClient = injectQueryClient();
  useQuery = injectQuery();

  queryOptions(projectId: string) {
    return queryOptions({
      queryKey: ["characters", projectId] as const,
      staleTime: Infinity,
      queryFn: () =>
        this.http.get(API_URL).pipe(map((data: any) => data.results)),
    });
  }

  character$(projectId: string) {
    return this.useQuery(this.queryOptions(projectId)).result$.pipe(
      filterSuccessResult()
    );
  }

  invalidateQueries(projectId: string) {
    const queryOptions = this.queryOptions(projectId);
    this.queryClient.invalidateQueries(queryOptions);
  }
}
