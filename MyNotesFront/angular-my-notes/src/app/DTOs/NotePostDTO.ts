export interface NotePostDTO {
  title: string;
  content: string;
  color: string;
  // createdDate: Date;
  // editedDate: Date;
  isPinned: boolean;
  // isArchived: boolean;
  userId:string;
  groupId: string;
}
