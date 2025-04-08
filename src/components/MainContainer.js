import Header from "./Header";
import AddNoteContainer from "./AddNoteContainer";
import NoteContainer from "./NotesContainer";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";

const MainContainer = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [menuW, setMenuW] = useState("300px");
  const UpdateMenuWidth = () => {
    const width = window.innerWidth;
    if (width < 600) {
    } else if (width < 800) {
    } else if (width < 950) {
    } else if (width < 1024) {
    } else if (width < 1200) {
    } else {
      // Default: 4 or 6 columns
    }
  };

  useEffect(() => {
    UpdateMenuWidth(); // Set columns on mount
    window.addEventListener("resize", UpdateMenuWidth); // Listen for resize events

    return () => window.removeEventListener("resize", UpdateMenuWidth); // Cleanup
  }, [menuOpen]);

  return (
    <div style={{ backgroundColor: "#202124" }}>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="flex flex-row ">
        {/* static Sidebar */}
        <div
          className={menuOpen ? "basis-1/8 w-[200px]" : "basis-1/8 w-[150px]"}
        >
          <Sidebar isExpanded={menuOpen} setIsExpanded={setMenuOpen} />
        </div>
        {/* Hover sidebar */}

        <div className={"flex-grow justify-center"}>
          <div className="basis-full p-5 ">
            <AddNoteContainer />
          </div>
          <div className="w-full">
            <NoteContainer menuOpen={menuOpen} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
