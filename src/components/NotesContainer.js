import { connect } from "react-redux"
import { removeNote } from "../redux/actions"
import NoteCard from "./NoteCard"


const mapStateToProps = (state) => {
    console.log(state)
    return {
        notes: state
    }
}
const mapDispatchToProps = (dispatch) => ({
    removeNote: (noteTitle, noteText) => dispatch(removeNote(noteTitle, noteText)),
})

function noteContainer(props) {
    const notes = props.notes
    const handleRemove = ({ noteTitle, noteText }) => {
        props.removeNote({ noteTitle, noteText })
    }
    return (
        <div class="grid grid-cols-4 gap-3 ">
            {notes.map(note => {
                return (<NoteCard  
                    class="col-span-1 "
                    key={note.index} 
                    handleRemove={handleRemove} 
                    index={note.index} 
                    noteTitle={note.noteTitle} 
                    noteText={note.noteText} /> )
            })}
        </div>
    )
}

export const NoteContainer = connect(mapStateToProps, mapDispatchToProps)(noteContainer)