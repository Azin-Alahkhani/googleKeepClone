export const ADD_NOTE = "ADD_NOTE"
export const REMOVE_NOTE = "REMOVE_NOTE"

export const addNote = ({noteTitle,noteText})=>({type: ADD_NOTE , payload: {noteTitle,noteText}})
export const removeNote = ({index})=>({type: REMOVE_NOTE , payload: {index}})