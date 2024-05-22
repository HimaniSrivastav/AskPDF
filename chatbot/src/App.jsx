import { Fragment } from "react";
import "./App.css";
import Header from "./components/Header";
import Messages from "./components/inputs/RecieveMessage.jsx";
import { CheckProvider } from "./components/store/checkProvider.jsx";
function App() {
  return (
    <CheckProvider>
      <Fragment>
        <Header />
        <Messages />
      </Fragment>
    </CheckProvider>
  );
}

export default App;
