import React from 'react';
import "../Home/style.css";


export default function Home() {
  return (
    <main>
      <div className="column">
        <div className="left">
          BLOCK
        </div>
        <div className="middle">
          BLOCK
        </div>
        <div className="right">
          <div className="container" id="chatWindow">
            Textbox
          </div>
          <div className="container" id="chatBox">
            Text input
          </div>
        </div>
      </div>
      
    </main>
  );
}