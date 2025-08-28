import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteClient from "./Notes.client";

const Notes = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes"],
    queryFn: () => fetchNotes(1, ""),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient />
    </HydrationBoundary>
  );
};

export default Notes;
