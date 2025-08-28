"use client";
import NoteList from "@/components/NoteList/NoteList";
import css from "./NotePage.module.css";
import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteForm from "@/components/NoteForm/NoteForm";
import Modal from "@/components/Modal/Modal";
import { useDebouncedCallback } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const NoteClient = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isSuccess, isPending } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, search),
    placeholderData: () => ({
      notes: [],
      totalPages: 1,
    }),
  });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 1000);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearchChange={handleSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onChange={handlePageChange}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {isPending && <div>Loading...</div>}
      {isSuccess && data && data.notes?.length > 0 && (
        <NoteList notes={data.notes} />
      )}

      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
};
export default NoteClient;
