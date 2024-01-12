import { useEffect, useRef, useState } from 'react';

// firebase
import { query, collection, orderBy, onSnapshot, limit, doc } from 'firebase/firestore';
import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
// components
import Scrollbar from 'src/components/scrollbar';
import Lightbox, { useLightBox } from 'src/components/lightbox';
//
import { useMessagesScroll } from './hooks';
import ChatMessageItem from './chat-message-item';
import { db } from './firebase-config/config';

// ----------------------------------------------------------------------

export default function ChatMessageList({ messages = [], providerID, userID }) {
  const { messagesEndRef } = useMessagesScroll(messages);
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const conversationsRef = collection(db, 'conversations');

    const conversationDocRef = doc(conversationsRef, providerID);

    const messagesRef = collection(conversationDocRef, userID);

    const q = query(messagesRef, orderBy('createdAt', 'desc'), limit(50));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((queryDoc) => {
        fetchedMessages.push({ ...queryDoc.data(), id: queryDoc.id });
      });
      const sortedMessages = fetchedMessages.sort((a, b) => a.createdAt - b.createdAt);
      setChatMessages(sortedMessages);
    });
    return () => unsubscribe;
  }, [providerID, userID]);

  const slides = messages
    .filter((message) => message.contentType === 'image')
    .map((message) => ({ src: message.body }));

  const lightbox = useLightBox(slides);

  return (
    <>
      <Scrollbar ref={messagesEndRef} sx={{ px: 3, py: 5, height: 1 }}>
        <Box>
          {chatMessages.map((message) => (
            <ChatMessageItem
              key={message.id}
              message={message}
              onOpenLightbox={() => lightbox.onOpen(message.body)}
            />
          ))}
        </Box>
      </Scrollbar>

      <Lightbox
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
      />
    </>
  );
}

ChatMessageList.propTypes = {
  messages: PropTypes.array,
  providerID: PropTypes.string,
  userID: PropTypes.string,
};
