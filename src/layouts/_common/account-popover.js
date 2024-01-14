import { useState, useEffect } from "react";
import axios from "axios";
import { m } from "framer-motion";
// @mui
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// routes
import { paths } from "src/routes/paths";
import { useRouter } from "src/routes/hooks";

// hooks
import { useBoolean } from "src/hooks/use-boolean";

// auth
import { useAuthContext } from "src/auth/hooks";
// components
import { varHover } from "src/components/animate";
import { useSnackbar } from "src/components/snackbar";
import CustomPopover, { usePopover } from "src/components/custom-popover";
import { ConfirmDialog } from "src/components/custom-dialog";

// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: "Home",
    linkTo: "/",
  },
  {
    label: "Profile",
    linkTo: paths.dashboard.user.profile,
  },
  {
    label: "Account Settings",
    linkTo: paths.dashboard.user.account,
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const router = useRouter();

  const { logout, user } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const popover = usePopover();

  const confirm = useBoolean();

  const { token, facilityID } = user || {};

  const handleLogout = async () => {
    try {
      await logout();
      popover.onClose();
      router.replace("/");
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Unable to logout!", { variant: "error" });
    }
  };

  const [userData, setUserData] = useState([]);
  const getOneUser = async () => {
    const {
      data: { data },
    } = await axios.get(
      `https://abibiman-api.onrender.com/facility/fetch/${facilityID}`,
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      }
    );
    console.log(data);
    setUserData(data);
  };

  useEffect(() => {
    getOneUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickItem = (path) => {
    popover.onClose();
    router.push(path);
  };

  // console.log(userData);

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(popover.open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={userData?.photo}
          alt={`${userData?.firstName || " "} ${userData?.lastName || " "}`}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        />
      </IconButton>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        sx={{ width: 200, p: 0 }}
      >
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {`${userData?.firstName || " "} ${userData?.lastName || " "}`}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {userData?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              onClick={() => handleClickItem(option.linkTo)}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem
          onClick={confirm.onTrue}
          sx={{ m: 1, fontWeight: "fontWeightBold", color: "error.main" }}
        >
          Logout
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Logout"
        content={<>Are you sure want to logout?</>}
        action={
          <>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                handleLogout();
                confirm.onFalse();
              }}
            >
              Yes
            </Button>

            {/* <Button
              variant="contained"
              color="primary"
              onClick={() => {
                confirm.onFalse();
                popover.onClose();
              }}
            >
              No
            </Button> */}
          </>
        }
      />
    </>
  );
}
