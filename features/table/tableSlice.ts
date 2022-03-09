import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TableState {
  id: number;
  selected: boolean;
  deviceName: string;
  watt: string;
  amount: string;
  workingHours: string;
  weeklyUsage: string;
}

const initialState: TableState[] = [
  {
    id: -1,
    selected: false,
    deviceName: "Ampül (Örnek)",
    watt: "60",
    amount: "3",
    workingHours: "5.5",
    weeklyUsage: "7",
  },
];

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    addRow: (state, action: PayloadAction<TableState>) => {
      state.push(action.payload);
    },
    deleteRow: (state, action: PayloadAction<TableState>) => {
      const index = state.findIndex((row) => row.id === action.payload.id);
      state.splice(index, 1);
    },
    updateRow: (state, action: PayloadAction<TableState>) => {
      let objIndex = state.findIndex((obj) => obj.id == action.payload.id);
      state[objIndex] = action.payload;
    },
  },
});

export const { addRow, deleteRow, updateRow } = tableSlice.actions;

export default tableSlice.reducer;
