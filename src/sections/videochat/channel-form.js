import PropTypes from 'prop-types';

// @mui
import Button from '@mui/material/Button';

// import { MenuItem, Select } from '@mui/base';

import FormControl from '@mui/material/FormControl';

//
import { InputLabel } from '@mui/material';
import { Input } from '@mui/base';

export default function ChannelForm({ inCall, setInCall, setChannelName }) {
  return (
    <FormControl>
      <InputLabel htmlFor="my-input">Join through the channel</InputLabel>
      <Input id="my-input" aria-describedby="my-helper-text" />
      <Button>Join</Button>
    </FormControl>
  );
}

ChannelForm.propTypes = {
  inCall: PropTypes.bool,
  setInCall: PropTypes.func,
  setChannelName: PropTypes.func,
};
