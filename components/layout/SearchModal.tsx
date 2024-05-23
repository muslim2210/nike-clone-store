"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Wrapper from "./Wrapper";
import useSWR from "swr";
import Loader from "../custom ui/Loader";
import Link from "next/link";
import { useRouter } from "next/navigation";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const SearchModal = () => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/collections`,
    fetcher
  );

  const [query, setQuery] = useState("");
  const [value, setValue] = useState("");

  const router = useRouter();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex items-center relative lg:mr-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="hidden md:flex border px-2 py-1 md:w-[200px] text-sm rounded-full bg-primaryGray"
          />
          <Search className="text-primaryBlack w-5 h-5 ml-2 cursor-pointer absolute right-3 hover:text-primaryRed" />
        </div>
        {/* <button className="md:hidden flex items-center relative">
            <Search className="text-primaryBlack w-5 h-5 cursor-pointer absolute right-1" />
          </button> */}
      </AlertDialogTrigger>
      <AlertDialogContent className="">
        <AlertDialogHeader>
          <AlertDialogTitle></AlertDialogTitle>
        </AlertDialogHeader>
        <Wrapper className="flex items-center md:justify-between">
          <Image
            src="/logo.svg"
            alt="logo"
            width={100}
            height={100}
            priority
            className="hidden md:block w-[40px] md:w-[60px]"
          />

          <div className="flex items-center relative mt-5 md:mt-0 lg:mr-2">
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                router.refresh();
              }}
              placeholder="Search..."
              className="px-4 py-2 w-[300px] lg:w-[700px] text-sm rounded-full bg-primaryGray"
            />
            <AlertDialogAction className="bg-trasparent hover:bg-trasparent relative">
              <button
                disabled={query === ""}
                onClick={() => {
                  router.push(`/search/${query}`);
                  router.refresh();
                }}
                className="flex items-center"
              >
                <Search className="text-primaryBlack w-5 h-5 ml-2 cursor-pointer absolute right-10 hover:text-primaryRed" />
              </button>
            </AlertDialogAction>
          </div>

          <AlertDialogCancel asChild>
            <span className="hidden md:block cursor-pointer hover:text-primaryRed">
              Close
            </span>
          </AlertDialogCancel>
        </Wrapper>
        <div className="flex items-center justify-center mt-5">
          <div className="text-primaryBlack w-[300px] lg:w-[700px]">
            <h1 className="text-sm">Popular Search Terms</h1>
            {isLoading ? (
              <Loader />
            ) : (
              <div className="flex flex-col gap-y-3 mt-3">
                {data?.map((collection: CollectionType) => (
                  <div
                    key={collection._id}
                    onClick={() => {
                      setQuery(collection.title);
                      setValue(collection.title);
                      router.push(`/collections/${collection._id}`);
                      router.refresh();
                    }}
                    className="cursor-pointer"
                  >
                    <h2 className="text-primaryBlack text-start font-semibold capitalize text-base md:text-xl hover:text-primaryRed">
                      {collection.title}
                    </h2>
                  </div>
                ))}

                <AlertDialogCancel className="w-[150px] md:hidden">
                  <span className="cursor-pointer text-start hover:text-primaryRed">
                    Close
                  </span>
                </AlertDialogCancel>
              </div>
            )}
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SearchModal;
