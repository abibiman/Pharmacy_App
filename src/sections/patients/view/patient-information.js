import { useState, useCallback, useEffect, useContext } from "react";
// @mui
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";
import { Container, Button } from "@mui/material";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
// routes
import { paths } from "src/routes/paths";
import { RouterLink } from "src/routes/components";

// hooks
// _mock
import { _userFeeds } from "src/_mock";
// components
import Iconify from "src/components/iconify";
import { useSettingsContext } from "src/components/settings";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
//
import { AuthContext } from "src/auth/context/jwt";
import ProfileHome from "../profile-home";
import ProfileCover from "../profile-cover";
import { useParams } from "react-router";
import axios from "axios";
import PatientMedical from "../patient-medical";
import PatientVitals from "../patient-vitals";
import PatientLabs from "../patient-labs";
import PatientPrescriptions from "../patient-prescriptions";
import PatientDoctorNotes from "../patient-doctor-notes";
import PatientActions from "../patient-actions";
// ----------------------------------------------------------------------

const TABS = [
  {
    value: "bio",
    label: "General",
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
    value: "medi",
    label: "Medical History",
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
    value: "vitals",
    label: "Vitals",
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
    value: "labs",
    label: "Lab Orders",
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
    value: "prescriptions",
    label: "Prescriptions",
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
    value: "notes",
    label: "Doctor's Notes",
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
    {
    value: "actions",
    label: "Actions",
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },

]

// ----------------------------------------------------------------------

export default function UserProfileView() {
  const { id } = useParams();
  const settings = useSettingsContext();
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [userMedical, setUserMedical] = useState({});
  const [userHabits, setUserHabits] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);

    axios
      .get(`https://abibiman-api.onrender.com/users/${id}`, {
        headers: {
          Authorization: `Basic ${user?.token}`,
        },
      })
      .then((res) => {
        setUserData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`https://abibiman-api.onrender.com/users/medicalhistory/${id}`, {
        headers: {
          Authorization: `Basic ${user?.token}`,
        },
      })
      .then((res) => {
        setUserMedical(res.data.data);
      })
      .catch((err) => {
        console.log(err.data);
      });

    axios
      .get(`https://abibiman-api.onrender.com/users/social-habits/${id}`, {
        headers: {
          Authorization: `Basic ${user?.token}`,
        },
      })
      .then((res) => {
        setUserHabits(res.data.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(data);

  const [currentTab, setCurrentTab] = useState("bio");

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading={`${userData?.firstName || " "} ${userData?.lastName || " "}`}
        links={[
          { name: "Dashboard", href: paths.dashboard.root },
          // { name: 'Provider', href: paths.dashboard.providers.root },
          {
            name: `${userData?.firstName || " "} ${userData?.lastName || " "}`,
          },
        ]}
        action={
          <Button
            component={RouterLink}
            href={`/dashboard/chat/${userData?.userID}`}
            variant="primary"
            startIcon={<Iconify icon="basil:chat-solid" />}
            sx={{ marginLeft: "5px" }}
          >
            Chat
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {/* {loading ? (
        <LoadingScreen />
      ) : ( */}
      <>
        <Card
          sx={{
            mb: 3,
            height: 290,
          }}
        >
          <ProfileCover
            name={`${userData?.firstName || " "} ${userData?.lastName || " "}`}
            avatarUrl={userData?.photo}
            coverUrl="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />

          <Tabs
            value={currentTab}
            onChange={handleChangeTab}
            sx={{
              width: 1,
              bottom: 0,
              zIndex: 9,
              position: "absolute",
              bgcolor: "background.paper",
              [`& .${tabsClasses.flexContainer}`]: {
                pr: { md: 3 },
                justifyContent: {
                  sm: "center",
                  md: "flex-end",
                },
              },
            }}
          >
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                label={tab.label}
              />
            ))}
          </Tabs>
        </Card>

        {currentTab === "bio" && (
          <ProfileHome data={userData} posts={_userFeeds} />
        )}
        {currentTab === "medi" && (
          <PatientMedical data={userData} posts={_userFeeds} />
        )}

        {currentTab === "vitals" && (
          <PatientVitals data={userData} posts={_userFeeds} />
        )}

        {currentTab === "labs" && (
          <PatientLabs data={userData} posts={_userFeeds} />
        )}

        {currentTab === "prescriptions" && (
          <PatientPrescriptions data={userData} posts={_userFeeds} />
        )}

        {currentTab === "notes" && (
          <PatientDoctorNotes data={userData} posts={_userFeeds} />
        )}

        {currentTab === "actions" && (
          <PatientActions data={userData} posts={_userFeeds} />
        )}

        {/* {currentTab === "conditions" && (
          <PatientDoctorNotes data={userData} posts={_userFeeds} />
        )}

        {currentTab === "medications" && (
          <PatientDoctorNotes data={userData} posts={_userFeeds} />
        )} */}
      </>
      {/* )} */}
    </Container>
  );
}
