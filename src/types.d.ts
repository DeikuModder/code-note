export interface NewUser {
  username: string;
  email: string;
  passwordHash: string;
}

export type LoggedUser = Omit<NewUser, "email">;

export type Metadata = {
  description?: string;
  deadline?: Date;
  videoLinks?: string[];
  documLinks?: string[];
  codeSnippets?: string[];
  extraNotes?: Note[];
};

export enum Priority {
  highlyImportant = "Highly Important",
  important = "Important",
  normal = "Normal",
  notImportant = "Not Important",
}

export interface Notes {
  title: string;
  priority: string;
  isDone: boolean;
  user_id: string;
  id?: string;
  metadata?: Metadata;
}

export type DefaultNote = {
  title: string;
  priority: Priority;
  description?: string;
  deadline?: Date;
};
