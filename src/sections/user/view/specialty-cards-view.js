// @mui
import Container from '@mui/material/Container';
// routes
import { useParams } from 'react-router-dom';
import { paths } from 'src/routes/paths';
// _mock
import { _providersCards } from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import SpecialtyCardList from '../specialty-card-list';

// ----------------------------------------------------------------------

export default function SpecialtyCardView() {
  const { name } = useParams();
  const settings = useSettingsContext();

  function toSentenceCase(str) {
    // Split the string by punctuation marks that typically end a sentence
    const sentences = str.split(/([.!?]+)/);

    // Capitalize the first letter of each sentence and join them back
    return sentences
      .map((sentence) => sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase())
      .join('');
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={`Providers: ${toSentenceCase(name)}`}
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Providers', href: paths.dashboard.providers.root },
          { name: `${toSentenceCase(name)}` },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <SpecialtyCardList providers={_providersCards} name={name} />
    </Container>
  );
}
