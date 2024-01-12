import { useEffect, useState, useCallback } from 'react';
// @mui
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Box } from '@mui/material';

// routes
import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hooks';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';
// api
import { useGetContacts, useGetConversation, useGetConversations } from 'src/api/chat';
// components
import { useSettingsContext } from 'src/components/settings';
//
import ChatNav from '../chat-nav';
import ChatRoom from '../chat-room';
import ChatMessageList from '../chat-message-list';
import ChatMessageInput from '../chat-message-input';
import ChatHeaderDetail from '../chat-header-detail';
import ChatHeaderCompose from '../chat-header-compose';
import AvatarImg from '../../../assets/images/okyeame.png';
import BgAlt from '../../../assets/images/bg-alt.png';

// import Background from '../../../assets/images/bg-alt.png';

// ----------------------------------------------------------------------

export default function AIChatView() {
  const { user } = useMockedUser();

  const settings = useSettingsContext();

  const searchParams = useSearchParams();

  const selectedConversationId = searchParams.get('id') || '';

  const [recipients, setRecipients] = useState([]);

  const { contacts } = useGetContacts();

  const { conversations, conversationsLoading } = useGetConversations();

  const { conversation, conversationError } = useGetConversation(`${selectedConversationId}`);

  const participants = conversation
    ? conversation.participants.filter((participant) => participant.id !== user.id)
    : [];

  // useEffect(() => {
  //   if (conversationError || !selectedConversationId) {
  //     router.push(paths.dashboard.chat);
  //   }
  // }, [conversationError, router, selectedConversationId]);

  const [messages, setMessages] = useState([
    {
      role: 'system',
      content:
        'You are a knowledgeable health-focused assistant, dedicated to providing information and guidance on various health-related topics. Please refrain from answering any questions that do not pertain to health and medical subjects.',
    },
  ]);
  const [typing, setTyping] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const handleAddRecipients = useCallback((selected) => {
    setRecipients(selected);
  }, []);

  const details = !!conversation;

  console.log(messages);

  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      flexShrink={0}
      sx={{ pr: 1, pl: 2.5, py: 1, minHeight: 72 }}
    >
      {selectedConversationId ? (
        <>{details && <ChatHeaderDetail participants={participants} />}</>
      ) : (
        <ChatHeaderCompose contacts={contacts} onAddRecipients={handleAddRecipients} />
      )}
    </Stack>
  );

  const renderNav = (
    <ChatNav
      contacts={contacts}
      conversations={conversations}
      loading={conversationsLoading}
      selectedConversationId={selectedConversationId}
    />
  );

  const renderMessages = (
    <Stack
      sx={{
        width: 1,
        height: 1,
        overflow: 'hidden',
      }}
    >
      <ChatMessageList messages={messages} participants={participants} typing={typing} />

      {typing && (
        <Typography
          variant="p"
          sx={{
            mb: { xs: 3, md: 5 },
            mt: '10px',
            pl: '24px',
          }}
        >
          ...Okyeame AI is typing
        </Typography>
      )}

      {errorMsg && (
        <Typography
          variant="p"
          sx={{
            mb: { xs: 3, md: 5 },
            mt: '10px',
            pl: '24px',
          }}
        >
          Error getting response from Telical AI
        </Typography>
      )}

      <Stack
        sx={{
          width: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ChatMessageInput
          recipients={recipients}
          onAddRecipients={handleAddRecipients}
          //
          selectedConversationId={selectedConversationId}
          disabled={!recipients.length && !selectedConversationId}
          setMessages={setMessages}
          messages={messages}
          setTyping={setTyping}
          setErrorMsg={setErrorMsg}
        />
      </Stack>
    </Stack>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box
        sx={{
          padding: '10px',
          textAlign: 'center',
          backgroundImage:
            'linear-gradient(to right top, #2065d1, #1a59c5, #134db8, #0c42ac, #05369f)',
          color: '#fff',
          width: '50%',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '10px 10px 0px 0px',
          // add media queries
          '@media (max-width:725px )': {
            width: '80%',
          },
        }}
      >
        <Avatar
          alt="Okyeame"
          src={AvatarImg}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            background: '#fff',
            mx: '5px',
            position: 'relative',
          }}
        />
        <Typography variant="h4" sx={{ fontWeight: '400', fontSize: '14px !important' }}>
          Chat with Okyeame AI
        </Typography>
      </Box>

      <Stack component={Card} direction="row" sx={{ height: '72vh' }}>
        {/* {renderNav} */}

        <Stack
          sx={{
            width: 1,
            height: 1,
            overflow: 'hidden',
          }}
        >
          {/* {renderHead} */}

          <Stack
            direction="row"
            sx={{
              width: 1,
              height: 1,
              overflow: 'hidden',
              borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
              backgroundColor: 'transparent',
              // background: `url(${BgAlt})`,
              // border: '1px solid #dbe3e1',
            }}
          >
            {renderMessages}

            {details && <ChatRoom conversation={conversation} participants={participants} />}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
