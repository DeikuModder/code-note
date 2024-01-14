import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Notes } from "@/src/types";
import postNote from "@/services/postNote";
import getUserNotes from "@/services/getUserNotes";
import deleteNote from "@/services/deleteNotes";
import updateNote from "@/services/updateNotes";

const key = "notes";

export function useMutateNotes() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postNote,
    onSuccess: (note) => {
      queryClient.setQueryData([key], (prevNotes: Notes[]) =>
        prevNotes.concat(note)
      );
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });
}

export function useDeleteNotes() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });
}

export function useUpdateNotes() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });
}

export function useNotes() {
  return useQuery<Notes[]>({
    queryKey: [key],
    queryFn: async () => await getUserNotes(),
  });
}

export function useCacheNotes() {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [key],
    queryFn: () => queryClient.getQueryData([key]),
  });
}
