
import Header from './components/Header';
import  AddNoteContainer  from './components/AddNoteContainer';
import NoteContainer from './components/NotesContainer';
import Sidebar from './components/Sidebar';
import { useState } from 'react';
import { Provider } from 'react-redux';
import {store} from './redux/storeConfig';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <Provider store={store}>
    <div style={{ backgroundColor: "#202124" }}>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
     <div className="flex flex-row ">
      <div className={menuOpen ? "basis-1/8 w-[300px]":"basis-1/8 w-[200px]"}><Sidebar isExpanded={menuOpen} setIsExpanded={setMenuOpen} /></div>

<div className={ "basis-8/10 justify-center"}>
 
  <div className="basis-full p-5 ">
      <AddNoteContainer />
      
      </div>
      <div className='w-full'><NoteContainer menuOpen={menuOpen}/></div>
 </div> 
     </div>
    

    </div>
    </Provider>
  );
}

export default App;
