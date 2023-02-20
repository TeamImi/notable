import { useQuery } from "@tanstack/react-query";
import { Birthday } from "@types";
import { getBirthdaysToday, BirthdaysApiResponse } from "@services/api";
import { NotableRecord } from "@types";

export const QUERY_ID = "BIRTHDAYS";
const TEN_MINUTES_IN_MILLISECONDS = 1000 * 60 * 10;

export const useBirthdays = (birthday: Birthday) => {
  return useQuery<Array<NotableRecord>, Error>(
    [QUERY_ID, birthday.day, birthday.month],
    async () => await getBirthdaysToday(birthday),
    {
      staleTime: TEN_MINUTES_IN_MILLISECONDS,
      keepPreviousData: true,
    }
  );
};
