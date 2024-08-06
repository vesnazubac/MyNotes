
export interface NotePutDTO {
  title: string;
  content: string;
  color: string;
  editedDate: Date;
  isPinned: boolean;
  isArchived: boolean;
  groupId: number;
}
