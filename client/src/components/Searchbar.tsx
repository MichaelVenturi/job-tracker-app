import { useState } from "react";

interface ISearchbarProps {
  onSearch: (text: string) => void;
}

const Searchbar: React.FC<ISearchbarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    onSearch(e.target.value);
  };
  return (
    <search>
      <input
        type="text"
        id="search"
        name="search"
        className="input rounded-box border border-success/50 mb-2.5"
        placeholder="search"
        value={searchText}
        onChange={onChange}
      />
    </search>
  );
};
export default Searchbar;
