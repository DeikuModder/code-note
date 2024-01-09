import type { Notes, embeddedVideoProperties } from "../types";

class Note implements Notes {
  title: string;
  priority: string;
  isDone: boolean;
  user_id: string;
  description?: string;
  deadline?: string;
  documLinks?: string[];
  codeSnippets?: string[];
  videos_info?: embeddedVideoProperties[];

  constructor(
    title: string,
    priority: string,
    user_id: string,
    description?: string,
    deadline?: string,
    documLinks?: string[],
    codeSnippets?: string[],
    videos_info?: embeddedVideoProperties[]
  ) {
    this.title = title;
    this.priority = priority;
    this.user_id = user_id;
    this.isDone = false;
    this.description = description;
    this.deadline = deadline;
    this.documLinks = documLinks;
    this.codeSnippets = codeSnippets;
    this.videos_info = videos_info;
  }
}

export default Note;
