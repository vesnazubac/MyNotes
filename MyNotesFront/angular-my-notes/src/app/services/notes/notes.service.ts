
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { NoteGetDTO } from '../../DTOs/NoteGetDTO';
import { NotePostDTO } from '../../DTOs/NotePostDTO';
import { environment } from '../../../enviroment/env';
import { NotePutDTO } from '../../DTOs/NotePutDTO';
import {Note} from '../../models/Note';
@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private usersList: NoteGetDTO[] = [];

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<NoteGetDTO[]> {
    return this.httpClient.get<NoteGetDTO[]>(environment.apiHost + 'api/notes')
  }


  create(note: NotePostDTO): Observable<NotePostDTO> {
    return this.httpClient.post<NotePostDTO>(environment.apiHost + 'api/notes', note)
  }
  update(note: NotePutDTO,id:number): Observable<Note> {
    return this.httpClient.put<Note>(environment.apiHost + 'api/notes' + id,note)
  }

  deleteNote(id:number) {
    return this.httpClient.delete(environment.apiHost + 'api/notes' + id)
  }

  getById(id: string): Observable<NoteGetDTO> {
    return this.httpClient.get<NoteGetDTO>(environment.apiHost + 'api/notes/id/' + id)
  }
}
