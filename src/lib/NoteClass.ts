import type { Notes, Status, documentationLinks } from "@/src/types";

class NoteClass implements Notes {
  title: string;
  priority: string;
  status: Status;
  userID: string;
  description?: string;
  deadline?: Date;
  documLinks?: documentationLinks[];
  codeSnippets?: string[];
  videos_info?: string[];

  constructor(
    title: string,
    priority: string,
    userID: string,
    description?: string,
    deadline?: Date,
    documLinks?: documentationLinks[],
    codeSnippets?: string[],
    videos_info?: string[]
  ) {
    this.title = title;
    this.priority = priority;
    this.userID = userID;
    this.status = "pending";
    this.description = description;
    this.deadline = deadline;
    this.documLinks = documLinks;
    this.codeSnippets = codeSnippets;
    this.videos_info = videos_info;
  }
}

export default NoteClass;
