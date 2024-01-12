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
    <Link to={`/dashboard/my-care/${link}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card
        sx={{
          mb: 3,
          height: '300px',
          display: 'flex',
          flexDirection: 'column-reverse',

          // '@media (1200px <= width <= 1400px)': {
          //   height: '300px',
          // },
          '@media (max-width: 700px)': {
            height: 'auto',
          },
          position: 'relative',
          color: 'inherit',
        }}
      >
        <CardHeader
          title={title}
          subheader={subheader}
          sx={{
            textAlign: 'center',
            margin: '25px',
            // alignItems: 'flex-start !important',
            zIndex: 2,
            // maxWidth: '50%',
            '@media (max-width:390px )': {
              padding: '24px 0',
            },

            // '@media (min-width: 1750px)': {
            //   maxWidth: '50%',
            // },
          }}
        />

        <Box
          sx={{
            p: 3,
            pb: 1,
            // width: 1,
            // height: '100%',
            display: 'flex',
            justifyContent: 'center',

            alignItems: 'center',
            width: 1,
            height: 'auto',

            // '@media (800px <= width <= 1300px)': {
            //   position: 'absolute',
            //   top: 0,
            //   right: '0px',
            //   justifyContent: 'normal',
            //   width: '50%',
            // },

            // '@media (min-width: 1750px)': {
            //   position: 'absolute',
            //   top: 0,
            //   right: '0px',
            //   justifyContent: 'normal',
            //   width: '50%',
            // },
          }}
        >
          <img
            src={Illustration}
            alt="illustration"
            style={{
              height: '150px',
              width: '150px',

              border: 'none',
              borderRadius: '70px',
              boxShadow:
                'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 30px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
            }}
          />
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
