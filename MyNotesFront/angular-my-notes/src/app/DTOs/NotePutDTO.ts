export interface NotePutDTO {
  Title: string;
  Content: string;
  Color: string;
  IsPinned: boolean;
  GroupId: string;
  ReminderDate:Date;
  Images:string[];
}


