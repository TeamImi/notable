import { render, fireEvent } from "test-utils";
import { Person } from "./person";

const mockPerson = {
  describedName: "John Doe",
  details: {
    pageid: 123,
    extract: "John Doe is a fictional character.",
    thumbnail: {},
    titles: {},
    content_urls: {},
    description: "John Doe is a fictional character.",
  },
  birthYear: 1990,
};

describe("Person", () => {
  beforeAll(() => {});

  it("renders as expected", () => {
    const { getByText } = render(
      <Person notablePerson={mockPerson} handleOpenDetails={() => null} />
    );

    const name = getByText("John Doe");
    expect(name).toBeTruthy();
  });
});
