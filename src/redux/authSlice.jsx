import { createSlice } from "@reduxjs/toolkit";

const getInitialAuthState = () => {
  const savedToken = localStorage.getItem("token");
  const savedUser = localStorage.getItem("user");

  if (!savedToken) {
    return { isAuthenticated: false, user: null, token: null };
  }

  try {
    const decoded = JSON.parse(atob(savedToken));

    if (decoded.exp && decoded.exp < Date.now()) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return { isAuthenticated: false, user: null, token: null };
    }

    return {
      isAuthenticated: true,
      user: savedUser ? JSON.parse(savedUser) : null,
      token: savedToken,
    };
  } catch {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return { isAuthenticated: false, user: null, token: null };
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialAuthState(),
  reducers: {
    loginSuccess: (state, action) => {
      const { token, user } = action.payload;

      state.isAuthenticated = true;
      state.token = token;
      state.user = user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;