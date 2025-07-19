import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll, shareReplay
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat} from 'rxjs';
import {Lesson} from '../model/lesson';
import {CoursesService} from '../services/courses.service';


@Component({
    selector: 'course',
    templateUrl: './search-lessons.component.html',
    styleUrls: ['./search-lessons.component.css'],
    standalone: false
})
export class SearchLessonsComponent implements OnInit {


  searchresults$: Observable<Lesson[]>;

  activeLesson: Lesson;

  constructor(private courseService: CoursesService) {


  }

  ngOnInit() {


  }

  onSearch(searchTerm: string) {

this.searchresults$ = this.courseService.searchLessons(searchTerm)

  }

  openLesson(lesson: Lesson) {
    this.activeLesson = lesson;
  }

  onBack() {
    this.activeLesson = null;
  }

}










