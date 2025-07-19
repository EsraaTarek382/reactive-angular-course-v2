import { Injectable } from "@angular/core";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map, shareReplay, tap } from "rxjs/operators";
import { MessagesService } from "../messages/messages.service";
import { LoadingService } from "../loading/loading.service";
import { HttpClient } from "@angular/common/http";


@Injectable({
    providedIn: 'root' //global singleton service(1 instance for the entire app)
})
 
export class CoursesStore {

    private subject = new BehaviorSubject<Course[]>([]); //holds the courses data
   courses$: Observable<Course[]> = this.subject.asObservable(); // any part of the app can subscribe to this observable to get the courses


   constructor(private http: HttpClient,
    private loadingService: LoadingService,
    private messagesService: MessagesService
   ) {
       this.loadAllCourses();

   }

   saveCourse(courseId:string,changes: Partial<Course>): Observable<any> {

    const courses=this.subject.getValue();
    const index = courses.findIndex(course => course.id === courseId);

    const newCourse:Course = {
        ...courses[index],
        ...changes
    }; //new version of the course object with the changes applied

    const newCourses = courses.slice(0);
    newCourses[index] = newCourse; //replace the old course with the new one in the array
    this.subject.next(newCourses); //update the BehaviorSubject with the new courses array
    return this.http.put(`/api/courses/${courseId}`, changes).pipe(
        catchError(err => {
            const errorMessage = 'Could not save course. Please try again later.';
            this.messagesService.showErrors(errorMessage);
            console.error(errorMessage, err);
            return throwError(err);
        }),
        shareReplay()
    );
   }




   filterByCategory(category: string): Observable<Course[]> {
    return this.courses$.pipe(
        map(courses => 
            courses.filter(course => course.category === category)
            .sort(sortCoursesBySeqNo))
    );

}
loadAllCourses(){
const loadCourses$ = this.http.get<Course[]>('/api/courses').pipe(
    map(response=> response['payload']),
    catchError(err => {
        const errorMessage = 'Could not load courses. Please try again later.';
        this.messagesService.showErrors(errorMessage);
        console.error(errorMessage, err);
        return throwError(err);
    }
),tap(courses => this.subject.next(courses)) //push the courses to the subject
)

this.loadingService.showLoadingUntilComplete(loadCourses$)
.subscribe()
}



}