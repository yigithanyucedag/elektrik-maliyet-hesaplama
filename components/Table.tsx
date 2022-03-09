import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { addRow } from "../features/table/tableSlice";
import TableRow from "./TableRow";

export default function Table() {
  const items = useSelector((state: RootState) => state.table);
  const dispatch = useDispatch();
  return (
    <div className="overflow-x-auto w-full">
      <div className="mx-2 mb-4 flex items-center justify-end">
        <button
          onClick={() => {
            dispatch(
              addRow({
                deviceName: "",
                watt: "" as any,
                amount: 1,
                workingHours: 1,
                weeklyUsage: 1,
              })
            );
          }}
          className="btn btn-primary btn-sm"
        >
          Cihaz Ekle
        </button>
      </div>
      <table className="table-normal table-zebra w-full">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Cihaz Adı</th>
            <th>Güç (Watt)</th>
            <th>Miktar</th>
            <th>Çalışma Süresi (Saat)</th>
            <th>Haftalık Kullanım Sayısı</th>
            <th>Aylık Ort. Enerji Tük. (kWh)</th>
            <th>Aylık Elektrik Enerjisi Maliyeti (₺)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <TableRow key={index} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
