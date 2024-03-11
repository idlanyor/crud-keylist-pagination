"use client"
import ContactTable from "@/components/contact-table";
import Search from "@/components/search";
import Pagination from "@/components/pagination";
import { CreateButton } from "@/components/buttons";
import { getContactPages } from "@/lib/data";
import { Suspense, useEffect, useState } from "react";
import { TableSkeleton } from "@/components/skeleton";

interface SearchParams {
  query?: string;
  page?: string;
}

const Contacts: React.FC<{ searchParams?: SearchParams }> = ({ searchParams }) => {
  const [totalPages, setTotalPages] = useState<number>(0);
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  useEffect(() => {
    const fetchTotalPages = async () => {
      const totalPages = await getContactPages(query);
      setTotalPages(totalPages);
    };

    fetchTotalPages();
  }, [query]);

  return (
    <div className="max-w-screen-md mx-auto mt-5">
      <div className="flex items-center justify-between gap-1 mb-5">
        <Search />
        <CreateButton />
      </div>
      <Suspense key={query + currentPage} fallback={<TableSkeleton />}>
        <ContactTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="flex justify-center mt-4">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Contacts