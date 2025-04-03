export const ADD_NOTE = "ADD_NOTE"
export const REMOVE_NOTE = "REMOVE_NOTE"
export const EDIT_NOTE= "EDIT_NOTE"

export const addNote = ({title,content,bgColor,id,labels})=>({type: ADD_NOTE , payload: {title,content,bgColor,id,labels}})
export const removeNote = ({index})=>({type: REMOVE_NOTE , payload: {index}})
export const editNote = ({title,content,bgColor,id})=>({type: EDIT_NOTE , payload: {title,content,bgColor,id}})