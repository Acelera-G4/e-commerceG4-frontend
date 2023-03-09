import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http: HttpClient) {}

  public postImage(image: String):Observable<any> {
    var formData: any = new FormData();
    formData.append('image', image);
    return this.http.post(`https://api.imgbb.com/1/upload?key=7ca59c60715c67ba9759e9f0c195bfe3`, formData);
  }
}
