import {configureStore} from '@reduxjs/toolkit';
import Plan from './reducer/Plan';

const store = configureStore({
  reducer: {
    Plan,
  },
});

export default store;
