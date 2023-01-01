import './Index.css';
import Header from './components/Header';
import { AddNoteContainer } from './components/AddNoteContainer';
import { NoteContainer } from './components/NotesContainer';

function App() {
  return (
    <div>
      <Header />
      <div class="grid grid-cols-2 md:grid-cols-9 ">
        <div class="col-start-1 col-span-2 md:col-span-6 ">
          <NoteContainer />
        </div>
        <div class=" col-span-1 md:col-span-2 ">
          <AddNoteContainer />
        </div>
      </div>
    </div>
  );
}

export default App;
