import { RacingCategory } from "./racing";

export type NextRacesCategoryGroupResponse = {
  category_race_map: any;
  race_summaries: {
    [race_id: string]: {
      advertised_start: string;
      category_id: RacingCategory;
      meeting_id: string;
      meeting_name: string;
      race_form: any;
      race_id: string;
      race_name: string;
      race_number: number;
      venue_country: string;
      venue_id: string;
      venue_name: string;
      venue_state: string;
      video: any;
    };
  };
};
