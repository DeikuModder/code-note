import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CreateNote from "./CRUD/CreateNote";
import DisplayNotes from "./Display/DisplayNotes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function NotesLogic({ userID }: { userID: string }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CreateNote userID={userID} />
      <DisplayNotes userID={userID} />
    </QueryClientProvider>
  );
}

export default NotesLogic;
