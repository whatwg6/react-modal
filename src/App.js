import { useState, useEffect } from "react";

import Modal from "../components/Modal";
import Popup from "../components/Popup";

export default function App() {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  useEffect(() => setTimeout(() => setShow1(!show1), 3000), [show1]);

  useEffect(() => setTimeout(() => setShow2(!show2), 2000), [show2]);

  return (
    <>
      <Modal>
        {show1 && (
          <div className="App">
            <h1>Hello CodeSandbox</h1>
          </div>
        )}
      </Modal>
      <Popup>
        {show2 && (
          <div className="App">
            <h1>Hello CodeSandbox</h1>
            <h1>Hello CodeSandbox</h1>
            <h1>Hello CodeSandbox</h1>
            <h1>Hello CodeSandbox</h1>
            <h1>Hello CodeSandbox</h1>
            <h1>Hello CodeSandbox</h1>
            <h1>Hello CodeSandbox</h1>
          </div>
        )}
      </Popup>
    </>
  );
}
