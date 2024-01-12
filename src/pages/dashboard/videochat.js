import React from 'react';
import { Helmet } from 'react-helmet-async';
import { VideoChatView } from 'src/sections/videochat/view';

// ----------------------------------------------------------------------

export default function VideoChatPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Chat</title>
      </Helmet>

      <VideoChatView />
    </>
  );
}
