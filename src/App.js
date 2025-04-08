import { Provider } from "react-redux";
import { store } from "./redux/storeConfig";
import MainContainer from "./components/MainContainer";

function App() {
  return (
    <Provider store={store}>
      <MainContainer />
    </Provider>
  );
}

export default App;
