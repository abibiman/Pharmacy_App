import PropTypes from 'prop-types';
import { sub } from 'date-fns';
import { useRef, useState, useCallback, useMemo, useContext } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
// routes
import { AuthContext } from 'src/auth/context/jwt';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';
// utils
import uuidv4 from 'src/utils/uuidv4';
// api
import { sendMessage, createConversation } from 'src/api/chat';
// components
import Iconify from 'src/components/iconify';
import customAxios from 'src/utils/customAxios';

// ----------------------------------------------------------------------

export default function ChatMessageInput({
  recipients,
  onAddRecipients,
  //
  disabled,
  selectedConversationId,
  messages,
  setMessages,
  setTyping,
  setErrorMsg,
}) {
  const router = useRouter();

  // const { user } = useMockedUser();

  const fileRef = useRef(null);

  const { user } = useContext(AuthContext);

  const [message, setMessage] = useState('');

  const myContact = useMemo(
    () => ({
      id: user.id,
      role: user.role,
      email: user.email,
      address: user.address,
      name: user.displayName,
      lastActivity: new Date(),
      avatarUrl: user.photoURL,
      phoneNumber: user.phoneNumber,
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

  const handleChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  // const handleSendMessage = useCallback(
  //   async (event) => {
  //     try {
  //       if (event.key === 'Enter') {
  //         if (message) {
  //           if (selectedConversationId) {
  //             await sendMessage(selectedConversationId, messageData);
  //           } else {
  //             const res = await createConversation(conversationData);

  //             router.push(`${paths.dashboard.chat}?id=${res.conversation.id}`);

  //             onAddRecipients([]);
  //           }
  //         }
  //         setMessage('');
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   },
  //   [conversationData, message, messageData, onAddRecipients, router, selectedConversationId]
  // );

  const handleSendMessage = async () => {
    if (message) {
      const newMessages = [...messages, { content: message, role: 'user' }];
      setMessages(newMessages);

      setTyping(true);
      setMessage('');
      await processChatMessage(newMessages);
    }
  };

  const processChatMessage = async (messageArray) => {
    try {
      const { data } = await customAxios.post(
        '/features/ai-chat',

        // chat: message,
        { messages: [...messageArray] },
        // userID:

        {
          headers: {
            Authorization: `Basic ${user?.token}`,
          },
        }
      );

      if (data) {
        setTyping(false);
        setErrorMsg(false);
        setMessages([...messageArray, { content: data?.content, role: data?.role }]);
      }
    } catch (error) {
      setTyping(false);
      setErrorMsg(true);
      console.log(error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
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
        multiline
        endAdornment={
          <Stack direction="row" sx={{ flexShrink: 0 }}>
            <IconButton onClick={handleSendMessage}>
              <Iconify icon="majesticons:send" />
            </IconButton>
          </Stack>
        }
        sx={{
          px: 1,
          height: 'auto',
          flexShrink: 0,
          border: (theme) => `solid 1px ${theme.palette.divider}`,
          borderRadius: '10px',
          width: '50%',
          marginBottom: '25px',
          '@media (min-width:769px) and (max-width:1024px )': {
            width: '70%',
          },
          '@media (max-width:768px )': {
            width: '95%',
          },
        }}
      />

      <input type="file" ref={fileRef} style={{ display: 'none' }} />
    </>
  );
}

ChatMessageInput.propTypes = {
  disabled: PropTypes.bool,
  onAddRecipients: PropTypes.func,
  recipients: PropTypes.array,
  selectedConversationId: PropTypes.string,
  setMessages: PropTypes.func,
  messages: PropTypes.array,
  setTyping: PropTypes.func,
  setErrorMsg: PropTypes.func,
};
