import PropTypes from 'prop-types';
import { sub } from 'date-fns';
import { useRef, useState, useCallback, useMemo, useContext } from 'react';
import { addDoc, collection, doc } from 'firebase/firestore';
// @mui
import Stack from '@mui/material/Stack';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';

// routes

import { useRouter } from 'src/routes/hooks';
import { AuthContext } from 'src/auth/context/jwt';

// utils
import uuidv4 from 'src/utils/uuidv4';

// components
import Iconify from 'src/components/iconify';
import { db } from './firebase-config/config';

// ----------------------------------------------------------------------

export default function ChatMessageInput({
  recipients,
  providerID,
  userID,
  onAddRecipients,
  //
  // disabled,
  selectedConversationId,
}) {
  const router = useRouter();

  // const { user } = useMockedUser();

  const fileRef = useRef(null);

  const [message, setMessage] = useState('');

  const { user } = useContext(AuthContext) || {};

  const myContact = useMemo(
    () => ({
      id: user?.UserID || '',
      role: 'user',
      email: user?.email || '',
      address: user.address?.Country || '',
      name: `${user?.lastName || ''} ${user?.firstName || ''}`,
      lastActivity: new Date(),
      avatarUrl: user?.photo || '',
      phoneNumber: user?.phoneNumber || '',
      status: 'online',
    }),
    [user]
  );

  const messageData = useMemo(
    () => ({
      id: uuidv4(),
      attachments: [],
      body: message,
      contentType: 'text',
      createdAt: sub(new Date(), { minutes: 1 }),
      senderId: myContact.id,
    }),
    [message, myContact.id]
  );

  const conversationData = useMemo(
    () => ({
      id: uuidv4(),
      messages: [messageData],
      participants: [...recipients, myContact],
      type: recipients.length > 1 ? 'GROUP' : 'ONE_TO_ONE',
      unreadCount: 0,
    }),
    [messageData, myContact, recipients]
  );

  const handleAttach = useCallback(() => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }, []);

  const handleChangeMessage = useCallback((event) => {
    setMessage(event.target.value);
  }, []);

  const handleSendMessage = async () => {
    const singleMessage = {
      senderId: user?.userID || '',
      role: 'user',
      email: user?.email || '',
      address: user.address?.Country || '',
      name: `${user.lastName || ''} ${user.firstName || ''}`,
      createdAt: sub(new Date(), { minutes: 1 }),
      avatarUrl: user?.photo || '',
      phoneNumber: user?.phoneNumber || '',
      status: 'online',
    };

    if (message) {
      setMessage('');
      try {
        const conversationsRef = collection(db, 'conversations');

        const conversationDocRef = doc(conversationsRef, providerID);

        const messagesRef = collection(conversationDocRef, userID);

        await addDoc(messagesRef, {
          text: message,
          ...singleMessage,
        });
      } catch (error) {
        console.log(error);
      }
    }
    // }
  };

  const handleKeyDown = (event) => {
    event.preventDefault();
    if (event.key === 'Enter' && !event.shiftKey) {
      handleSendMessage();
    }
  };

  return (
    <>
      <InputBase
        value={message}
        onKeyUp={handleKeyDown}
        onChange={handleChangeMessage}
        placeholder="Type a message"
        // disabled={disabled}
        startAdornment={
          <IconButton>
            <Iconify icon="eva:smiling-face-fill" />
          </IconButton>
        }
        endAdornment={
          <Stack direction="row" sx={{ flexShrink: 0 }}>
            <IconButton onClick={handleAttach}>
              <Iconify icon="solar:gallery-add-bold" />
            </IconButton>
            <IconButton onClick={handleAttach}>
              <Iconify icon="eva:attach-2-fill" />
            </IconButton>
            <IconButton onClick={handleSendMessage}>
              <Iconify icon="majesticons:send" />
            </IconButton>
            {/* <IconButton>
              <Iconify icon="solar:microphone-bold" />
            </IconButton> */}
          </Stack>
        }
        sx={{
          px: 1,
          height: 56,
          flexShrink: 0,
          borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      />

      <input type="file" ref={fileRef} style={{ display: 'none' }} />
    </>
  );
}

ChatMessageInput.propTypes = {
  // disabled: PropTypes.bool,
  onAddRecipients: PropTypes.func,
  recipients: PropTypes.array,
  selectedConversationId: PropTypes.string,
  providerID: PropTypes.string,
  userID: PropTypes.string,
};
