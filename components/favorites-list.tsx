import { memo, useState } from "react";
import { styled } from "@mui/system";
import { ClippedText } from "@thisday/components";
import { NotableRecord } from "@thisday/types";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";

const ListItem = styled("li")({
  display: "flex",
  flex: 1,
  justifyContent: "space-between",
  border: "none",
  borderRadius: 4,
  backgroundColor: "#fffcfc",
  listStyleType: "none",
  padding: "0 16px",
  cursor: "pointer",

  "&:hover": {
    transform: "scale(1.05)",
    transition: "transform 500ms ease-in-out",
  },
});

const StyledIcon = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  transform: "scale(0.75)",
}));

const FavouriteItem = memo(
  ({
    person,
    handleFavourite,
  }: {
    person: string;
    handleFavourite: () => void;
  }) => {
    return (
      <ListItem onClick={handleFavourite}>
        <StyledIcon size={"small"}>
          <FavoriteIcon />
        </StyledIcon>
        <ClippedText content={person} tiny />
      </ListItem>
    );
  }
);

const List = styled("ul")({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#f3f3f3",
  width: "100%",
  rowGap: 6,
  border: "none",
  borderRadius: 4,
  padding: "16px",
});

const SectionHeader = styled(ClippedText)({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  textAlign: "center",
  backgroundColor: "yellow",
  color: "yellow",
});

const INITIAL_DISPLAY_COUNT = 5;
const INCREMENT_DISPLAY_COUNT = 5;

const handleDisplayMore = (
  favorites: Array<NotableRecord>,
  displayCount: number
) => {
  const totalCount = favorites.length;
  if (INITIAL_DISPLAY_COUNT >= totalCount) return favorites;
  return favorites.slice(0, displayCount);
};

export const FavoritesList = ({
  favorites,
  removeFavorite,
}: {
  favorites: Array<NotableRecord>;
  removeFavorite: (favoriteId: number) => void;
}) => {
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);
  const displayFavorites = handleDisplayMore(favorites, displayCount);

  const showMore = () => {
    const newDisplayCount = displayCount + INCREMENT_DISPLAY_COUNT;
    setDisplayCount(newDisplayCount);
  };

  return (
    <List>
      <SectionHeader content={"Favourites"} />
      {displayFavorites.map((favorite, index) => {
        const person = favorite.details.titles.normalized;
        const favoriteId = favorite.details.pageid;

        return (
          <FavouriteItem
            key={`${person}-${index}`}
            person={person}
            handleFavourite={removeFavorite.bind(null, favoriteId)}
          />
        );
      })}
      <Button
        variant={"outlined"}
        size={"small"}
        sx={{ marginTop: 2 }}
        onClick={showMore}
      >
        {"Load more favorites"}
      </Button>
    </List>
  );
};
