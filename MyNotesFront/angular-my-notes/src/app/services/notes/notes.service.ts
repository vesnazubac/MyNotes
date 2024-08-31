import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { NoteGetDTO } from '../../DTOs/NoteGetDTO';
import { NotePostDTO } from '../../DTOs/NotePostDTO';
import { environment } from '../../../enviroment/env';
import { NotePutDTO } from '../../DTOs/NotePutDTO';
import {Note} from '../../models/Note';
import { Label } from '../../models/label';
@Injectable({
  providedIn: 'root'
})
export class NoteService {
  public notes: NoteGetDTO[] = [];

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<NoteGetDTO[]> {
    return this.httpClient.get<NoteGetDTO[]>(environment.apiHost + 'api/notes')
  }
  getDeletedNotes(id:any):Observable<NoteGetDTO[]>{
    return this.httpClient.get<NoteGetDTO[]>(environment.apiHost + 'api/notes/deletedNotes/'+id)
  }
  getReminderNotes(id: any):Observable<NoteGetDTO[]>{
    return this.httpClient.get<NoteGetDTO[]>(environment.apiHost + 'api/notes/reminderNotes/'+id)
  }
  create(note: NotePostDTO): Observable<NotePostDTO> {
    return this.httpClient.post<NotePostDTO>(environment.apiHost + 'api/notes', note)
  }

  getById(id: any): Observable<NoteGetDTO[]> {
    return this.httpClient.get<NoteGetDTO[]>(environment.apiHost + 'api/notes/by-userId/'+id)
  }
  getDeletedById(id: any): Observable<NoteGetDTO[]> {
    return this.httpClient.get<NoteGetDTO[]>(environment.apiHost + 'api/notes/deleted/by-userId/' + id)
  }
  getArchivedById(id: string): Observable<NoteGetDTO[]> {
    return this.httpClient.get<NoteGetDTO[]>(environment.apiHost + 'api/notes/archived/by-userId/' + id)
  }
  updateNote(id: string, notePutDTO: NotePutDTO): Observable<Note> {
    return this.httpClient.put<Note>(environment.apiHost+`api/notes/editNote/${id}`, notePutDTO);
  }
  archiveNote(id: string): Observable<Note> {
    return this.httpClient.put<Note>(environment.apiHost+`api/notes/archive/${id}`,null);
  }
  searchNotes(term: string,id:any): Observable<NoteGetDTO[]> {
    return this.httpClient.get<NoteGetDTO[]>(environment.apiHost+`api/notes/search/${term}/${id}`);
  }
  deleteNote(id:string):Observable<Note>{
    return this.httpClient.delete<Note>(environment.apiHost+`api/notes/delete/${id}`);
  }

  setDeletedDate(id: string): Observable<Note> {
    return this.httpClient.put<Note>(environment.apiHost+`api/notes/setDeletedDate/${id}`,null);
  }
  restore(id: string): Observable<Note> {
    return this.httpClient.put<Note>(environment.apiHost+`api/notes/restore/${id}`,null);
  }
  addLabel(noteId:any, labelId: any): Observable<void> {
    console.log(
      `${environment.apiHost}api/notes/addLabel/${noteId}/${labelId}`
    )
    return this.httpClient.put<void>(`${environment.apiHost}api/notes/addLabel/${noteId}/${labelId}`,{});
  }

  deleteLabel(noteId: any, label: Label): Observable<void> {
    return this.httpClient.put<void>(`${environment.apiHost}api/notes/deleteLabel/${noteId}`, label);
  }
}
