import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import { StaticDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { styled } from "@mui/system";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

interface CalendarProps {
  selectedDate: Dayjs;
  handleDateChange: (date: Dayjs) => void;
}

const MobileDatePickerContainer = styled(MobileDatePicker)({
  width: "50%",
  margin: "0 auto",
});

export const Calendar = ({ selectedDate, handleDateChange }: CalendarProps) => {
  const matches = useMediaQuery("(min-width:700px)");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {matches ? (
        <StaticDatePicker<Dayjs>
          orientation='landscape'
          value={selectedDate}
          // @ts-expect-error
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      ) : (
        <MobileDatePickerContainer
          label='Select date'
          value={selectedDate}
          // @ts-expect-error
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      )}
    </LocalizationProvider>
  );
};
