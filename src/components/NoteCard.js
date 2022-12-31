import React from 'react'

function NoteCard({noteTitle,noteText, handleRemove, index}) {
   const Remove = (e)=>{
    e.preventDefault()
    handleRemove({index})
   }
  return (
    
<div class=" max-w-sm p-6 m-6 bg-white border bg-amber-100 border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 ">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{noteTitle}</h5>
    <p class="font-normal text-gray-700 dark:text-gray-400">{noteText}</p>
    <button onClick={e => Remove(e)} class="text-white bg-amber-300 hover:bg-amber-400  focus:outline-none  font-small rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center">Remove</button>
</div>

  )
}

export default NoteCard