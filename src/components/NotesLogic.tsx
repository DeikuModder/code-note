import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CreateNote from "./CreateNote";
import DisplayNotes from "./DisplayNotes";

function NotesLogic() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CreateNote />
      <DisplayNotes />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default NotesLogic;
