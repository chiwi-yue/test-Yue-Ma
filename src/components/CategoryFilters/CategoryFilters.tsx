import './CategoryFilters.css';
import { memo } from "react"
import { CATEGORY_ID_GREYHOUND, CATEGORY_ID_HARNESS, CATEGORY_ID_THOROUGHBRED } from "../../constants";
import { RacingCategoryFilters, RacingCategory } from "../../types/racing";

const CATEGORY_FILTERS: {
  name: string,
  categoryId: RacingCategory
}[] = [
  {
    name: 'Thoroughbred',
    categoryId: CATEGORY_ID_THOROUGHBRED,
  },
  {
    name: 'Greyhound',
    categoryId: CATEGORY_ID_GREYHOUND,
  },
  {
    name: 'Harness',
    categoryId: CATEGORY_ID_HARNESS,
  },
];

type Props = { categoryFilters: RacingCategoryFilters, onFilterChange: (category: RacingCategory) => void };

const _CategoryFilters = ({ categoryFilters, onFilterChange }: Props): JSX.Element => {
  return (
    <div className="category-filters" data-testid="category-filters">
      {CATEGORY_FILTERS.map((filter) => (
        <div className="category-filter" data-testid={`category-filter-${filter.categoryId}`}>
          <input className="filter-checkbox" data-testid="category-filter-checkbox" type="checkbox" checked={categoryFilters[filter.categoryId]} onChange={() => onFilterChange(filter.categoryId)} />
          <label data-testid="category-filter-label">{filter.name}</label>
        </div>
      ))}
    </div>
  );
}

export const CategoryFilters = memo(_CategoryFilters);
