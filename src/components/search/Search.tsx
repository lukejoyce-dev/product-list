import React from "react";
import "./Search.scss";
interface SearchProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}
const Search: React.FC<SearchProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      type="text"
      className="search-input"
      placeholder={`Search ...`}
      value={searchQuery}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setSearchQuery(e.target.value)
      }
      data-testid="search-input"
    />
  );
};

export default Search;
