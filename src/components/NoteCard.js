import React from 'react'

function NoteCard({noteTitle,noteText, handleRemove, index}) {
   const Remove = (e)=>{
    e.preventDefault()
    handleRemove({index})
   }
  return (
    
<div class=" max-w-sm p-6 m-6 border bg-amber-100 border-gray-200 rounded-lg shadow-md bg-gray-800 dark:border-gray-700 ">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{noteTitle}</h5>
    <p class="font-normal text-gray-700 dark:text-gray-400">{noteText}</p>
</div>

  )
}

export default NoteCard