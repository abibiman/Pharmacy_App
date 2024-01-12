
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

// hooks

// routes
import { paths } from 'src/routes/paths';
// locales
import { useLocales } from 'src/locales';


// ----------------------------------------------------------------------

export default function NavUpgrade() {

  const { t } = useLocales();

  return (
    <Stack
      sx={{
        px: 2,
        py: 5,
        textAlign: 'center',
      }}
    >
      <Stack alignItems="center">
        <Button variant="contained" href={paths.minimalUI} target="_blank" rel="noopener">
          {t('Live Chat')}
        </Button>
      </Stack>
    </Stack>
  );
}
