import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteClient from "./Notes.client";

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}
const Notes = async ({ params }: NotesProps) => {
  const { slug } = await params;
  const tag = slug[0] === "All%20notes" ? "" : slug[0];
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes(1, "", tag),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient tag={tag} />
    </HydrationBoundary>
  );
};

export default Notes;
