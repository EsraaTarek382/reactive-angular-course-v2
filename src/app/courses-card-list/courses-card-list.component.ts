import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Course } from '../model/course';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { filter, tap } from 'rxjs/operators';

//presentational component 

//how data s displayed
@Component({

    selector: 'courses-card-list',
    templateUrl: './courses-card-list.component.html',
    styleUrls: ['./courses-card-list.component.css'],
    standalone: false
})

export class CoursesCardListComponent implements OnInit {

    @Input()
    courses: Course[]=[] ; // Assuming Course is defined elsewhere


    @Output()
    coursesChanged = new EventEmitter<any>(); //emits an event when value changes
    
    constructor(private dialog:MatDialog) { }
    
    ngOnInit():void {
        // Initialization logic can go here
    }

      editCourse(course: Course) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

    dialogRef.afterClosed().pipe(
      filter(val => !!val),
      tap(() => this.coursesChanged.emit())
    ).subscribe();

  }
    
    // Additional methods for the component can be added here
}
