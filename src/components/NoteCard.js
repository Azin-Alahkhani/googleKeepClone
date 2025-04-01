import React from 'react'

function NoteCard({noteTitle,noteText, handleRemove, index,label}) {
   const Remove = (e)=>{
    e.preventDefault()
    handleRemove({index})
   }
  return (
    
<div className="max-w-sm p-4 m-1 border bg-zinc-800 border-gray-200 rounded-lg shadow-md bg-gray-800 dark:border-gray-700" >
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{noteTitle}</h5>
    <p className="font-normal text-white">{noteText}</p>
</div>

  )
}

export default NoteCard