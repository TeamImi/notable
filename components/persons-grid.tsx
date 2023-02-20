import { useCallback, useState, RefObject } from "react";
import { styled } from "@mui/system";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { ClippedText, Title } from "@thisday/components";
import { NotableRecord } from "@thisday/types";
import { Person } from "./person";

export const Container = styled("ul")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gridColumnGap: "16px",
  gridRowGap: "24px",
  width: "100%",
  height: "auto",
  margin: "0 auto",
  padding: "16px 24px 0 0",
  listStyleType: "none",

  [theme.breakpoints.up("md")]: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridColumnGap: "16px",
    gridRowGap: "24px",
  },

  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
}));

interface PersonsGridProps {
  notableBirthdays: Array<NotableRecord>;
  gridRef: RefObject<any>;
}
const PersonsGrid = ({ notableBirthdays, gridRef }: PersonsGridProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPerson, setCurrentPerson] = useState({} as NotableRecord);

  const handleOpen = useCallback((person: NotableRecord) => {
    setCurrentPerson(person);
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <Container ref={gridRef}>
      {notableBirthdays.map((person, index) => (
        <Person
          key={`${person.details.pageid}-${index}`}
          notablePerson={person}
          handleOpenDetails={() => handleOpen(person)}
        />
      ))}
      {isOpen && (
        <MoreDetails
          isOpen={isOpen}
          handleClose={handleClose}
          person={currentPerson}
        />
      )}
    </Container>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  outline: "none",
  borderRadius: 3,
  padding: 3,
};

interface MoreDetailsProps {
  isOpen: boolean;
  handleClose: () => void;
  person: NotableRecord;
}
const MoreDetails = ({ isOpen, handleClose, person }: MoreDetailsProps) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='Notable birthday'
      aria-describedby='Notable person born today'
    >
      <Box width={{ xs: "100%", lg: "600px" }} sx={{ ...style }}>
        <Content>
          <Title>{person.details.titles.normalized}</Title>
          <ClippedText content={person.details.extract} maxLines={4} />
          <a
            href={person.details.content_urls.desktop.page}
            referrerPolicy='no-referrer'
            target='_blank'
          >
            Read more
          </a>
          <ImageContainer>
            <img
              src={person.details.thumbnail.source}
              alt={person.details.titles.normalized}
            />
          </ImageContainer>
        </Content>
      </Box>
    </Modal>
  );
};

const Content = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  rowGap: 2,
  height: "100%",
});

const ImageContainer = styled("div")({
  height: "auto",
  width: "100%",
});

export default PersonsGrid;
