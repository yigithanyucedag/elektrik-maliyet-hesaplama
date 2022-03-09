import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { TableState, updateRow } from "../features/table/tableSlice";

export default function TableRow({ item }: { item: TableState }) {
  const dispatch = useDispatch();
  const price = useSelector((state: RootState) => state.price);

  const weeklyPowerConsumption =
    ((Number(item.watt) *
      (Number(item.workingHours) * Number(item.weeklyUsage))) /
      1000) *
    Number(item.amount);

  const monthlyPowerConsumption = (Number(weeklyPowerConsumption) * 4).toFixed(
    2
  );

  return (
    <tr>
      <th>
        <label>
          <input
            type="checkbox"
            checked={item.selected}
            onChange={(event) =>
              dispatch(updateRow({ ...item, selected: !item.selected }))
            }
            className="checkbox"
          />
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
          className="input input-bordered min-w-full w-48"
        />
      </td>
      <td>
        <input
          type="text"
          placeholder="0"
          value={item.watt}
          onChange={(event) => {
            dispatch(updateRow({ ...item, watt: event.target.value }));
          }}
          className="input input-bordered w-full max-w-xs"
        />
      </td>
      <td>
        <input
          type="text"
          placeholder="0"
          value={item.amount}
          onChange={(event) => {
            dispatch(updateRow({ ...item, amount: event.target.value }));
          }}
          className="input input-bordered w-full max-w-xs"
        />
      </td>
      <td>
        <input
          type="text"
          value={item.workingHours}
          onChange={(event) => {
            dispatch(updateRow({ ...item, workingHours: event.target.value }));
          }}
          className="input input-bordered w-full max-w-xs"
        />
      </td>
      <td>
        <input
          type="number"
          value={item.weeklyUsage}
          onChange={(event) => {
            dispatch(updateRow({ ...item, weeklyUsage: event.target.value }));
          }}
          className="input input-bordered w-full max-w-xs"
        />
      </td>
      <td>{monthlyPowerConsumption} kWh</td>
      <th>
        {(Number(monthlyPowerConsumption) * Number(price.value)).toFixed(2)}₺
      </th>
    </tr>
  );
}
