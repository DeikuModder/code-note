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

export type documentationLinks = {
  title: string;
  url: string;
};

export type embeddedVideoProperties = {
  srcLink: string;
  title: string;
};

export interface BasicNote {
  title: string;
  priority: string;
  userID: string;
  description?: string;
  deadline?: Date;
}

export type Status = "pending" | "done" | "failed";

export interface Notes {
  title: string;
  priority: string;
  status: Status;
  userID: string;
  _id?: string;
  description?: string;
  deadline?: Date;
  documLinks?: documentationLinks[];
  codeSnippets?: string[];
  videos_info?: embeddedVideoProperties[];
}

export interface Generation {
  id: string;
  generations: GenerationElement[];
  prompt: string;
  meta: Meta;
}

export interface GenerationElement {
  id: string;
  text: string;
  finish_reason: string;
}

export interface Meta {
  apiVersion: APIVersion;
  billedUnits: BilledUnits;
}

export interface APIVersion {
  version: string;
}

export interface BilledUnits {
  inputTokens: number;
  outputTokens: number;
}
