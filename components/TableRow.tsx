import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TableState, updateRow } from "../features/table/tableSlice";

export default function TableRow({ item }: { item: TableState }) {
  const dispatch = useDispatch();

  const weeklyPowerConsumption =
    ((item.watt * (item.workingHours * item.weeklyUsage)) / 1000) * item.amount;

  const monthlyPowerConsumption = (Number(weeklyPowerConsumption) * 4).toFixed(
    2
  );

  return (
    <tr>
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>
        <input
          autoFocus
          placeholder="Cihaz Adı"
          type="text"
          value={item.deviceName}
          onChange={(event) => {
            dispatch(updateRow({ ...item, deviceName: event.target.value }));
          }}
          className="input input-ghost min-w-full w-48"
        />
      </td>
      <td>
        <input
          type="text"
          placeholder="0"
          value={item.watt}
          onChange={(event) => {
            dispatch(updateRow({ ...item, watt: Number(event.target.value) }));
          }}
          className="input input-ghost w-full max-w-xs"
        />
      </td>
      <td>
        <input
          type="text"
          placeholder="0"
          value={item.amount}
          onChange={(event) => {
            dispatch(
              updateRow({ ...item, amount: Number(event.target.value) })
            );
          }}
          className="input input-ghost w-full max-w-xs"
        />
      </td>
      <td>
        <input
          step={0.1}
          type="number"
          value={item.workingHours}
          onChange={(event) => {
            dispatch(
              updateRow({ ...item, workingHours: Number(event.target.value) })
            );
          }}
          className="input input-ghost w-full max-w-xs"
        />
      </td>
      <td>
        <input
          type="number"
          value={item.weeklyUsage}
          onChange={(event) => {
            dispatch(
              updateRow({ ...item, weeklyUsage: Number(event.target.value) })
            );
          }}
          className="input input-ghost w-full max-w-xs"
        />
      </td>
      <td>{monthlyPowerConsumption} kWh</td>
      <th>{(Number(monthlyPowerConsumption) * 1.25).toFixed(2)}₺</th>
    </tr>
  );
}
