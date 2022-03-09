import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { updateRow } from "../features/table/tableSlice";
import TableRow from "./TableRow";

export default function Table() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.table);

  return (
    <div className="overflow-x-auto w-full">
      <table className="table-normal table-zebra w-full">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={
                  items.length > 0 && items.every((item) => item.selected)
                }
                onChange={(event) => {
                  for (let item of items) {
                    dispatch(
                      updateRow({ ...item, selected: event.target.checked })
                    );
                  }
                }}
                className="checkbox"
              />
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
