import { m } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
// @mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// components
import { CardContent, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router';
// utils
import customAxios from 'src/utils/customAxios';
import { MotionViewport, varFade } from 'src/components/animate';
import Iconify from 'src/components/iconify/iconify';
import CarouselAnimation from '../_examples/extra/carousel-view/carousel-animation';
import ComponentBlock from '../_examples/component-block';
import { useSnackbar } from '../../components/snackbar/index';
// ----------------------------------------------------------------------

function TimeBlock({ value }) {
  return (
    <Stack direction="column" spacing={1} alignItems="center">
      <Typography variant="h4" sx={{ color: 'text.primary' }}>
        There are {value} on the waitlist.
      </Typography>
    </Stack>
  );
}

const faqs = [
  {
    id: 1,
    question: 'What is the purpose of the waitlist?',
    answer:
      'The waitlist gives users early access to our telehealth platform. Once reviewed and approved, users will receive an ID, password, and access to our health monitoring devices.',
  },
  {
    id: 2,
    question: 'How do I join the waitlist?',
    answer:
      "To join the waitlist, simply provide the required personal information and submit the form on our 'Waitlist' page. You will be notified via email once you are selected.",
  },
  {
    id: 3,
    question: 'Is there a fee to join the telehealth platform?',
    answer:
      'Yes, upon successful review, users will be asked to pay a one-time fee of $200. This fee covers the cost of health test devices that will be shipped to you.',
  },
  {
    id: 5,
    question: 'How do I connect my health devices to the mobile app?',
    answer:
      'Once you receive the health devices, you can easily connect them to our mobile app following the step-by-step instructions provided in the user manual.',
  },
  {
    id: 6,
    question: 'Is my personal information safe?',
    answer:
      'Absolutely. We prioritize the privacy and security of our users. All personal information and health data are encrypted and securely stored. We adhere to strict data protection standards.',
  },
  {
    id: 7,
    question: 'How soon can I access the platform after joining the waitlist?',
    answer:
      "The wait time varies depending on the number of sign-ups. However, once you've been reviewed and approved, you'll receive an email with your login credentials and next steps.",
  },
  {
    id: 8,
    question: 'What if I need technical support or have questions about the devices?',
    answer:
      "Our dedicated support team is here to help! You can reach out to us through the 'Contact' section on our website, and we'll assist you as soon as possible.",
  },
  {
    id: 4,
    question: 'What health measuring devices are included with the telehealth platform?',
    answer:
      'Our telehealth platform provides users with state-of-the-art health monitoring devices like a blood pressure monitor, pulse oximeter, weighing scale and a blood sugar monitor',
  },
];

const slideData = [
  {
    id: 1,
    title: 'Join the waitlist',
    image: 'https://policylab.rutgers.edu/wp-content/uploads/2022/05/TelehealthChallenges.jpg',
    description: 'Get early access, join the waitlist',
  },
  {
    id: 2,
    title: 'Innovative Health Solutions',
    description:
      'Experience the future of healthcare. Our devices are designed for precision, comfort, and ease of use.',
    image:
      'https://staticeurobiz.europeanchamber.com.cn/wp-content/uploads/2017/12/New-Wave-of-healthcare-innovation-Smith-Nephew.png',
  },
  {
    id: 3,
    image: 'https://shccares.com/wp-content/uploads/2021/02/black-history-month-header.jpg',
    title: 'Connect with Professionals',
    description:
      'Our platform connects you to top medical professionals. Get the care you deserve, right from your home.',
  },
  {
    id: 4,
    image:
      'https://img.freepik.com/premium-photo/young-black-people-having-fun-looking-camera-main-focus-african-woman-face_166273-1790.jpg',
    title: 'Your Health, Our Priority',
    description:
      'We prioritize your health and well-being. With real-time monitoring and instant feedback, stay on top of your health.',
  },
];

export default function WaitlistView() {
  const [value, setValue] = useState(new Date());
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = async () => {
    const formData = {
      firstName,
      lastName,
      phoneNumber,
      email,
      address,
      date: value,
    };

    customAxios
      .post(`/waitlist`, formData)
      .then((res) => {
        console.log(res.data);
        enqueueSnackbar('You have been added to the waitlist!', {
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
        });
        navigate('/');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const _carouselsExample = slideData.map((item) => ({
    id: item.id,
    title: item.title,
    coverUrl: item.image,
    description: item.description,
  }));

  const _accordions = faqs.map((index) => ({
    id: index.id,
    value: `panel${index.id + 1}`,
    heading: index.question,
    subHeading: index.question,
    detail: index.answer,
  }));

  const TARGET_COUNT = 278;
  const [waitlistCount, setWaitlistCount] = useState(0);

  useEffect(() => {
    const incrementValue = () => {
      if (waitlistCount < TARGET_COUNT * 0.75) {
        return 5;
      }
      if (waitlistCount < TARGET_COUNT) {
        return 1;
      }
      return 0;
    };

    const interval = setInterval(() => {
      setWaitlistCount((prevCount) => prevCount + incrementValue());
    }, 50);

    if (waitlistCount >= TARGET_COUNT) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [waitlistCount]);

  return (
    <Container>
      <br />
      <CardContent>
        <CarouselAnimation data={_carouselsExample} />
      </CardContent>
      <br />

      <Typography variant="h3" textAlign="center">
        Frequently Asked Questions <br />
      </Typography>

      <Stack spacing={10}>
        <ComponentBlock title="" spacing={6}>
          {_accordions.map((accordion) => (
            <Accordion key={accordion.id}>
              <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                <Typography variant="h6">{accordion.heading}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{accordion.detail}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </ComponentBlock>
      </Stack>

      <br />
      <br />

      <Stack component={MotionViewport} spacing={5} alignItems="center" justifyContent="center">
        <m.div variants={varFade().inUp}>
          <Typography variant="h3" textAlign="center">
            Join the Waitlist <br />
            <TimeBlock value={waitlistCount.toString()} />
          </Typography>
        </m.div>

        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              <m.div variants={varFade().inUp}>
                <TextField
                  fullWidth
                  label="First Name"
                  variant="outlined"
                  sx={{ fontWeight: 500, '& input': { fontWeight: 500 } }}
                  name="firstName"
                  value={firstName}
                  onChange={handleFirstName}
                  required
                />
              </m.div>

              <m.div variants={varFade().inUp}>
                <TextField
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  name="lastName"
                  value={lastName}
                  required
                  onChange={handleLastName}
                  sx={{ fontWeight: 500, '& input': { fontWeight: 500 } }}
                />
              </m.div>

              <m.div variants={varFade().inUp}>
                <DesktopDatePicker
                  label="Date Of Birth"
                  value={value}
                  minDate={new Date('1900-01-01')}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      margin: 'normal',
                    },
                  }}
                />
              </m.div>

              <m.div variants={varFade().inUp}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  sx={{ fontWeight: 500, '& input': { fontWeight: 500 } }}
                  value={email}
                  onChange={handleEmail}
                  required
                />
              </m.div>

              <m.div variants={varFade().inUp}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  variant="outlined"
                  name="lastName"
                  value={phoneNumber}
                  required
                  onChange={handlePhoneNumber}
                  sx={{ fontWeight: 500, '& input': { fontWeight: 500 } }}
                />
              </m.div>

              <m.div variants={varFade().inUp}>
                <TextField
                  fullWidth
                  label="Address"
                  variant="outlined"
                  name="lastName"
                  required
                  value={address}
                  onChange={handleAddress}
                  sx={{ fontWeight: 500, '& input': { fontWeight: 500 } }}
                />
              </m.div>

              <Grid container justifyContent="center">
                <Grid container justifyContent="center">
                  <m.div variants={varFade().inUp}>
                    <Button type="submit" size="large" variant="contained" onClick={handleSubmit}>
                      Join Now
                    </Button>
                  </m.div>
                </Grid>
              </Grid>
              <br />
              <br />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}

TimeBlock.propTypes = {
  value: PropTypes.string,
};
