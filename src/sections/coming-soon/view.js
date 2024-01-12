import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// @mui
import { alpha } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// _mock
import { _socials } from 'src/_mock';
// assets
import { ComingSoonIllustration } from 'src/assets/illustrations';
// components
import Iconify from 'src/components/iconify';

export default function ComingSoonView() {
  
  const TARGET_COUNT = 278;
  const [waitlistCount, setWaitlistCount] = useState(0);
  
  useEffect(() => {
    const incrementValue = () => {
      if (waitlistCount < TARGET_COUNT * 0.75) {
        return 5;
      } if (waitlistCount < TARGET_COUNT) {
        return 1;
      } 
        return 0;
      
    };
    
    const interval = setInterval(() => {
      setWaitlistCount(prevCount => prevCount + incrementValue());
    }, 50);

    if (waitlistCount >= TARGET_COUNT) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [waitlistCount]);

  return (
    <>
      <Typography variant="h3" sx={{ mb: 2, textAlign: 'center' }}>
        Join The Waitlist
      </Typography>
      <TimeBlock value={waitlistCount.toString()} />

      <ComingSoonIllustration sx={{ my: 10, height: 240 }} />



      <Stack spacing={2} direction="column">
        <TextField label="First Name" fullWidth />
        <TextField label="Last Name" fullWidth />
        <TextField label="Age" fullWidth type="number" />
        <TextField label="Gender" fullWidth select>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </TextField>
        <TextField label="Email" fullWidth type="email" />
        <TextField label="Phone Number" fullWidth />
        <TextField label="Address" fullWidth multiline rows={3} />
        <Button variant="contained" size="large">
          Join
        </Button>
      </Stack>

      <Stack spacing={1} alignItems="center" justifyContent="center" direction="row" sx={{ mt: 5 }}>
        {_socials.map((social) => (
          <IconButton
            key={social.name}
            sx={{
              color: social.color,
              '&:hover': {
                bgcolor: alpha(social.color, 0.08),
              },
            }}
          >
            <Iconify icon={social.icon} />
          </IconButton>
        ))}
      </Stack>
    </>
  );
}

function TimeBlock({ value }) {
  return (
    <Stack direction="column" spacing={1} alignItems="center">
      <Typography variant="h4" sx={{ color: 'text.primary' }}>
        There are {value} on the waitlist.
      </Typography>
    </Stack>
  );
}

TimeBlock.propTypes = {
  value: PropTypes.string,
};
