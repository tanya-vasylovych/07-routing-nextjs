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
  const tags = slug[0] === "All" ? "" : slug[0];
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes"],
    queryFn: () => fetchNotes(1, "", tags),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient tags={tags} />
    </HydrationBoundary>
  );
};

export default Notes;
