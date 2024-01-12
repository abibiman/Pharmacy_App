import { useState } from 'react';
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
import ProviderSelectionPopup from './view/provider-selection-popup';

// ----------------------------------------------------------------------

export default function PrimaryCareListCard({ provider }) {
  const { firstName, lastName, specialization, photo, providerID } = provider;
  const [openDialogBox, setOpenDialogBox] = useState(false);

  const name = `${firstName} ${lastName}`;

  return (
    <>
      <Card sx={{ textAlign: 'center', position: 'relative' }}>
        {' '}
        {/* <Iconify
          icon="zondicons:add-solid"
          sx={{
            position: 'absolute',
            right: '5%',
            top: '5%',
            boxShadow: ' rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
            cursor: 'pointer',
          }}
          onClick={() => setOpenDialogBox(true)}
        /> */}
        <Link
          to={`/dashboard/primary-care/profile/${providerID}`}
          style={{ textDecoration: 'none' }}
        >
          <Avatar
            alt={name}
            src={photo}
            sx={{
              width: 64,
              height: 64,
              zIndex: 11,
              left: 0,
              right: 0,
              mx: 'auto',
              mt: 2,
              position: 'relative',
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
        </Link>
      </Card>
      <ProviderSelectionPopup
        data={provider}
        open={openDialogBox}
        close={() => setOpenDialogBox(false)}
      />
    </>
  );
}

PrimaryCareListCard.propTypes = {
  provider: PropTypes.object,
};
