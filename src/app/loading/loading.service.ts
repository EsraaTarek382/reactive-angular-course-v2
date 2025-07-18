import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { concatMap, finalize, tap } from "rxjs/operators";



@Injectable({ providedIn: 'root' })
export class LoadingService {

//subject can define when an observable emit a value
//BehaviorSubject is a special type of subject that can remember the last value emitted/ or initial value
private loadingSubject = new BehaviorSubject<boolean>(false);

loading$: Observable<boolean>=this.loadingSubject.asObservable();

//track lifecycle of input observable and output has the capablity to turn loading on and off at apropriate moments
showLoadingUntilComplete<T>(obs$: Observable<T>): Observable<T> {

  return of(null).pipe(
    tap(() => this.loadingOn()), // Turn on loading when observable starts
    concatMap(() => obs$), // Wait for the input observable to complete
    finalize(() => this.loadingOff()) // Turn off loading when observable completes
    
  );

}
//turn on when observable is initailized
loadingOn(){
this.loadingSubject.next(true);
}

//turn off when observable completes or errors out
loadingOff(){
this.loadingSubject.next(false);
}

}