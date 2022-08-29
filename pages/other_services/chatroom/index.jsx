import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import NavBar from "../../../component/navbar";
import ChatRoom from "../../../component/otherPage/chatRoom/chatRoom";

const ChatroomInterface = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Chat room</title>
        <meta
          property="og:url"
          content="https://tw-yk.com/other_service/chatroom"
        />
        <meta property="og:locale" content="zh_TW" />
        <meta
          property="og:description"
          content="Wellcome! this is a public chat room, wish you meet interesting people and have fun here!"
        />
        <meta property="og:title" content="Chat room" />
        <meta property="og:type" content="website" />
        <meta property="fb:admins" content="153906327962277" />
        <meta property="og:image" content="https://tw-yk.com/pi512.png" />
        <link rel="icon" href="/chat.ico" type="image/x-icon" />
        <script src="https://kit.fontawesome.com/a076d05399.js" async />
      </Helmet>
      <NavBar />
      <ChatRoom />
    </HelmetProvider>
  );
};

export default ChatroomInterface;
