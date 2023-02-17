import { memo } from "react";
import { styled } from "@mui/system";
import { ClippedText, Title } from "@thisday/components";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { NotableRecord } from "@thisday/types";
import { useFavorites } from "@thisday/atoms/favorites";

const Item = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  backgroundColor: "#e7eff2",
  boxShadow: "0 4px 24px 3px rgb(0 0 0 / 10%)",
  padding: theme.spacing(3),
  borderRadius: "8px",
  textAlign: "center",
  width: "275px",
  height: "200px",
  cursor: "pointer",
  transform: "scale(1)",

  "&:hover": {
    transform: "scale(1.05)",
    transition: "transform 260ms ease-in-out, filter 260ms ease-in-out",
  },
}));

export const Person = memo(
  ({
    notablePerson,
    handleOpenDetails,
  }: {
    notablePerson: NotableRecord;
    handleOpenDetails: () => void;
  }) => {
    const { addFavorite, removeFavorite, checkIsFavorite } = useFavorites();
    const isFavourite = checkIsFavorite(notablePerson.details.pageid);

    const name = notablePerson.details.titles.normalized;
    const description = notablePerson.details.description;

    const handleAddFavourite = (e: any) => {
      e.stopPropagation();
      addFavorite(notablePerson);
    };

    const handleRemoveFavorite = (e: any) => {
      e.stopPropagation();
      removeFavorite(notablePerson.details.pageid);
    };

    return (
      <>
        <Item onClick={handleOpenDetails}>
          <FavouriteButton
            isFavourite={isFavourite}
            handleFavourite={
              isFavourite ? handleRemoveFavorite : handleAddFavourite
            }
          />
          <Title>{name}</Title>
          {description && <ClippedText content={description} />}
        </Item>
      </>
    );
  }
);

export const StyledIcon = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "isFavorite",
})<{ isFavorite: boolean }>(({ theme, isFavorite }) => ({
  position: "absolute",
  top: "0",
  right: "0",
  color: isFavorite ? theme.palette.primary.main : theme.palette.grey[500],
  zIndex: 2,
}));

const FavouriteButton = memo(
  ({
    isFavourite,
    handleFavourite,
  }: {
    isFavourite: boolean;
    handleFavourite: (e: any) => void;
  }) => {
    return (
      <StyledIcon onClick={handleFavourite} isFavorite>
        <FavoriteIcon />
      </StyledIcon>
    );
  }
);
