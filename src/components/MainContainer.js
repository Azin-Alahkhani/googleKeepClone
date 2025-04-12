import Header from "./Header";
import AddNoteContainer from "./AddNoteContainer";
import NoteContainer from "./NotesContainer";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { use } from "react";

const MainContainer = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  const [noteOption, setNoteOptions] = useState("notes");

  return (
    <div style={{ backgroundColor: "#202124" }}>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="flex flex-row gap-[60px]">
        {/* static Sidebar */}
        <div className={`${menuOpen ? "w-60" : "w-50"} `}>
          <Sidebar
            isExpanded={menuOpen}
            setIsExpanded={setMenuOpen}
            setNoteOptions={setNoteOptions}
          />
        </div>

        <div className={"w-screen  justify-center h-screen ml-10"}>
          <div className="basis-full p-5 ">
            <AddNoteContainer noteOption={noteOption} />
          </div>
          <div className="w-full">
            <NoteContainer menuOpen={menuOpen} noteOption={noteOption} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
