import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";  // Import useDispatch from react-redux
import { addNote, editNote, removeNote } from "../redux/NotesSlice";
import { FaPalette, FaListUl } from "react-icons/fa";
import { FiImage, FiMoreVertical } from "react-icons/fi";
import ColorPicker from "./ColorPicker"; // Importing the new ColorPicker component

function AddNoteContainer({content="", title="",bgColor="#202124",img="",index,onSave, isEdit=false}) {
  const [noteText, setNoteText] = useState(content);
  const [noteTitle, setNoteTitle] = useState(title);
  const [isFocused, setIsFocused] = useState(false);
  const [image,setImage]= useState(img);
  const [bgrColor, setBgrColor] = useState(bgColor!="#202124" ? bgColor : "#202124"); 
  const [isList, setIsList] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const noteRef = useRef(null);
   const [menuOpen, setMenuOpen] = useState(false);
   const menuRef = useRef(null);
    
    console.log("being edited: ",isEdit, bgColor);

  const dispatch = useDispatch();  // Set up dispatch

  // Handle Click Outside to Collapse
  const handleClickOutside = (e) => {
   // console.log(noteTitle,noteText)
   if (!noteRef.current) return;
    if (noteRef.current && !noteRef.current.contains(e.target)) {
     
       if (noteTitle.trim() || noteText.trim() || image.trim()) {
        console.log(noteTitle.trim(), noteText.trim() ,image.trim())
        if(!isEdit){
          
         const noteData = {
        title: noteTitle,
        content: noteText,
        bgColor: bgrColor,
        id:new Date().toISOString(),
        img : image,
        labels:[]
      };
      console.log("dispatching new note",bgrColor);
      dispatch(addNote(noteData)); 
        }
        else if(onSave) {
          const noteData = {id:index, content:noteText, bgColor: bgrColor, title:noteTitle, img: image}
          console.log("dispatching edited note ",bgrColor);
          dispatch(editNote({id:index, content:noteText, title:noteTitle, img: image}))
          onSave()
        }
        // Dispatch addNote action
      
        }
        setNoteText("");
      setNoteTitle("");
      setIsList(false);
      setBgrColor("#202124"); // Reset to default dark color
      setShowColorPicker(false);
      setImage("");
      setIsFocused(false);
      setShowColorPicker(false); // Close color picker if clicked outside
    }
  };
     


  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [noteRef, isEdit, noteTitle, noteText, image]);
  const handleColorSelect = (color)=>{
    setBgrColor(color);
    console.log("color selected",color, bgrColor);
  }

 const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImage(reader.result);
            reader.readAsDataURL(file);
            console.log("image saved");
             const noteData = {
        title: noteTitle,
        content: noteText,
        bgColor: bgrColor,
        id:new Date().toISOString(),
        img : image,
        labels:[]
      };
      console.log("dispatching new note",bgrColor);
      dispatch(addNote(noteData)); 
       setNoteText("");
      setNoteTitle("");
      setIsList(false);
      setBgrColor("#202124"); // Reset to default dark color
      setShowColorPicker(false);
      setImage("");
      setIsFocused(false);
      setShowColorPicker(false); 
        }
    };

    const handleRemove = ()=>{
      if(onSave){
         console.log("removing :",index)
      dispatch(removeNote(index));
      onSave();
      }
     
    }
  return (
    <div
      ref={noteRef}
      className="mx-auto max-w-xl p-4 rounded-lg shadow-lg shadow-gray-900/50 border dark:border-gray-700 flex justify-between"
      style={{
        backgroundColor: bgrColor,
        color: "#fff",
      }}
    >
       
      <form className="flex flex-col space-y-2 w-full">
      
         {/* Show image if uploaded */}
            {image && (
                <div className="mt-2">
                    <img src={image} alt="Note" className="w-full rounded-lg" />
                </div>
            )}

            {/* Image Upload */}
              <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="imageUpload"
                    onChange={handleImageUpload}
                />
             
            
        {(isFocused || isEdit) && (
          <input
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            type="text"
            className="w-full text-lg font-medium p-2 focus:outline-none bg-transparent text-white"
            placeholder="Title"
          />
        )}
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="w-full p-2 text-white  bg-transparent border-none focus:outline-none resize-none"
          placeholder="Take a note..."
          rows={(isFocused || isEdit) ? 3 : 1}
        />
        {(isFocused || isEdit )&& (
          <div className="flex justify-between items-center">
            {/* List & Color Picker */}
            <div className="flex gap-3 relative">
      
              {/* Color Picker Button */}
              <div className="relative inline-block ">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowColorPicker(!showColorPicker);
               }}
                  className="p-2 rounded-full   hover:bg-gray-600"
                >
                  <FaPalette size={20} className="text-white hover:text-gray-200  " title="Background options" />
                </button>

                {showColorPicker && (
                  <div className="absolute top-10 left-0 z-10 shadow-lg">
                    <ColorPicker showPalette={showColorPicker} onColorSelect={handleColorSelect} setShowPalette={setShowColorPicker}/>
                  </div>
                )}
               
              </div>
               <label
                    htmlFor="imageUpload"
                    className="relative flex items-center cursor-pointer p-2 rounded-full hover:bg-gray-600 transition"
                >
                    <FiImage className="text-white text-xl hover:text-gray-200 hover:bg-gray-600 "  title="Add Image"/>
                    
                </label>
                 {/* More Options Menu */}
                  {isEdit && (
     
        <div className="relative">
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setMenuOpen(!menuOpen);
                                        }}
                                        className="p-2 rounded-full hover:bg-gray-600"
                                    >
                                        <FiMoreVertical size={20} className="text-white hover:text-gray-200" title="More" />
                                    </button>

                                    {menuOpen && (
                                         <div ref={menuRef} className="absolute right-0 mt-1 w-48 bg-gray-700 text-white shadow-lg rounded-sm py-1 z-10 text-xs">                                             <button className="block px-4 py-2 text-sm hover:bg-gray-600 w-full text-left" onClick={handleRemove}>
                                                Delete note
                                            </button>
                                             <button className="block px-4 py-2 text-sm hover:bg-gray-600 w-full text-left" onClick={handleRemove}>
                                                Add label
                                            </button>
                                             <button className="block px-4 py-2 text-sm hover:bg-gray-600 w-full text-left" onClick={handleRemove}>
                                                Make a copy
                                            </button>
                                             <button className="block px-4 py-2 text-sm hover:bg-gray-600 w-full text-left" onClick={handleRemove}>
                                                Show checkboxes
                                            </button>
                                             <button className="block px-4 py-2 text-sm hover:bg-gray-600 w-full text-left" onClick={handleRemove}>
                                                Grab image text
                                            </button>
                                             <button className="block px-4 py-2 text-sm hover:bg-gray-600 w-full text-left" onClick={handleRemove}>
                                                Copy to google doc
                                            </button>
                                             <button className="block px-4 py-2 text-sm hover:bg-gray-600 w-full text-left" onClick={handleRemove}>
                                                Version history
                                            </button>
                                        </div>
                                    )}
                                </div>
      )}
            </div>

           
          </div>
        )}
      </form>
         {(!isFocused && !isEdit) && (
          <div className="flex gap-3 justify-center">
                          <div className="relative flex items-center cursor-pointer p-2 rounded-full hover:bg-gray-600 transition">
              <button type="button">
                <FaListUl className="text-white hover:text-gray-400 " title="NewList" />
              </button>
              
</div>
<div  className="relative flex items-center cursor-pointer p-2 rounded-full hover:bg-gray-600 transition">
                 <button type="button" >
                     <label
                    htmlFor="imageUpload"
                    className="relative flex items-center cursor-pointer p-2 rounded-full hover:bg-gray-600 transition"
                >
                    <FiImage className="text-white text-xl hover:text-gray-400 hover:bg-gray-600 "  title="Add Image"/>
                   </label> 
                </button>
              </div>

              
</div>
                )}
              
    </div>
  );
}

export default AddNoteContainer;
