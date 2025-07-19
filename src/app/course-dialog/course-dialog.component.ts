import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import moment from 'moment';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import { CoursesService } from '../services/courses.service';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';
import { CoursesStore } from '../services/courses.store';



@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css'],
    standalone: false,
    providers: [LoadingService,
        MessagesService
    ] // Provide LoadingService at the component level (not availabe to indirect children)
})
export class CourseDialogComponent implements AfterViewInit {
  form: FormGroup;

    course:Course;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course:Course,
    private courseStore: CoursesStore,
private messagesService: MessagesService) {
// not removed because the error message is displayed locally
        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription,Validators.required]
        });

       
    }

    ngAfterViewInit() {
       
    }

    save() {
     const changes = this.form.value;

      this.courseStore.saveCourse(this.course.id, changes)
    .subscribe();

     this.dialogRef.close(changes);

      
    }

    close() {
        console.log('Close method called');
        this.dialogRef.close();
    }

}
