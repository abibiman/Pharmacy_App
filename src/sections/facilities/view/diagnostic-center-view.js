/* eslint-disable react/self-closing-comp */
// ----------------------------------------------------------------------
import Stack from '@mui/material/Stack';

export default function DiagnosticView() {
  return (
    <Stack sx={{ height: '100vh' }}>
      <iframe
        title="Pharmacies Map"
        src="https://www.google.com/maps/d/u/0/embed?mid=11VnRLhJFUb2Wk7iFZjG70TZEjvBjcS0&ehbc=2E312F"
        width="100%"
        height="100%"
      ></iframe>
    </Stack>
  );
}
