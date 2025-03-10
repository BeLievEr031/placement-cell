import React from "react";
import { Input } from "@/components/ui/input";
// import { useDebouncedCallback } from 'use-debounce';

const SearchBar = ({ search, setSearch, handleSearch }: {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    handleSearch: () => void;
}) => {

    //     const debounced = useDebouncedCallback(
    //     // function
    //     (value) => {
    //       setValue(value);
    //     },
    //     // delay in ms
    //     1000
    //   );

    return (
        <div className="flex items-center gap-2 w-full max-w-md">
            <Input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value)
                    handleSearch();
                }}
                className="flex-1"
            />
            {/* <Button onClick={handleSearch}>
                <Search className="h-5 w-5" />
            </Button> */}
        </div>
    );
};

export default SearchBar;
