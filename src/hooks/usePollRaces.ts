import { useEffect, useState } from "react";
import { NEXT_RACES_API_ENDPOINT, RACING_CATEGORIES } from "../constants";
import { NextRacesCategoryGroupResponse } from "../types/api";
import { RacingCategoryFilters, ListRace } from "../types/racing";

export const usePollRaces = (filters: RacingCategoryFilters): { races: ListRace[], isLoading: boolean } => {
  const [unfilteredRaces, setUnfilteredRaces] = useState<ListRace[]>([]);
  const [races, setRaces] = useState<ListRace[]>([]);

  // Initial loading state
  const [isLoading, setIsLoading] = useState(true);

  // Filter races by selected category filters and return first 5 races
  const filterRaces = (races: ListRace[]): ListRace[] => {
    const currentTime = new Date().getTime();

    return races.filter((race) =>  {
      return filters[race.categoryId] && race.advertisedStart.getTime() - currentTime > -300_000;
    }).slice(0, 5);
  }

  // Sort races by advertised start time (chronologically descending)
  const sortRaces = (races: ListRace[]): ListRace[] => races.sort((a, b) => a.advertisedStart.getTime() - b.advertisedStart.getTime());

  // Fetch the next races for all racing categories to prevent multiple network calls when filters changed
  const fetchRaces = async (): Promise<void> => {
    const encodedCategoryIds = encodeURIComponent(JSON.stringify(RACING_CATEGORIES));
    const url = `${NEXT_RACES_API_ENDPOINT}?count=5&categories=${encodedCategoryIds}`;

    const requestInfo = {
      headers: new Headers({ 'Content-Type': 'application/json' }),
    };

    const response = await (await fetch(url, requestInfo)).json() as NextRacesCategoryGroupResponse;

    const listRaces = Object.values(response.race_summaries).map<ListRace>((rawRace) => ({
      raceId: rawRace.race_id,
      meetingName: rawRace.meeting_name,
      raceNumber: rawRace.race_number,
      advertisedStart: new Date(rawRace.advertised_start),
      categoryId: rawRace.category_id,
    }));

    const sortedRaces = sortRaces(listRaces);

    setUnfilteredRaces(sortedRaces);
    setIsLoading(false);
  }

  // Poll for races every 15 seconds
  useEffect(() => {
    fetchRaces();
    setInterval(async () => {
      await fetchRaces();
    }, 15000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter races when category filters changed
  useEffect(() => {
    setRaces(filterRaces(unfilteredRaces));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, unfilteredRaces]);

  return { races, isLoading };
}