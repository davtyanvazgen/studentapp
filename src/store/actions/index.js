export const setFilter = (
  filter,
  selectedStatuses,
  selectedCourses,
  searchValue,
  pageValue
) => ({
  type: "SET_VISIBILITY_FILTER",
  filter,
  selectedStatuses,
  selectedCourses,
  searchValue,
    pageValue
});

export const visibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_WITH_STATUS: "SHOW_WITH_STATUS",
  SHOW_WITH_COURSES: "SHOW_WITH_COURSES",
  SHOW_WITH_COURSES_AND_STATUS: "SHOW_WITH_COURSES_AND_STATUS"
};
