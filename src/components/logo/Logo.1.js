import { forwardRef } from 'react';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------
export const Logo = forwardRef(() => {
  // using local (public folder)
  // -------------------------------------------------------
  const logo = (
    <Box
      component="img"
      // src="/logo/2.png"
      sx={{ width: 150, height: 150, cursor: 'pointer' }}
    />
  );

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});
