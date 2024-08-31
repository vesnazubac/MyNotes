import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroment/env';
import { Label } from '../../models/label';
import { LabelPostDTO } from '../../DTOs/labelPostDTO';
import { LabelPutDTO } from '../../DTOs/labelPutDTO';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  private apiUrl = `${environment.apiHost}api/labels`;

  constructor(private http: HttpClient) { }

  // Create a new label
  createLabel(label: LabelPostDTO): Observable<Label> {
    return this.http.post<Label>(`${this.apiUrl}`, label);
  }

  // Get all labels
  getLabels(): Observable<Label[]> {
    return this.http.get<Label[]>(`${this.apiUrl}`);
  }

  // Get a label by id
  getLabelById(id: any): Observable<Label> {
    return this.http.get<Label>(`${this.apiUrl}/by-id/${id}`);
  }

  // Update a label
  updateLabel(id: any, labelPutDTO: LabelPutDTO): Observable<Label> {
    return this.http.put<Label>(`${this.apiUrl}/editLabel/${id}`, labelPutDTO);
  }

  // Delete a label
  deleteLabel(id:any): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
