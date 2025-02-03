import React, { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import useDebounce from "../hooks/useDebounce";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const debouncedSearch = useDebounce(searchTerm, 500);

  const fetchPokemonData = async (page = 1) => {
    setLoading(true);
    try {
      const offset = (page - 1) * 10; 
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`);
      const data = await res.json();

      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon) => {
          const details = await fetch(pokemon.url);
          return details.json();
        })
      );

      setPokemons(detailedPokemons);
      setTotalPages(Math.ceil(data.count / 10));
    } catch (error) {
      setError("Failed to load Pokémon data!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonData(currentPage);
  }, [currentPage]);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Pokémon List</h1>
      <SearchBar setSearchTerm={setSearchTerm} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="pokemon-list">
        {filteredPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Home;
