import type { Notes } from "../types";

class Note implements Notes {
  title: string;
  priority: string;
  isDone: boolean;
  user_id: string;
  metadata?: {
    description?: string;
    deadline?: Date;
    videoLinks?: string[];
    documLinks?: string[];
    codeSnippets?: string[];
    extraNotes?: Note[];
  };

  constructor(
    title: string,
    priority: string,
    user_id: string,
    metadata?: {
      description?: string;
      deadline?: Date;
      videoLinks?: string[];
      documLinks?: string[];
      codeSnippets?: string[];
      extraNotes?: Note[];
    }
  ) {
    this.title = title;
    this.priority = priority;
    this.user_id = user_id;
    this.isDone = false;
    this.metadata = metadata;
  }
}

export default Note;
