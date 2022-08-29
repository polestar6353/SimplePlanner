import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialState = {
  list: [],
  calendarList: [],
};

export const doLoadPlans = createAsyncThunk('doLoadPlans', async () => {
  const response = await fetch('http://127.0.0.1:8080/getMobilePlans', {
    method: 'GET',
  });
  const plans = response.json();
  return plans;
});

export const doLoadCalendar = createAsyncThunk('doLoadCalendar', async () => {
  const response = await fetch('http://127.0.0.1:8080/getPlans', {
    method: 'GET',
  });
  const plans = response.json();
  return plans;
});

const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    loadPlan: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(doLoadPlans.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(doLoadCalendar.fulfilled, (state, action) => {
        state.calendarList = action.payload;
      });
  },
});

export default planSlice.reducer;

export const {loadPlan} = planSlice.actions;
