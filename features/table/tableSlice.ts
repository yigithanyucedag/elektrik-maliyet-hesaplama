import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TableState {
  index?: number;
  deviceName: string;
  watt: number;
  amount: number;
  workingHours: number;
  weeklyUsage: number;
}

const initialState: TableState[] = [
  {
    index: 0,
    deviceName: "Ampül (Örnek)",
    watt: 60,
    amount: 3,
    workingHours: 5,
    weeklyUsage: 7,
  },
];

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    //add row by user input
    addRow: (state, action: PayloadAction<TableState>) => {
      state.push({ ...action.payload, index: state.length });
    },
    //delete row by user input
    deleteRow: (state, action: PayloadAction<TableState>) => {
      //@ts-ignore
      state.splice(action.payload, 1);
    },
    //update row by user input
    updateRow: (state, action: PayloadAction<TableState>) => {
      if (action.payload.index !== undefined) {
        state[action.payload.index] = action.payload;
      }
    },
  },
});

export const { addRow, deleteRow, updateRow } = tableSlice.actions;

export default tableSlice.reducer;
