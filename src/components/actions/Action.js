import { ADD_LIST } from "../contants/Contans";
import { DELETE_LIST } from "../contants/Contans";
import { EDIT_LIST } from "../contants/Contans";
import { SEARCH_LIST } from "../contants/Contans";
import { CHECK_LIST } from "../contants/Contans";
import { REMOVE_CHECK_LIST } from "../contants/Contans";
import { REMOVE_ALL } from "../contants/Contans";
export const addList = (action) => {
  return {
    type: ADD_LIST,
    payload: action,
  };
};
export const deleteList = (action) => {
  return {
    type: DELETE_LIST,
    payload: action,
  };
};
export const editList = (action) => {
  return {
    type: EDIT_LIST,
    payload: action,
  };
};
export const searchList = (action) => {
  return {
    type: SEARCH_LIST,
    payload: action,
  };
};
export const checkList = (action) => {
  return {
    type: CHECK_LIST,
    payload:action,
  };
};
export const removeCheckList = (action) => {
  return {
    type: REMOVE_CHECK_LIST,
    payload:action,
  };
};
export const removeAll = (action) => {
  return {
    type: REMOVE_ALL,
    payload: action,
  };
};