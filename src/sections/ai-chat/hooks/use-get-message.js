// ----------------------------------------------------------------------

export default function useGetMessage({ message, participants, currentUserId }) {
  // const sender = participants.find((participant) => participant.id === message.senderId) || '';

  const senderDetails =
    message.sender === 'user'
      ? {
          type: 'me',
        }
      : {
          type: 'bot',
        };

  const me = senderDetails.type === 'me';

  // const hasImage = message.contentType === 'image';

  return {
    me,
  };
}
