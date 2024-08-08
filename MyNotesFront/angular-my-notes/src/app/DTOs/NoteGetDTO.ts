// src/app/models/post-dto.ts

export interface NoteGetDTO {
  Title: string;
  Content: string;
  Color: string;
  CreatedDate: Date;
  EditedDate: Date;
  IsPinned: boolean;
  IsArchived: boolean;
  UserId: number;
  GroupId: number;
}
