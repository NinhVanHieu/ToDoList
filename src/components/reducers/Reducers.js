import { ADD_LIST } from "../contants/Contans";
import { DELETE_LIST } from "../contants/Contans";
import { EDIT_LIST } from "../contants/Contans";
import { SEARCH_LIST } from "../contants/Contans";
import { CHECK_LIST } from "../contants/Contans";
import { REMOVE_CHECK_LIST } from "../contants/Contans";
import { REMOVE_ALL } from "../contants/Contans";

const dataInfo = JSON.parse(localStorage.getItem("infoData"));
const initial = {
  content: dataInfo ?? [],
  search: "",
  check: [],
};

export const reducerList = (state = initial, action) => {
  switch (action.type) {
    case ADD_LIST:
      state = { ...state, content: [...state.content, action.payload] };
      return state;
    case DELETE_LIST:
      state = {
        ...state,
        content: [
          ...state.content.filter((item) => item.id !== action.payload),
        ],
      };
      localStorage.setItem("infoData", JSON.stringify(state.content));
      return state;
    case EDIT_LIST:
      state = {
        ...state,
        content: [
          ...state.content.map((item) => {
            return item.id === action.payload.id ? action.payload : item;
          }),
        ],
      };
      return state;
    case SEARCH_LIST:
      state = { ...state, search: action.payload };
      return state;
    case CHECK_LIST:
      state = { ...state, check: [...state.check, action.payload] };
      return state;
    case REMOVE_CHECK_LIST:
      state = {
        ...state,
        check: [
          ...state.check.filter((item) => {
            return item !== action.payload;
          }),
        ],
      };
      return state;
    case REMOVE_ALL:
      const deleteData = action.payload;
      state = {
        ...state,
        content: [
          ...state.content.filter((item) => {
            return !deleteData.includes(item.id);
          }),
        ],
        check: [],
      };
      return state;
    default:
      return state;
  }
};
