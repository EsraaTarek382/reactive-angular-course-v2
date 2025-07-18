import {Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
import { CoursesService } from '../services/courses.service';
import { LoadingService } from '../loading/loading.service';
// Before the component was using http service to pull the component inside the view
//Now it only knows about the coursesService which is an abstraction of the http service


//After adding courses-card-list responsibility of this component is to pull the data from the service and pass it to the courses-card-list component

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;


  constructor(private courseService:CoursesService,
    private loadingService: LoadingService
  ) {

  }

  ngOnInit() {

    this.reloadCourses();

  }

reloadCourses(){

 // this.loadingService.loadingOn();

  //separte http request for each category because each subscribe to observable
//shareReplay to solve this issue
const courses$ = this.courseService.loadCourses().pipe(
map(courses => courses.sort(sortCoursesBySeqNo)),
finalize(() => {
  this.loadingService.loadingOff();
})
)
const loadCourses$=this.loadingService.showLoadingUntilComplete(courses$)

this.beginnerCourses$ = loadCourses$.pipe(
  map(courses => courses
    .filter(course => course.category === 'BEGINNER')
))

this.advancedCourses$ = loadCourses$.pipe(
  map(courses => courses
    .filter(course => course.category === 'ADVANCED')
))
}

}




