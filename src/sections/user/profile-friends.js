import PropTypes from 'prop-types';
import { useRef } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import InputBase from '@mui/material/InputBase';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
// _mock
import { _socials } from 'src/_mock';
// utils
import { fNumber } from 'src/utils/format-number';
// components
import Iconify from 'src/components/iconify';
//
import ProfilePostItem from './profile-post-item';

// ----------------------------------------------------------------------

export default function ProfileFriends({info, posts}) {
  const fileRef = useRef(null);


  const handleAttach = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const renderFollows = (
    <Card sx={{ py: 3, textAlign: 'center', typography: 'h4' }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
      >
        <Stack width={1}>
          {fNumber(info.yearsExperience)}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Years Of Experience
          </Box>
        </Stack>

        <Stack width={1}>
          {23}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Patients
          </Box>
        </Stack>
      </Stack>
    </Card>
  );

  const renderFollow = (
    <Card sx={{ py: 3, textAlign: 'center', typography: 'h4' }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
      >
        <Stack width={1}>
          {info.licenseNumber}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            License Number
          </Box>
        </Stack>

        <Stack width={1}>
          {info.operativeCountry}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Operative Country
          </Box>
        </Stack>
      </Stack>
    </Card>
  );

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
          {/* Subject Input */}
          <Box sx={{ width: '100%', mb: 2 }}>  {/* Added margin-bottom for spacing */}
            <InputBase 
              fullWidth
              placeholder="Subject"
              sx={{ 
                pl: 1, 
                py: 1, 
                border: '1px solid', 
                borderColor: 'divider',
                borderRadius: '4px'  // Rounded edges
              }}
            />
          </Box>
  
          {/* Message Input */}
          <Box sx={{ width: '100%', mb: 2 }}>  {/* Added margin-bottom for spacing */}
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
                borderRadius: '4px'  // Rounded edges
              }}
            />
          </Box>
  
          {/* Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>  {/* Centering the button */}
            <Button type="submit" variant="contained" color="primary">
              Send
            </Button>
          </Box>
        </form>
      </Stack>
    </Card>
  );
  
  

  const languages = (
    <Card>
    <CardHeader title="Work Hours" />

    <Stack spacing={6} sx={{ p: 3 }}>
    <Stack spacing={6} sx={{ p: 3 }}>
        <Stack direction="column" spacing={3}>
          {info.availableDays ? info.availableDays.map((item) => (
            <Box sx={{ display: 'flex', alignItems: 'center', typography: 'body2' }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'text.primary', mr: 2 }} /> {/* This is the bullet */}
              {item.day} : {item.hour}
            </Box>
          ))
          : <a>.</a>}
        </Stack>
      </Stack>
</Stack>

    
  </Card>
  );

  const renderPostInputs = (
    <Card>
    <CardHeader title="Awards" />

    <Stack spacing={6} sx={{ p: 3 }}>
        <Stack direction="column" spacing={3}>
          {info.awards ? info.awards.map((item) => (
            <Box sx={{ display: 'flex', alignItems: 'center', typography: 'body2' }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'text.primary', mr: 2 }} /> {/* This is the bullet */}
              {item}
            </Box>
          ))
          : <a>.</a>}
        </Stack>
      </Stack>

    
  </Card>
  );



  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={6}>
        <Stack spacing={3}>


          {renderAbout}
          {languages}


        </Stack>
      </Grid>

      <Grid xs={12} md={6}>
        <Stack spacing={3}>


          {renderPostInput}
  

        </Stack>
      </Grid>
    </Grid>
  );
}

ProfileFriends.propTypes = {
  info: PropTypes.object,
  posts: PropTypes.array,
};
