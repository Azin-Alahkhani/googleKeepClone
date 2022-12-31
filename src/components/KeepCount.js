import React from 'react'


function KeepCount() {
    
    const count = 0
  return (
    
    <div className="italic container flex flex-wrap items-center justify-center mx-auto"
    >
        <div className=' font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center'>
        keepCount : { (count ===0) ? "empty" : count} </div></div>
  )
}

export default KeepCount