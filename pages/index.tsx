import { useCallback, useState } from "react";
import { GetStaticProps } from "next";
import { dehydrate, QueryClient, DehydratedState } from "@tanstack/react-query";
import Head from "next/head";
import { Stack } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import Container from "@mui/material/Container";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QUERY_ID } from "@queries/index";
import { Dayjs } from "dayjs";
import { getBirthdaysToday } from "@services/api";
import {
  Calendar,
  PersonsSection,
  FavoritesSection,
  Heading,
} from "@components/index";
import { useFavorites } from "@atoms/favorites";

const getTodaysDateAndMonth = (date?: Date) => {
  const d = new Date();
  let day = d.getDate().toString();
  let month = (d.getMonth() + 1).toString();
  return { day, month };
};
const adapter = new AdapterDayjs();

interface ServerSideProps {
  dehydratedState: DehydratedState;
}

export default function Home() {
  const today = adapter.date(new Date());
  const [selectedDate, setSelectedDate] = useState<Dayjs>(today);
  const { showFavorites } = useFavorites();

  const handleDateChange = useCallback((value: Dayjs) => {
    setSelectedDate(value);
  }, []);

  const isDeviceSmall = useMediaQuery("(max-width:700px)");

  return (
    <>
      <Head>
        <title>Notable person birthday</title>
        <meta
          name='description'
          content='Notable people born on any given day'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Container>
        <Stack
          direction='row'
          sx={{
            justifyContent: "space-between",

            flexWrap: "wrap",
            minHeight: "100vh",
          }}
        >
          <Heading content={"Notable people born this day"} />
          <Stack sx={{ flex: showFavorites && !isDeviceSmall ? 0.7 : 1 }}>
            <Calendar
              selectedDate={selectedDate}
              handleDateChange={handleDateChange}
            />
            <PersonsSection selectedDate={selectedDate} />
          </Stack>
          {showFavorites && !isDeviceSmall && (
            <Stack sx={{ flex: 0.3 }}>
              <FavoritesSection />
            </Stack>
          )}
        </Stack>
      </Container>
    </>
  );
}
export const getStaticProps: GetStaticProps<ServerSideProps> = async (
  context
) => {
  const queryClient = new QueryClient();
  try {
    const { day, month } = getTodaysDateAndMonth();

    await queryClient.prefetchQuery([QUERY_ID, day, month], async () => {
      const response = await getBirthdaysToday({ day, month });
      return response;
    });

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        revalidate: 1000 * 60 * 60 * 12, // rebuild static every 12 hours
      },
    };
  } catch (err) {
    console.error(`❌ err`, err);
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
};
