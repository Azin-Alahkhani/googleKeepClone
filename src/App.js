import './Index.css';
import Header from './components/Header';
import KeepCount from './components/KeepCount';
import { AddNoteContainer } from './components/AddNoteContainer';
import { NoteContainer } from './components/NotesContainer';

function App() {
  return (
    <div>
      <Header />

      {/* <KeepCount /> */}
      {/* <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"> */}
      <div class="grid grid-cols-2 md:grid-cols-9 ">
        <div class="col-start-1 col-span-1 md:col-span-6 ">
          <NoteContainer />
        </div>
        <div class=" col-span-1 md:col-span-3 ">
          <AddNoteContainer />
        </div>
      </div>

      {/* </div> */}


    </div>

  );
}

export default App;
