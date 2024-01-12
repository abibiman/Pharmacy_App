/* eslint-disable react/self-closing-comp */
import Stack from '@mui/material/Stack';

// ----------------------------------------------------------------------

export default function HospitalsView() {
  return (
    <Stack sx={{ height: '100vh' }}>
      <iframe
        title="Hospital Map"
        src="https://www.google.com/maps/d/u/0/embed?mid=13OT4xmRmpjPM_6xsflKsR5MIhh_l-ho&ehbc=2E312F"
        width="100%"
        height="100%"
      ></iframe>
    </Stack>
  );
}
