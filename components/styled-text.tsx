import { styled } from "@mui/system";

export const Title = styled("h3")({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  color: "#263238",
});

const StyledText = styled("p")<{ maxLines?: number; tiny?: boolean }>(
  ({ maxLines, tiny }) => ({
    display: "-webkit-box",
    WebkitLineClamp: maxLines,
    lineClamp: maxLines,
    boxOrient: "vertical",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "#37474f",
    fontSize: tiny ? "0.75rem" : "1rem",
  })
);

export const ClippedText = ({
  content,
  tiny,
  maxLines = 2,
}: {
  content: string;
  tiny?: boolean;
  maxLines?: number;
}) => {
  return (
    <StyledText maxLines={maxLines} tiny={tiny}>
      {content}
    </StyledText>
  );
};

const StyledHeading = styled("h1")({
  color: "#263238",
});

const HeadingContainer = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "row",
  justifyContent: "center",
  width: "100%",
});

export const Heading = ({ content }: { content: string }) => {
  return (
    <HeadingContainer>
      <StyledHeading>{content}</StyledHeading>
    </HeadingContainer>
  );
};
