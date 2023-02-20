import { render } from "test-utils";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Calendar } from "@components/index";

const adapter = new AdapterDayjs();
const today = adapter.date("2021-01-01");

const mockTrue = jest.fn(() => true);
const mockFalse = jest.fn(() => false);

jest.mock("@mui/material/useMediaQuery", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Calendar", () => {
  it("displays desktop calendar as expected", () => {
    // Mock the useMediaQuery hook to return true for desktop view
    (useMediaQuery as jest.Mock).mockReturnValue(mockTrue());

    const { container } = render(
      <Calendar selectedDate={today} handleDateChange={() => null} />
    );

    expect(container).toBeTruthy();
    expect(container).toHaveTextContent("Jan 1");
  });

  it("displays mobile calendar as expected", () => {
    // Mock the useMediaQuery hook to return true for mobile view
    (useMediaQuery as jest.Mock).mockReturnValue(mockFalse());

    const { container, getByRole, debug } = render(
      <Calendar selectedDate={today} handleDateChange={() => null} />
    );

    expect(container).toBeTruthy();

    const dateInput = getByRole("textbox");
    expect(dateInput).toBeTruthy();
    expect(dateInput).toHaveValue("01/01/2021");
  });
});
