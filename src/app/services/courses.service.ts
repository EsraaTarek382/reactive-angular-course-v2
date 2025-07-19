import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../model/course';
import { filter, map, shareReplay } from 'rxjs/operators';
import { Lesson } from '../model/lesson';
//Advantages: Can be reused in other components.
@Injectable({ providedIn: 'root' })
export class CoursesService {

constructor(private http:HttpClient) { }

loadCourses(): Observable<Course[]> {
  return this.http.get<Course[]>('/api/courses').pipe(
    map(res=> res['payload']),
    shareReplay() 
  );
}

saveCourse(courseId:string,changes:Partial<Course>):Observable<any>{
  console.log('CoursesService.saveCourse called with:', courseId, changes);
  return this.http.put(`/api/courses/${courseId}`,changes).pipe(
    shareReplay()
  )
}

searchLessons(search: string): Observable<Lesson[]> {
  return this.http.get<Lesson[]>(`api/lessons`,{
    params:{
      filter: search,
      pageSize: '100'
    }
  }).pipe(
    map(res => res['payload']),
    shareReplay()
  )
}

}
