'use client';

import PropTypes from 'prop-types';
import { useEffect, useReducer, useCallback, useMemo } from 'react';
// utils
import axios, { endpoints } from 'src/utils/axios';
import customAxios from 'src/utils/customAxios';
//
import { paths } from 'src/routes/paths';
import { AuthContext } from './auth-context';
import { isValidToken, setSession } from './utils';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

const initialState = {
  user: null,
  facilityInfo: null,
  loading: true,
  facilityID: null, // Add this line
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      user: action.payload.data,
      userID: action.payload.data.userID, // Add this line
    };
  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      loading: false,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        if (state.facilityID) {
          setSession(accessToken);

          const response = await customAxios.get(`/facility/${state.facilityID}`, {
            headers: {
              Authorization: `Basic ${accessToken}`,
            },
          });

          const userInfo = response.data.data;

          const data = { ...userInfo, token: accessToken };
          localStorage.setItem('facilityInfo', JSON.stringify(data));

          dispatch({
            type: 'INITIAL',
            payload: {
              userInfo,
            },
          });
        } else {
          const userInfo = JSON.parse(localStorage.getItem('facilityInfo'));

          dispatch({
            type: 'INITIAL',
            payload: {
              user: userInfo,
            },
          });
        }
      } else {
        setSession(null);
        localStorage.removeItem('facilityInfo');
        // window.location.href = paths.auth.jwt.login;

        dispatch({
          type: 'LOGOUT',
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'LOGOUT',
        // payload: {
        //   user: null,
        // },
      });
    }
  }, [state.facilityID]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email, password) => {
    try {
      let data = {
        email,
        password,
      };

      const response = await customAxios.post('auth/facility/login', data);
      const { token, firstName, lastName, phoneNumber, userID,facilityID } = response.data.data;

      data = {
        ...data,
        firstName,
        lastName,
        phoneNumber,
        userID,
        token,
        facilityID
      };

      setSession(token);

      dispatch({
        type: 'LOGIN',
        payload: {
          data,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
    }
  }, []);

  // REGISTER
  const register = useCallback(async (email, password, firstName, lastName, phoneNumber) => {
    try {
      const data = {
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
      };

      console.log(email, password);

      const response = await customAxios.post('/users/register', data);

      console.log(response);

      const { accessToken, user } = response.data;

      sessionStorage.setItem(STORAGE_KEY, accessToken);

      dispatch({
        type: 'REGISTER',
        payload: {
          user,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
    }
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null);
    localStorage.removeItem('userInfo');
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      userInfo: state.userInfo,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      register,
      logout,
    }),
    [login, logout, register, state.user, state.userInfo, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
