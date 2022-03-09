import type { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import Table from "../components/Table";
import { update } from "../features/price/priceSlice";
import { addRow, deleteRow } from "../features/table/tableSlice";

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.table);
  const price = useSelector((state: RootState) => state.price);

  const selectedItems = items.filter((item) => item.selected);
  const allDevices = items.length;
  const totalPowerConsumption = items.reduce(
    (acc, item) =>
      acc +
      ((Number(item.watt) *
        (Number(item.workingHours) * Number(item.weeklyUsage))) /
        1000) *
        Number(item.amount) *
        4,
    0
  );

  //find the most power consuming device name
  const mostPowerConsumingDevice = items.reduce(
    (acc, item) => {
      const powerConsumption =
        ((Number(item.watt) *
          (Number(item.workingHours) * Number(item.weeklyUsage))) /
          1000) *
        Number(item.amount) *
        4;
      if (powerConsumption > acc.powerConsumption) {
        return {
          deviceName: item.deviceName,
          powerConsumption,
        };
      }
      return acc;
    },
    { deviceName: "", powerConsumption: 0 }
  );

  return (
    <>
      <h1 className="text-3xl font-bold"></h1>
      <div className="px-2 pb-4 pt-2 flex items-center flex-col sm:flex-row justify-center sm:justify-end gap-2 overflow-visible">
        <div className="form-control w-full sm:max-w-xs mr-0 sm:mr-auto">
          <label className="label">
            <span className="label-text">Elektrik kWh bedeli (₺)</span>
          </label>
          <input
            type="text"
            value={price.value}
            onChange={(event) => dispatch(update(event.target.value))}
            placeholder="1.25"
            className="input input-bordered w-full sm:max-w-xs input-sm"
          />
        </div>
        <button
          className="btn btn-error btn-block sm:w-auto btn-sm"
          disabled={selectedItems.length === 0}
          onClick={() => {
            for (let item of selectedItems) {
              dispatch(deleteRow(item));
            }
          }}
        >
          Sil
        </button>
        <button
          onClick={() => {
            dispatch(
              addRow({
                id: Math.floor(Math.random() * Date.now()),
                selected: false,
                deviceName: "",
                watt: "" as any,
                amount: "1",
                workingHours: "1",
                weeklyUsage: "1",
              })
            );
          }}
          className="btn btn-info btn-block sm:w-auto btn-sm"
        >
          Cihaz Ekle
        </button>
      </div>
      <div className="mt-5">
        <Table />
      </div>
      <div className="flex items-center justify-center mt-5">
        <div className="stats bg-base-200 stats-vertical lg:stats-horizontal">
          <div className="stat">
            <div className="stat-title">Tüm Cihazlar</div>
            <div className="stat-value">{allDevices}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Max. Enerji Tüketen Cihaz</div>
            <div className="stat-value">
              {mostPowerConsumingDevice.deviceName
                ? mostPowerConsumingDevice.deviceName.length > 10
                  ? `${mostPowerConsumingDevice.deviceName.substring(0, 10)}…`
                  : mostPowerConsumingDevice.deviceName
                : "-"}
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">Aylık Toplam Maliyet</div>
            <div className="stat-value">
              {(totalPowerConsumption * Number(price.value)).toFixed(2)}₺
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
