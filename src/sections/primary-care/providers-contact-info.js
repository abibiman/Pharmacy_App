import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
// _mock
// components

import { Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
//
// ----------------------------------------------------------------------

export default function ProfileContactInfo({ info, hours }) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  const renderAbout = (
    <Card>
      <CardHeader title="About Me" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row" spacing={2}>
          <Iconify icon="mingcute:location-fill" width={24} />

          <Box sx={{ typography: 'body2' }}>
            {` `}
            <Link variant="subtitle2" color="inherit">
              Greenfield Estate, 1M6A
            </Link>
          </Box>
        </Stack>

        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="fluent:mail-24-filled" width={24} sx={{ mr: 2 }} />
          {info.email}
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="ic:phone" width={24} />

          <Box sx={{ typography: 'body2' }}>
            <Link variant="subtitle2" color="inherit">
              {info.phoneNumber}
            </Link>
          </Box>
        </Stack>
      </Stack>
    </Card>
  );

  const renderPostInput = (
    <Card>
      <CardHeader title={`Send ${info.title} ${info.lastName} A Message`} />

      <Stack spacing={6} sx={{ p: 3 }}>
        <form>
          <Box sx={{ width: '100%', mb: 2 }}>
            <InputBase
              fullWidth
              placeholder="Subject"
              sx={{
                pl: 1,
                py: 1,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '4px', // Rounded edges
              }}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </Box>

          <Box sx={{ width: '100%', mb: 2 }}>
            <InputBase
              fullWidth
              multiline
              rows={4}
              placeholder="Message"
              sx={{
                pl: 1,
                py: 1,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '4px', // Rounded edges
              }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" variant="contained" color="primary">
              Send
            </Button>
          </Box>
        </form>
      </Stack>
    </Card>
  );

  const sessionsByDay = Object.keys(hours).map((day) => {
    const sessions = hours[day];
    const sessionObject = { availableDay: day, availableSessions: sessions };
    return sessionObject;
  });

  const languages = (
    <Card>
      <CardHeader title="Work Hours" />

      <Stack spacing={6} sx={{ p: 3 }}>
        <Stack spacing={6} sx={{ p: 3 }}>
          <Stack direction="column" spacing={3}>
            {sessionsByDay ? (
              sessionsByDay.map((item) => (
                <Box sx={{ display: 'flex', alignItems: 'center', typography: 'body2' }}>
                  {item.availableSessions.length === 0 ? (
                    ''
                  ) : (
                    <>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: 'text.primary',
                          mr: 2,
                        }}
                      />
                      {item.availableDay}:
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: '10px',
                          marginLeft: '5px',
                        }}
                      >
                        {item.availableSessions.map((session) => {
                          const time = `${session.startTime} - ${session.endTime}`;
                          return <Typography sx={{ fontSize: '14px' }}>{time}</Typography>;
                        })}
                      </Box>
                    </>
                  )}
                </Box>
              ))
            ) : (
              <a>.</a>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={6}>
        <Stack spacing={3}>{renderAbout}</Stack>
      </Grid>

      <Grid xs={12} md={6}>
        {languages}
        {/* <Stack spacing={3}>{renderPostInput}</Stack> */}
      </Grid>
    </Grid>
  );
}

ProfileContactInfo.propTypes = {
  info: PropTypes.object,
  hours: PropTypes.object,
};
