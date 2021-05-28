import React, { useState } from "react";
import "./App.css";
import Modal from "./components/Modal/Modal";

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleIsVisible = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="App">
      <button onClick={toggleIsVisible}>Open Modal</button>
      <Modal isVisible={isVisible} toggle={toggleIsVisible}>
        <Modal.Header title={"title of modal"} />
        <Modal.Content>Welcome</Modal.Content>
        <Modal.Footer callToActionLabel={"Done"} />
      </Modal>
    </div>
  );
}

export default App;
