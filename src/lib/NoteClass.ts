import type {
  Notes,
  embeddedVideoProperties,
  Status,
  documentationLinks,
} from "@/src/types";

class Note implements Notes {
  title: string;
  priority: string;
  status: Status;
  user_id: string;
  description?: string;
  deadline?: Date;
  documLinks?: documentationLinks[];
  codeSnippets?: string[];
  videos_info?: embeddedVideoProperties[];

  constructor(
    title: string,
    priority: string,
    user_id: string,
    description?: string,
    deadline?: Date,
    documLinks?: documentationLinks[],
    codeSnippets?: string[],
    videos_info?: embeddedVideoProperties[]
  ) {
    this.title = title;
    this.priority = priority;
    this.user_id = user_id;
    this.status = "pending";
    this.description = description;
    this.deadline = deadline;
    this.documLinks = documLinks;
    this.codeSnippets = codeSnippets;
    this.videos_info = videos_info;
  }
}

export default Note;
