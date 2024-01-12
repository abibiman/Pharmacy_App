import axios from 'axios';

export const fetchProviderData = async (token, providerID) => {
  // loadingFunc(true);
  try {
    const response = await axios.get(`https://abibiman-api.onrender.com/providers/${providerID}`, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });

    return response.data.data;
  } catch (err) {
    console.log(err);
  }

  return null;
};

export const fetchProvidersHoursFunc = async (hoursFunc, finalTimeArrayFunc, token, providerID) => {
  try {
    const { data: hoursData } = await axios.get(
      // `https://abibiman-api.onrender.com/providerschedules/${providerID}`,
      `https://abibiman-api.onrender.com/providerschedules/PAC-58965t9`,

      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      }
    );
    hoursFunc(hoursData.data);
    const availableTime = hoursData.data;
    const sessionsByDay = Object.keys(availableTime).map((day) => {
      const sessions = availableTime[day];
      const sessionObject = { availableDay: day, availableSessions: sessions };
      return sessionObject;
    });
    let sessionTimeArray = [];

    sessionsByDay.map((session) => {
      const sessionTime = session.availableSessions;
      sessionTimeArray = [...sessionTimeArray, { time: sessionTime }];
      return null;
    });

    if (sessionTimeArray.length > 0) {
      sessionTimeArray.map((generalTime) => {
        generalTime.time.map((finalTime) => {
          finalTimeArrayFunc((prev) => [
            ...prev,
            { startTime: finalTime.startTime, endTime: finalTime.endTime },
          ]);
          return null;
        });
        return null;
      });
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

export const createAppointment = async (dateInput, token, dataObject) => {
  const date = new Date(dateInput);
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const monthInWords = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  const newDateFormat = `${day} ${monthInWords} ${year}`;

  const newDataObject = { ...dataObject, appointmentDate: newDateFormat };

  try {
    const { data: appointmentData } = await axios.post(
      'https://abibiman-api.onrender.com/appointments',
      newDataObject,
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      }
    );
    console.log(appointmentData);
    return appointmentData;
  } catch (error) {
    console.log(error);
  }
  return null;
};
