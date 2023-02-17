import { AxiosInstance, AxiosResponse } from "axios";
import { ApiClient, get } from "./api-client";
import { Birthday, NotableRecord } from "../../types";

const ON_THIS_DAY_API_URL =
  "https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday";

const birthdayApiClient: AxiosInstance = new ApiClient({
  baseURL: ON_THIS_DAY_API_URL,
  timeout: 10000,
}).createAxios();

export interface BirthdaysApiResponse {
  text: string;
  pages: Array<any>;
  year: number;
}

type OnThisDayApiResonse = Record<"births", Array<BirthdaysApiResponse>>;

/**
 * Get public information (wikipedia sourced) on notable individuals born on the provided birthday
 * @see https://api.wikimedia.org/wiki/API_reference/Feed/On_this_day
 * @param birthday i.e { day: 1, month: 12 }
 * @returns Array of notable people born on the provided birthday
 */
export const getBirthdaysToday = async (
  birthday: Birthday
): Promise<Array<NotableRecord>> => {
  try {
    const response: AxiosResponse<OnThisDayApiResonse> = await get(
      birthdayApiClient,
      `/births/${birthday.month}/${birthday.day}`
    );

    const {
      data: { births },
    } = response;

    return transformApiResponse(births);
  } catch {
    throw new Error("General API problem");
  }
};

const transformApiResponse = (
  apiResponse: Array<BirthdaysApiResponse>
): Array<NotableRecord> => {
  return apiResponse.map((item) => {
    return {
      describedName: item.text,
      details: item.pages[0],
      birthYear: item.year,
    };
  });
};
