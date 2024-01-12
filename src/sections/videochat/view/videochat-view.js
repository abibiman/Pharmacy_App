import { useState } from 'react';

import ChannelForm from '../channel-form';

// ----------------------------------------------------------------------

export default function VideoChatView() {
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState('');
  console.log(channelName);

  return (
    <div>
      <ChannelForm inCall={inCall} setInCall={setInCall} setChannelName={setChannelName} />
    </div>
  );
}
