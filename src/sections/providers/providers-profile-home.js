import PropTypes from 'prop-types';
// @mui

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
// _mock
// utils
import { fNumber } from 'src/utils/format-number';
// components
import Iconify from 'src/components/iconify';
//

// ----------------------------------------------------------------------

export default function ProfileHome({ info, posts }) {

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
        <Box sx={{ typography: 'body2' }}>{info.description}</Box>

        <Stack direction="row" spacing={2}>
          <Iconify icon="mingcute:location-fill" width={24} />

          <Box sx={{ typography: 'body2' }}>
            {` `}
            <Link variant="subtitle2" color="inherit">
              Accra, Ghana
            </Link>
          </Box>
        </Stack>

        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="fluent:mail-24-filled" width={24} sx={{ mr: 2 }} />
          {info.email}
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="ic:round-business-center" width={24} />

          <Box sx={{ typography: 'body2' }}>
            {info.role} {`at `}
            <Link variant="subtitle2" color="inherit">
              {info.employer}
            </Link>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="ic:round-business-center" width={24} />

          <Box sx={{ typography: 'body2' }}>
            {`Studied at `}
            <Link variant="subtitle2" color="inherit">
              {info.medicalSchool ? info.medicalSchool[0] : 'N/a'}
            </Link>
          </Box>
        </Stack>
      </Stack>
    </Card>
  );

  const renderPostInput = (
    <Card>
      <CardHeader title="Certifications" />

      <Stack spacing={6} sx={{ p: 3 }}>
        <Stack spacing={6} sx={{ p: 3 }}>
          <Stack direction="column" spacing={3}>
            {info.boardCertifications ? (
              info.boardCertifications.map((item) => (
                <Box sx={{ display: 'flex', alignItems: 'center', typography: 'body2' }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: 'text.primary',
                      mr: 2,
                    }}
                  />{' '}
                  {/* This is the bullet */}
                  {item}
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
  const languages = (
    <Card>
      <CardHeader title="Languages Spoken" />

      <Stack spacing={6} sx={{ p: 3 }}>
        <Stack spacing={6} sx={{ p: 3 }}>
          <Stack direction="column" spacing={3}>
            {info.languages ? (
              info.languages.map((item) => (
                <Box sx={{ display: 'flex', alignItems: 'center', typography: 'body2' }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: 'text.primary',
                      mr: 2,
                    }}
                  />{' '}
                  {/* This is the bullet */}
                  {item}
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

  const renderPostInputs = (
    <Card>
      <CardHeader title="Awards" />

      <Stack spacing={6} sx={{ p: 3 }}>
        <Stack direction="column" spacing={3}>
          {info.awards ? (
            info.awards.map((item) => (
              <Box sx={{ display: 'flex', alignItems: 'center', typography: 'body2' }}>
                <Box
                  sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'text.primary', mr: 2 }}
                />{' '}
                {/* This is the bullet */}
                {item}
              </Box>
            ))
          ) : (
            <a>.</a>
          )}
        </Stack>
      </Stack>
    </Card>
  );

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={6}>
        <Stack spacing={3}>
          {renderFollows}

          {renderAbout}
          {languages}
        </Stack>
      </Grid>

      <Grid xs={12} md={6}>
        <Stack spacing={3}>
          {renderFollow}

          {renderPostInput}
          {renderPostInputs}
        </Stack>
      </Grid>
    </Grid>
  );
}

ProfileHome.propTypes = {
  info: PropTypes.object,
  posts: PropTypes.array,
};
