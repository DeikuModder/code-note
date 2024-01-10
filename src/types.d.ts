export interface NewUser {
  username: string;
  email: string;
  passwordHash: string;
}

export type LoggedUser = Omit<NewUser, "email">;

export enum Priority {
  highlyImportant = "Highly Important",
  important = "Important",
  normal = "Normal",
  notImportant = "Not Important",
}

export type embeddedVideoProperties = {
  srcLink: string;
  title: string;
};

export interface BasicNote {
  title: string;
  priority: string;
  description?: string;
  deadline?: string;
}

export interface Notes {
  title: string;
  priority: string;
  isDone: boolean;
  user_id: string;
  id?: string;
  description?: string;
  deadline?: string;
  documLinks?: string[];
  codeSnippets?: string[];
  videos_info?: embeddedVideoProperties[];
}
