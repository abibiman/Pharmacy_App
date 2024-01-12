import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText';
// components
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import Image from 'src/components/image';
// ----------------------------------------------------------------------

export default function ProvidersItem({ provider }) {
  const { category } = provider;
  // console.log(provider);

  function toSentenceCase(str) {
    // Split the string by punctuation marks that typically end a sentence
    const sentences = str.split(/([.!?]+)/);

    // Capitalize the first letter of each sentence and join them back
    return sentences
      .map((sentence) => sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase())
      .join('');
  }

  return (
    <Link
      component={RouterLink}
      href={`/dashboard/providers/specialty/${provider.category}`}
      style={{ textDecoration: 'none' }}
    >
      <Card>
        <Stack sx={{ p: 3, pb: 2 }}>
          <Box sx={{ mb: 2 }}>
            <Image
              src={provider.imageUrl}
              alt={category}
              width={300}
              height={150}
              objectFit="cover"
              sx={{ borderRadius: '16px' }}
            />
          </Box>

          <ListItemText
            sx={{ mb: 1 }}
            primary={
              <Link
                component={RouterLink}
                href={`/dashboard/providers/specialty/${provider.category}`}
                color="inherit"
              >
                {toSentenceCase(provider.category)}
              </Link>
            }
            primaryTypographyProps={{
              typography: 'subtitle1',
            }}
            secondaryTypographyProps={{
              mt: 1,
              component: 'span',
              typography: 'caption',
              color: 'text.disabled',
            }}
          />

          <Stack
            spacing={0.5}
            direction="row"
            alignItems="center"
            sx={{ color: 'primary.main', typography: 'caption' }}
          >
            <Iconify width={16} icon="solar:users-group-rounded-bold" />
            {12} Listed
          </Stack>
        </Stack>
      </Card>
    </Link>
  );
}

ProvidersItem.propTypes = {
  provider: PropTypes.object,
};
