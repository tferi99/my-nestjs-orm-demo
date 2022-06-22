import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ErrorTestInputService } from './error-test-input.service';

@Component({
  selector: 'app-error-test-input',
  templateUrl: './error-test-input.component.html',
  styleUrls: ['./error-test-input.component.scss']
})
export class ErrorTestInputComponent {
  title = 'RxJSErrorHandlingDemo';
  searchTerm$ = new Subject<KeyboardEvent>();
  searchTermError$ = new Subject<KeyboardEvent>();
  resultsError: any;
  results: any;
  constructor(
    private errorTestInputService: ErrorTestInputService,
  ) {}

  ngOnInit(): void {
    this.errorTestInputService
      .searchBadCatch(this.searchTermError$)
      .pipe(finalize(() => console.log("searchTermError$ (bad catch) finalize called!")))
      .subscribe(results => {
        console.log("Got results from search (bad catch)");
        this.resultsError = results.results;
      });

    this.errorTestInputService
      .search(this.searchTerm$)
      .pipe(finalize(() => console.log("searchTerm$ finalize called!")))
      .subscribe(results => {
        console.log("Got results from search (good catch)");
        this.results = results.results;
      });
  }

  cica($event: KeyboardEvent) {

  }
}

