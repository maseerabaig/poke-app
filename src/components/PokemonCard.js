import React from "react";

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h3>{pokemon.name.toUpperCase()}</h3>
      <p>ID: {pokemon.id}</p>
      <p>Type: {pokemon.types.map((type) => type.type.name).join(", ")}</p>
      <p>Abilities: {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}</p>
    </div>
  );
};

export default PokemonCard;
