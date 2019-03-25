import { visibilityFilters } from "../actions";

const filterReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return {
        filter: action.filter,
        selectedStatuses: action.selectedStatuses,
        selectedCourses: action.selectedCourses,
        searchValue: action.searchValue,
          pageValue: action.pageValue,
      };
    default:
      return {
        filter: state.filter || visibilityFilters.SHOW_ALL,
        selectedStatuses: state.selectedStatuses || [],
        selectedCourses: state.selectedCourses || [],
        searchValue: state.searchValue || "",
          pageValue: state.pageValue || 1
      };
  }
};

export default filterReducer;
