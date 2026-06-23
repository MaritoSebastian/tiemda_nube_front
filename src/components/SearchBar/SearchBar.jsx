import { useSearch } from "../../context/SearchContext";
import "./SearchBar.css";
const SearchBar = () => {
  const { search, setSearch } = useSearch();
  console.log("buscador");
  return(
    <div className="search-container">

  <div className="search-box">
    <input
      type="text"
      placeholder="🔎 Buscar producto..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    {search && (
      <button
        className="clear-btn"
        onClick={() => setSearch("")}
        title="Limpiar búsqueda"
      >
        🧹
      </button>
    )}
  </div>
  </div>
  )
};
export default SearchBar;
