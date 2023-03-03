import { ResponseDetails } from '@backend/models/response/responseDetails';
import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';

export const addLogData = createAction<ResponseDetails[]>('addLogData');

export interface State {
  logData: ResponseDetails[];
}
const initialState: State = { logData: [] };

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addLogData, (state, action) => {
      state.logData = [...state.logData, ...action.payload];
    });
});

const store = configureStore({ reducer });

export default store;
