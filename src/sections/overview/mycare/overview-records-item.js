import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
// components
// ----------------------------------------------------------------------

export default function OverviewRecordsItem({ title, subheader, Illustration, link }) {
  return (
    <Link to={`/dashboard/my-care/${link}`} style={{ textDecoration: 'none' }}>
    <Card
      sx={{
        mb: 3,
        height: 'auto',
        minHeight: '300px',
        display: 'flex',
        '@media (1200px <= width <= 1400px)': {
          minHeight: '300px',
        },
        '@media (max-width: 700px)': {
          flexDirection: 'column',

          minHeight: '400px',
        },
        position: 'relative',
        color: 'inherit',
      }}
    >
      <CardHeader
        title={title}
        subheader={subheader}
        sx={{
          color: 'black',
          alignItems: 'flex-start !important',
          zIndex: 2,
          // maxWidth: '50%',
          '@media (800px <= width <= 1300px)': {
            maxWidth: '50%',
          },

          '@media (min-width: 1750px)': {
            maxWidth: '50%',
          },
        }}
      />

      <Box
        sx={{
          p: 3,
          pb: 1,
          width: 1,
          height: '100%',
          display: 'flex',
          justifyContent: 'center',

          '@media (800px <= width <= 1300px)': {
            position: 'absolute',
            top: 0,
            right: '0px',
            justifyContent: 'normal',
            width: '50%',
          },

          '@media (min-width: 1750px)': {
            position: 'absolute',
            top: 0,
            right: '0px',
            justifyContent: 'normal',
            width: '50%',
          },
        }}
      >
        <img src={Illustration} alt="illustration" />
      </Box>
    </Card>
  </Link>
  );
}

OverviewRecordsItem.propTypes = {
  subheader: PropTypes.string,
  title: PropTypes.string,
  Illustration: PropTypes.string,
  link: PropTypes.string,
};
