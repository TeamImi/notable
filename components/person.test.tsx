import { render, fireEvent } from "test-utils";
import { theme } from "@theme/index";
import { Person } from "@components/index";

const mockPerson = {
  describedName: "John Doe, popular fictional character",
  details: {
    pageid: 123,
    extract: "John Doe is a fictional character.",
    thumbnail: {},
    titles: {
      normalized: "John Doe",
    },
    content_urls: {},
    description: "John Doe is a fictional character.",
  },
  birthYear: 1990,
};

describe("Person", () => {
  beforeAll(() => {});

  it("displays name and description on the card", () => {
    const { getByText } = render(
      <Person notablePerson={mockPerson} handleOpenDetails={() => null} />
    );

    const name = getByText("John Doe");
    expect(name).toBeTruthy();

    const description = getByText("John Doe is a fictional character.");
    expect(description).toBeTruthy();
  });

  it("renders the favourite button", () => {
    const { getByRole } = render(
      <Person notablePerson={mockPerson} handleOpenDetails={() => null} />
    );

    // Check that the favorite button is rendered in the Person card
    const favoriteButton = getByRole("button");
    expect(favoriteButton).toBeTruthy();

    // Check accessible label of the button
    expect(favoriteButton).toHaveAccessibleName("Favorite");

    // Check the unpressed visual state of the button
    expect(favoriteButton).toHaveStyle({
      color: theme.palette.grey[500],
    });

    // Press the button and expect the pressed visual state
    fireEvent.click(favoriteButton);
    expect(favoriteButton).toHaveStyle({
      color: theme.palette.primary.main,
    });
  });
});
