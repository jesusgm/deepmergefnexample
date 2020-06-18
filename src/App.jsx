import React, { useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import ReactJson from "react-json-view";
import deepMerge from "deepmergefn";
import "./App.css";

function App() {
  const [inputOne, setInputOne] = useState(`{
    "name": "John"
}`);
  const [inputTwo, setInputTwo] = useState(`{
  "lastname": "Doe", 
  "age": 25
}`);
  const [result, setResult] = useState({
    name: "John",
    lastname: "Doe",
    age: 25,
  });

  const isJsonValid = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  const handleMerge = () => {
    console.log("entra");
    if (isJsonValid(inputOne) && isJsonValid(inputTwo)) {
      const objectOne = JSON.parse(inputOne);
      const objectTwo = JSON.parse(inputTwo);
      console.log(objectOne);
      console.log(objectTwo);
      setResult(deepMerge(objectOne, objectTwo));
    } else {
      if (!isJsonValid(inputOne)) {
        alert("JSON 1 is not valid");
      } else {
        alert("JSON 2 is not valid");
      }
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header>
          <h1>
            <a href="https://www.npmjs.com/package/deepmergefn">
              deepMergeFn example
            </a>
          </h1>
        </header>
        <section>
          <div className="input">
            <div className="input-one">
              <h3>JSON 1</h3>
              <AceEditor
                mode="json"
                theme="github"
                value={inputOne}
                onChange={(json) => setInputOne(json.replace(/"/g, '"'))}
                name="inputOne"
                editorProps={{ $blockScrolling: true }}
              />
            </div>
            <div className="input-two">
              <h3>JSON 2</h3>
              <AceEditor
                mode="json"
                theme="github"
                value={inputTwo}
                onChange={(json) => setInputTwo(json.replace(/"/g, '"'))}
                name="inputOne"
                editorProps={{ $blockScrolling: true }}
              />
            </div>
          </div>
          <div className="button" onClick={() => handleMerge()}>
            <button>Merge!</button>
          </div>
          <div className="output">
            <div className="input-result">
              <h3>Result</h3>
              <ReactJson src={result} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
