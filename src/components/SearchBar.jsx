import { useState } from "react";

function SearchBar({onSearch}) {

  const [search, setSearch] = useState("");

  const HandleSubmit = (event) => {
    event.preventDefault()
    onSearch(search)
  }

  return (
    <form className="search-bar-wrapper" onSubmit={HandleSubmit}>
      <input className="search-bar" type="text" onChange={(e) => setSearch(e.target.value)}/>
      <button className="search-button" type="submit">Search</button>
    </form>
  )
}
export default SearchBar
