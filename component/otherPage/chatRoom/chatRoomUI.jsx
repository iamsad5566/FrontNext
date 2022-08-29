import React, { useEffect, useRef, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";

var stompClient = null;
var counter = 0;
const ChatRoomUI = (props) => {
  let messageEL = useRef(false);
  const [message, setMessage] = useState("");
  const [publicChats, setPublicChats] = useState([]);
  const [activeSessions, setActiveSessions] = useState(0);
  const [reconnect, setReconnect] = useState(false);
  const { nickname } = props;

  const connect = () => {
    let Sock = new SockJS("https://tw-yk.website:8442/chat");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onError = (err) => {
    console.log(err);
  };

  const onConnected = () => {
    stompClient.subscribe("/topic/chatRoom", onMessageReceived);
    stompClient.subscribe("/sessions/number", onActiveSession);
    userJoin();
    keepGettingData();
  };

  const onActiveSession = (payload) => {
    let data = JSON.parse(payload.body);
    setActiveSessions(data);
  };

  const userJoin = () => {
    let chatMessage = {
      name: nickname,
      message: "",
    };

    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    publicChats.push(payloadData);
    setPublicChats([...publicChats]);
  };

  const keepGettingData = () => {
    let message = {
      name: nickname,
    };
    stompClient.send("/app/getActiveSessions", {}, JSON.stringify(message));

    let counting = setInterval(() => {
      if (counter < 6) {
        counter++;
        stompClient.send("/app/getActiveSessions", {}, JSON.stringify(message));
      } else if (counter === 6) {
        counter++;
        stompClient.disconnect();
        setReconnect(true);
        clearInterval(counting);
      }
    }, 10000);
  };

  function handleChange(event) {
    setMessage(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (stompClient) {
      let chatMessage = {
        name: nickname,
        message: message,
      };

      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
      setMessage("");
      counter = 0;
    }
  }

  const handleReConnect = () => {
    counter = 0;
    connect();
    setReconnect(false);
  };

  useEffect(() => {
    connect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (messageEL) {
      messageEL.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);

  const styleForChatRoom = {
    height: "100vh",
    marginTop: "2em",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  let key = 0;
  return (
    <React.Fragment>
      <main className="content" style={styleForChatRoom}>
        <div className="container p-0" id="chatContainer">
          <h1
            className="h3 mb-3"
            style={{ textAlign: "center", fontSize: "2em", fontWeight: 700 }}
          >
            Chat Room
          </h1>
          <span
            style={{
              textAlign: "center",
              lineHeight: "1.5",
              fontSize: "1.5em",
            }}
          >
            在線人數：{activeSessions <= 1 ? 1 : activeSessions}
          </span>
          {reconnect ? (
            <h4 style={{ textAlign: "center" }}>
              {" "}
              <button
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  color: "red",
                }}
                onClick={handleReConnect}
              >
                {" "}
                {">>>>>> 已斷線，點選此處重新連結！<<<<<<"}{" "}
              </button>{" "}
            </h4>
          ) : (
            <></>
          )}

          <div className="card" style={{ marginTop: "1.5em" }}>
            <div className="row">
              <div className="col">
                <div className="position-relative">
                  <div
                    className="chat-messages p-4"
                    style={{ height: "60vh", overflow: "scroll" }}
                    ref={messageEL}
                  >
                    {publicChats.map((chat) => {
                      if (chat.message.length === 0) {
                        // eslint-disable-next-line
                        return;
                      }

                      return (
                        <div
                          className="chat-message-right pb-4"
                          key={key++}
                          style={
                            chat.name === nickname
                              ? { textAlign: "right", color: "purple" }
                              : { textAlign: "left" }
                          }
                        >
                          <div>
                            <h5 style={{ display: "inline" }}> {chat.name} </h5>{" "}
                            <span className="text-muted small text-nowrap mt-2">
                              {chat.time}
                            </span>
                            {/* <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle mr-1" alt="Chris Wood" width="40" height="40"/> */}
                          </div>
                          <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                            {chat.message}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex-grow-0 py-3 px-4 border-top">
                  <div>
                    <form
                      className="input-group"
                      onSubmit={(event) => handleSubmit(event)}
                    >
                      <input
                        type="text"
                        name="message"
                        value={message}
                        className="form-control"
                        placeholder="Type your message"
                        onChange={(event) => handleChange(event)}
                        autoComplete="off"
                      />

                      <button
                        type="submit"
                        href="#"
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                          marginLeft: "0.5em",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="blue"
                          className="bi bi-send-fill"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89.471-1.178-1.178.471L5.93 9.363l.338.215a.5.5 0 0 1 .154.154l.215.338 7.494-7.494Z"
                          />
                        </svg>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default ChatRoomUI;
