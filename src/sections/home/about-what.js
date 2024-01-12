import { m } from 'framer-motion';
// @mui
import { alpha, useTheme } from '@mui/material/styles';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// utils

// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

export const SKILLS = [...Array(3)].map((_, index) => ({
  label: ['Development', 'Design', 'Marketing'][index],
  value: [20, 40, 60][index],
}));

// ----------------------------------------------------------------------

export default function AboutWhat() {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const isLight = theme.palette.mode === 'light';

  const shadow = `-40px 40px 80px ${alpha(
    isLight ? theme.palette.grey[500] : theme.palette.common.black,
    0.24
  )}`;

  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 10, md: 15 },
        textAlign: { xs: 'center', md: 'unset' },
      }}
    >
      <Grid container columnSpacing={{ md: 3 }} alignItems="flex-start">
        {mdUp && (
          <Grid container xs={12} md={6} lg={7} alignItems="center" sx={{ pr: { md: 7 } }}>
            <Grid xs={6}>
              <m.div variants={varFade().inUp}>
                <Image
                  alt="our office 2"
                  src="https://healthcity.bmc.org/sites/default/files/HealthCity/Telehealth-main.png"
                  ratio="1/1"
                  sx={{ borderRadius: 3, boxShadow: shadow }}
                />
              </m.div>
            </Grid>

            <Grid xs={6}>
              <m.div variants={varFade().inUp}>
                <Image
                  alt="our office 1"
                  src="https://media.istockphoto.com/id/493799919/photo/african-nurse-checking-senior-patients-blood-pressure.jpg?s=612x612&w=0&k=20&c=PJ39K0upchZDYGpuQerO-CZIiht1FnMgXWvK4d_BrYw="
                  ratio="3/4"
                  sx={{ borderRadius: 3, boxShadow: shadow }}
                />
              </m.div>
            </Grid>
          </Grid>
        )}

        <Grid xs={12} md={6} lg={5}>
          <m.div variants={varFade().inRight}>
            <Typography variant="h2" sx={{ mb: 3 }}>
              Who we are?
            </Typography>
          </m.div>

          <m.div variants={varFade().inRight}>
            <Typography
              sx={{
                color: theme.palette.mode === 'light' ? 'text.secondary' : 'common.white',
              }}
            >
              At Telical, we are revolutionizing the way you connect with healthcare professionals.
              Offering video consultations, we bridge the gap between you and esteemed doctors and
              health practitioners from the comfort of your own space. No more long waits at clinics
              or navigating through traffic; with just a few clicks, you can discuss your health
              concerns face-to-face, virtually. Our platform ensures you receive expert advice,
              personalized care, and the peace of mind that comes with speaking to a qualified
              medical expert. Embrace the future of healthcare, where convenience meets quality.
            </Typography>
          </m.div>
        </Grid>
      </Grid>
    </Container>
    // </Box>
  );
}
