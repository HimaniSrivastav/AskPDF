import { Fragment } from "react";
import "./App.css";
import Header from "./components/Header";
import Messages from "./components/questionHandle/recieveMessage";
import { CheckProvider } from "./components/store/checkProvider.jsx";
function App() {
  return (
    <CheckProvider>
      <Fragment classname="h-full w-full">
        <Header />
        <Messages />
      </Fragment>
    </CheckProvider>
  );
}

export default App;
