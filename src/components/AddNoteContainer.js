import React, { useState } from 'react'
import { connect } from "react-redux"
import { addNote } from "../redux/actions"

import logo from '../assets/Google_Keep_2019_icon.webp'

const mapDispatchToProps = (dispatch) => ({
  addNote: (noteTitle, noteText) => dispatch(addNote(noteTitle, noteText)),
})

function AddNote(props) {
  const [noteText, setNoteText] = useState("")
  const [noteTitle, setNoteTitle] = useState("")

  const handleAddNote = (e) => {
    e.preventDefault()
    console.log(noteText, noteTitle)
    if (noteText !== "" && noteTitle !== "") {
      props.addNote({ noteTitle, noteText })
      setNoteText("")
      setNoteTitle("")
    }
  }
  return (
    <div class="m-10 p-6 max-w-sm mx-auto bg-amber-100 rounded-xl shadow-lg flex items-start space-x-4">
      <div class="shrink-0">
        <img class="h-12 w-12" src={logo} alt="Logo" />
      </div>
      <div>
        <form>
          <div class="mb-6">
            <label for="text" class="text-xl font-medium text-black block mb-2 text-sm font-medium text-amber-900 dark:text-white">note title</label>
            <input value={noteTitle} onChange={e => setNoteTitle(e.target.value)} type="text" id="text" class="bg-yellow-50 border border-yellow-300 text-amber-900 text-sm rounded-lg focus:ring-amber-500 focus:border-gery-500 block w-full p-2.5 dark:bg-yellow-700 dark:border-yellow-600 dark:placeholder-yellow-400 dark:text-white dark:focus:ring-amber-500 dark:focus:border-gery-500" autoComplete='false' placeholder="write here" required />
          </div>
          <div class="mb-6">
            <label for="text" class="block mb-2 text-sm font-medium text-amber-500 dark:text-white">note text</label>
            <input value={noteText} autoComplete='false' onChange={e => setNoteText(e.target.value)} type="text" id="text" class="bg-yellow-50 border border-yellow-300 text-amber-500 text-sm rounded-lg focus:ring-amber-500 focus:border-gery-500 block w-full p-2.5 dark:bg-yellow-700 dark:border-yellow-600 dark:placeholder-yellow-400 dark:text-white dark:focus:ring-amber-500 dark:focus:border-gery-500" placeholder="write here" required />
          </div>
          <button type="button" onClick={e => handleAddNote(e)} class="mt-6 text-white bg-amber-300 hover:bg-amber-400 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gery-600 dark:hover:bg-gery-700 dark:focus:ring-amber-800">Add New Note</button>
        </form>
      </div>
    </div>
  )
}

export const AddNoteContainer = connect(null, mapDispatchToProps)(AddNote)

