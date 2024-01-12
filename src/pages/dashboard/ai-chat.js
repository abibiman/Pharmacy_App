import { Helmet } from 'react-helmet-async';
// sections
import { AIChatView } from 'src/sections/ai-chat/view';

// ----------------------------------------------------------------------

export default function AIChatPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: AI-Chat</title>
      </Helmet>

      <AIChatView />
    </>
  );
}
