import { memo, useEffect, useReducer } from "react";
import { CATEGORY_ID_GREYHOUND, CATEGORY_ID_HARNESS, CATEGORY_ID_THOROUGHBRED, RACING_CATEGORIES } from "../constants";
import { usePollRaces } from "../hooks/usePollRaces";
import { RacingCategoryFilters, RacingCategory } from "../types/racing";
import { CategoryFilters } from "./CategoryFilters/CategoryFilters";
import { LoadingSpinner } from "./LoadingSpinner/LoadingSpinner";
import { NextToGoList } from "./NextToGoList";

const INITIAL_CATEGORY_FILTER_STATE: RacingCategoryFilters = {
  [CATEGORY_ID_THOROUGHBRED]: true,
  [CATEGORY_ID_GREYHOUND]: true,
  [CATEGORY_ID_HARNESS]: true,
}

const _NextToGo = (): JSX.Element => {
  const categoryFiltersReducer = (filters: RacingCategoryFilters, toggledCategory: RacingCategory) => {
    return { ...filters, [toggledCategory]: !filters[toggledCategory] };
  };

  const [categoryFilters, toggleCategoryFilter] = useReducer(categoryFiltersReducer, INITIAL_CATEGORY_FILTER_STATE);
  const { races, isLoading } = usePollRaces(categoryFilters);

  useEffect(() => {
    if (!Object.values(categoryFilters).some((filter) => filter)) {
      RACING_CATEGORIES.forEach((categoryId) => {
        toggleCategoryFilter(categoryId as RacingCategory);
      });
    }
  }, [categoryFilters]);

  return (
    <div>
      <div>
        <h1 data-testid="page-title">Next To Go Races</h1>
        <CategoryFilters categoryFilters={categoryFilters} onFilterChange={toggleCategoryFilter} />
        {isLoading ? <LoadingSpinner /> : <NextToGoList races={races} />}
      </div>
    </div>
  );
}

export const NextToGo = memo(_NextToGo);
