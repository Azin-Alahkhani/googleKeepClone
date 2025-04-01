
import Header from './components/Header';
import { AddNoteContainer } from './components/AddNoteContainer';
import { NoteContainer } from './components/NotesContainer';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div style={{ backgroundColor: "#202124" }}>
      <Header />
     
      <div class="p-5">
      <AddNoteContainer />
      
      </div>
      <div class="grid grid-rows-7 md:grid-rows-3 gap-4">
        <div  class="row-span-1 ">
          <Sidebar />
        </div>
        <div class="row-span-6 md:row-span-3">
         
      <NoteContainer />
      </div>
      </div>
    </div>
  );
}

export default App;
