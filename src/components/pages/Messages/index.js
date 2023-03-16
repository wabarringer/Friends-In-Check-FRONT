import React from "react";
import "../Messages/style.css";

const Messages = () => {
  return (
    <section>
      <div className="column">
        <div className="msgPageDiv">
          <div className="allMessagesDiv">
            <h3>All messages/preview</h3>
          </div>

          <div className="directMessageDiv">
            <div id="msgWindow">
              <h3>Individual message with friend</h3>
            </div>
            <div id="msgInput">
              {/* <form onSubmit={sendMsg}>
                <input
                  type="text"
                  placeholder="chat with your opponent"
                  onChange={handleChatInput}
                  value={msgInputted}
                ></input>
              </form> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Messages;
