import { ADD_NOTE, REMOVE_NOTE } from "./actions"
import produce from 'immer'


const initialState = [{
    noteTitle:"note title",
    noteText:"note sample text. must be longer so I'll keep on writing a lil bit more. this sounds about right.bye.",
    index:1
   }]

var ind = 1
export const reducer =produce((state = initialState, action)=>{
    if(action.type === ADD_NOTE){
     const note = action.payload
     console.log(note)
     ind=ind +1
     state.push({noteTitle:note.noteTitle, noteText:note.noteText , index:ind})
    }
    if(action.type === REMOVE_NOTE){
        const note = action.payload
         
         state.splice(note.index,1)
    }
    return state
})

