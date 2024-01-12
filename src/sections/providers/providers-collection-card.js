import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

// utils
// _mock
import { _socials } from 'src/_mock';
// assets
import { AvatarShape } from 'src/assets/illustrations';
// components
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ProvidersCollectionCard({ provider }) {
  const { firstName, lastName, specialization, photo, providerID } = provider;
  // console.log(provider);

  const name = `${firstName} ${lastName}`;

  return (
    <Link to={`/dashboard/providers/specialist/${providerID}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ textAlign: 'center', height: '250px' }}>
        {' '}
        {/* Assuming you have a route like /user/username */}
        <Avatar
          alt={name}
          src={photo}
          sx={{
            width: 120,
            height: 120,
            zIndex: 11,
            left: 0,
            right: 0,
            mx: 'auto',
            mt: 2,
            border: '3px solid transparent',
            borderRadius: '50%',
            position: 'relative',

            '.css-1pqm26d-MuiAvatar-img': {
              padding: '10px',
              borderRadius: '50%',
            },

            '&::before': {
              content: '""',
              borderRadius: '100%',
              display: 'block',
              position: 'absolute',
              top: '0px',
              left: 0,
              zIndex: 99,
              height: '100%',
              width: '100%',
              background: 'conic-gradient(from 90deg, #5287db, #05369f 50%, transparent 50%)',
              WebkitMask:
                'radial-gradient(farthest-side, transparent calc(100% - 5px), #fff calc(100% - 5px + 1px))',
              mask: 'radial-gradient(farthest-side, transparent calc(100% - 5px), #fff calc(100% - 5px + 1px))',
            },
          }}
        />
        <ListItemText
          sx={{ mt: 4, mb: 1 }}
          primary={name}
          secondary={specialization}
          primaryTypographyProps={{ typography: 'subtitle1', color: 'textPrimary' }}
          secondaryTypographyProps={{ component: 'span', mt: 0.5, color: 'textSecondary' }}
        />
        <Box sx={{ position: 'relative' }}>
          <AvatarShape
            sx={{
              left: 0,
              right: 0,
              zIndex: 10,
              mx: 'auto',
              bottom: 56,
              position: 'absolute',
            }}
          />
        </Box>
        {/* <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mb: 2.5 }}>
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
        </Stack> */}
      </Card>
    </Link>
  );
}

ProvidersCollectionCard.propTypes = {
  provider: PropTypes.object,
};
