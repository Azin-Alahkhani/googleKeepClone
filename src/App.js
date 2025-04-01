
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
      <div className={menuOpen ? "basis-1/8":"basis-3/10"}><Sidebar isExpanded={menuOpen} setIsExpanded={setMenuOpen} /></div>

<div className={menuOpen ?"basis-7/8 ":"basis-7/10"}>
<div className='flex flex-col '>
  <div className="basis-full p-5 ml-10 w-200">
      <AddNoteContainer />
      
      </div>
      <div><NoteContainer menuOpen={menuOpen}/></div>
 </div></div>
     </div>
    

    </div>
    </Provider>
  );
}

export default App;
