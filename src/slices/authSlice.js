import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  twk: localStorage.getItem("twk") ? localStorage.getItem("twk") : null,
  newStoreName: "",
  newStoreType: "",
  newStoreAbout: "",
  newStoreWANum: "",
  toast: {
    show: false,
    message: "",
    title: "Successful",
  },
  newStoreAlert: 0,
  selectedStore: "",
  stores: []
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { uid, displayName, accessToken, photoURL, email } = action.payload;
      state.userInfo = { uid, displayName, photoURL, email };
      state.twk = accessToken;
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      localStorage.setItem("twk", accessToken);
    },
    setNewStoreName: (state, action) => {
      state.newStoreName = action.payload;
    },
    setNewStoreType: (state, action) => {
      state.newStoreType = action.payload;
    },
    setNewStoreAbout: (state, action) => {
      state.newStoreAbout = action.payload;
    },
    setNewStoreWANum: (state, action) => {
      state.newStoreWANum = action.payload;
    },
    setNewStoreAlert: (state, action) => {
      state.newStoreAlert += 1;
    },
    setSelectedStore: (state, action) => {
      state.selectedStore = action.payload;
      state.stores = state.stores.map(store => {
        if (store._id === action.payload) {
          store.selected = true;
        }else{
          store.selected = false;
        }
        return store; 
      });
    },
    setAllStores: (state, action) => {
      state.stores = action.payload;
    },
    logout: (state, action) => {
      state.userInfo = null;
      state.twk = null;
      state.newStoreName = "";
      state.newStoreType = "Ecommerce";
      state.newStoreAbout = "";
      state.newStoreWANum = "";
      localStorage.removeItem("userInfo");
      localStorage.removeItem("twk");
    },
    showToast: (state, action) => {
      state.toast.show = true;
      state.toast.message = action.payload.message;
      state.toast.title = action.payload.title;
    },
    hideToast: (state) => {
      state.toast.show = false;
      state.toast.message = "";
      state.toast.title = "Successful";
    },
  },
});

export const {
  setCredentials,
  setNewStoreName,
  setNewStoreType,
  setNewStoreAbout,
  setNewStoreWANum,
  logout,
  showToast,
  hideToast,
  setNewStoreAlert,
  setSelectedStore,
  setAllStores
} = authSlice.actions;

export default authSlice.reducer;
