import { useCallback, useState, memo, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { styled } from "@mui/system";
import Pagination from "@mui/material/Pagination";
import { Dayjs } from "dayjs";
import { useBirthdays } from "@thisday/queries";

const DynamicGrid = dynamic(() => import("@thisday/components/persons-grid"));

const PaginationContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  padding: theme.spacing(2),
}));

const getTodaysDateAndMonth = (date?: Date) => {
  const d = new Date();
  let day = d.getDate().toString();
  let month = (d.getMonth() + 1).toString();
  return { day, month };
};

const dayjsDayAndMonth = (date: Dayjs) => {
  if (!date) return getTodaysDateAndMonth();

  const day = date.date().toString();
  const month = (date.month() + 1).toString();
  return { day, month };
};

const CARDS_PER_PAGE = 18;

export const PersonsSection = ({ selectedDate }: { selectedDate: Dayjs }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error } = useBirthdays(dayjsDayAndMonth(selectedDate));
  const birthdays = useMemo(() => (!!data ? data : []), [data]);
  const gridRef = useRef(null);

  const nbPages = useMemo(() => {
    if (!birthdays) return 1;
    return Math.ceil(birthdays.length / CARDS_PER_PAGE);
  }, [birthdays]);

  const personCardsByPage = useMemo(() => {
    return currentPage === 1
      ? birthdays?.slice(0, CARDS_PER_PAGE)
      : birthdays?.slice(
          (currentPage - 1) * CARDS_PER_PAGE,
          (currentPage - 1) * CARDS_PER_PAGE + CARDS_PER_PAGE
        );
  }, [currentPage, birthdays, CARDS_PER_PAGE]);

  const handlePageIndexChanged = useCallback(
    (_: React.ChangeEvent<unknown>, page: number) => {
      setCurrentPage(page);
      if (window) {
        window.scroll({
          // @ts-expect-error
          top: gridRef?.current?.offsetTop,
          behavior: "smooth",
        });
      }
    },
    [setCurrentPage, personCardsByPage]
  );

  if (error) {
    return (
      <div>
        <span>{"Yikes, something went wrong!"}</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <span>{"Oh no! No result for this selected day 😏"}</span>
      </div>
    );
  }

  return (
    <>
      <DynamicGrid notableBirthdays={personCardsByPage} gridRef={gridRef} />
      <PaginationContainer>
        <Pagination
          onChange={handlePageIndexChanged}
          page={currentPage}
          count={nbPages}
          defaultPage={1}
          variant='outlined'
          shape='rounded'
          size='large'
        />
      </PaginationContainer>
    </>
  );
};
