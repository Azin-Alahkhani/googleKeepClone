
import Header from './components/Header';
import { AddNoteContainer } from './components/AddNoteContainer';
import { NoteContainer } from './components/NotesContainer';
import Sidebar from './components/Sidebar';
import { useState } from 'react';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div style={{ backgroundColor: "#202124" }}>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
     <div class="flex flex-row items-center">
      <div class={menuOpen ? "basis-1/8":"basis-3/10"}><Sidebar isExpanded={menuOpen} setIsExpanded={setMenuOpen} /></div>

<div class={menuOpen ?"basis-7/8":"basis-7/10"}>
  <div class="p-5">
      <AddNoteContainer />
      
      </div>
      <div><NoteContainer /></div>
 </div>
     </div>
    

    </div>
  );
}

export default App;
