// src/app/models/post-dto.ts

export interface NoteGetDTO {
  Id:string;
  Title: string;
  Content: string;
  Color: string;
  CreatedDate: Date;
  EditedDate: Date;
  IsPinned: boolean;
  IsArchived: boolean;
  UserId: string;
  GroupId: string;
  DeletedDate:Date;
  IsDeleted:boolean;
  ReminderDate:Date;
  Images:string[];
}
