import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { NotableRecord } from "@types";

export const favoriteAtomWithStorage = atomWithStorage<
  Record<number, NotableRecord>
>("favourites", {});

export const useFavorites = () => {
  const [favouritesRecord, setFavouritesRecord] = useAtom(
    favoriteAtomWithStorage
  );
  const favourites = Object.values(favouritesRecord);
  const showFavorites = favourites.length > 0;

  const addFavorite = (favorite: NotableRecord) => {
    setFavouritesRecord({
      ...favouritesRecord,
      [favorite.details.pageid]: favorite,
    });
  };
  const removeFavorite = (favoriteId: number) => {
    const newFavorites = { ...favouritesRecord };
    delete newFavorites[favoriteId];
    setFavouritesRecord({
      ...newFavorites,
    });
  };
  const checkIsFavorite = (favoriteId: number) => {
    return !!favouritesRecord[favoriteId];
  };

  return {
    addFavorite,
    removeFavorite,
    showFavorites,
    checkIsFavorite,
    favourites,
  };
};
