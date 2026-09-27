import { useState } from "react";

function SearchBar({onSearch}) {

  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const HandleSubmit = (event) => {
    event.preventDefault()

    if (search === "") {
      setError("Please enter a movie")
      return
    }

    setError("");
    onSearch(search)
  }

  return (
    <form className="search-bar-wrapper" onSubmit={HandleSubmit}>
      <input className="search-bar" type="text" onChange={(e) => setSearch(e.target.value)}/>
      <button className="search-button" type="submit">Search</button>
      {error && <p>{error}</p>}
    </form>
  )
}
export default SearchBar
