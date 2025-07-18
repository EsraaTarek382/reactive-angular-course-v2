import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../model/course';
import { map, shareReplay } from 'rxjs/operators';
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
}


