import { Schema, model } from "mongoose";

const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    priority: { type: String, required: true },
    status: { type: String, required: true },
    userID: { type: String, required: true },
    id: { type: String },
    description: { type: String },
    deadline: { type: Date },
    documLinks: [
      {
        title: { type: String },
        url: { type: String },
      },
    ],
    codeSnippets: { type: [String] },
    videos_info: { type: [String] },
  },
  {
    versionKey: false,
  }
);

const Note = model("Note", noteSchema);

export default Note;
