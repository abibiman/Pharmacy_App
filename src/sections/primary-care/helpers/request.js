import customAxios from 'src/utils/customAxios';

export const fetchProviderData = async (token, providerID) => {
  // loadingFunc(true);
  try {
    const response = await customAxios.get(`/providers/${providerID}`, {
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
  // setLoading(true);
  try {
    const { data: hoursData } = await customAxios.get(
      // `/providerschedules/${providerID}`,
      `/providerschedules/PAC-58965t9`
    );
    hoursFunc(hoursData.data);

    const availableTime = hoursData.data;
    const sessionsByDay = Object.keys(availableTime).map((day) => {
      const sessions = availableTime[day];
      const sessionObject = { availableDay: day, availableSessions: sessions };
      return sessionObject;
    });

    let sessionTimeArray = [];

    sessionsByDay.forEach((session) => {
      const sessionTime = session.availableSessions;
      sessionTimeArray = [...sessionTimeArray, { time: sessionTime }];
    });

    const newFinalTimeArray = [];

    if (sessionTimeArray.length > 0) {
      sessionTimeArray.forEach((generalTime) => {
        generalTime.time.forEach((finalTime) => {
          newFinalTimeArray.push({
            startTime: finalTime.startTime,
            endTime: finalTime.endTime,
          });
        });
      });
    }

    finalTimeArrayFunc(newFinalTimeArray);
    // setLoading(false);
  } catch (error) {
    console.log(error);
    // setLoading(false);
  }
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
    const { data: appointmentData } = await customAxios.post('/appointments', newDataObject);
    console.log(appointmentData);
    return appointmentData;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const fetchPrimaryCareProvider = async (userID, token) => {
  try {
    const { data } = await customAxios.get(`/primarycare/user/fetchprovider/${userID}`);
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
