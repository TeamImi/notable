import React from "react";
import { FavoritesList } from "@components/index";
import { useFavorites } from "@atoms/favorites";

export const FavoritesSection = () => {
  const { favourites, removeFavorite } = useFavorites();

  return (
    <>
      <FavoritesList favorites={favourites} removeFavorite={removeFavorite} />
    </>
  );
};
