import { CATEGORY_ID_GREYHOUND, CATEGORY_ID_HARNESS, CATEGORY_ID_THOROUGHBRED } from "../constants";

export type RacingCategory = typeof CATEGORY_ID_THOROUGHBRED | typeof CATEGORY_ID_GREYHOUND | typeof CATEGORY_ID_HARNESS;

export type RacingCategoryFilters = {
  [CATEGORY_ID_THOROUGHBRED]: boolean;
  [CATEGORY_ID_GREYHOUND]: boolean;
  [CATEGORY_ID_HARNESS]: boolean;
};

export type ListRace = {
  raceId: string;
  meetingName: string;
  raceNumber: number;
  advertisedStart: Date;
  categoryId: RacingCategory;
};
