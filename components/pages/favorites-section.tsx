import React from "react";
import { FavoritesList } from "@thisday/components";
import { useFavorites } from "@thisday/atoms/favorites";

export const FavoritesSection = () => {
  const { favourites, removeFavorite, showFavorites } = useFavorites();

  return (
    <>
      <FavoritesList favorites={favourites} removeFavorite={removeFavorite} />
    </>
  );
};
