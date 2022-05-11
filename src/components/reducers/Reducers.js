import { ADD_LIST } from "../contants/Contans";
import { DELETE_LIST } from "../contants/Contans";
import { EDIT_LIST } from "../contants/Contans";
import { SEARCH_LIST } from "../contants/Contans";
import { CHECK_LIST } from "../contants/Contans";
import { REMOVE_CHECK_LIST } from "../contants/Contans";
import { REMOVE_ALL } from "../contants/Contans";
const initial = {
  content: [],
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
      // console.log(state.search);
      // const newState = state.content.filter((item) => {
      //       return item.name.includes(state.search);
      //     })

      // console.log(newState)
      return state;
    case CHECK_LIST:
      state = { ...state, check: [...state.check, action.payload] };
      // console.log(newState);
      // console.log(state.check);
      // const checkState={...newState,check:[...newState.check.filter((item)=>{
      //   console.log(item);
      //   return item.checked ==='true'
      // })]}
      //console.log(newState);
      console.log(state.check);
      return state;
    case REMOVE_CHECK_LIST:
      state = {
        ...state,
        check: [
          ...state.check.filter((item) => {
            return item.id !== action.payload;
          }),
        ],
      };
      console.log(state.check);
      return state;
    case REMOVE_ALL:
      console.log(action.payload);
      const deleteData = action.payload;
      state = {
        ...state,
        content: [
          ...state.content.filter((item) => deleteData.find(item.id))]
      };
      console.log(state)
      return state;
    default:
      return state;
  }
};
