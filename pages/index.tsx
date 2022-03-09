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
      <a
        href="https://github.com/yigithanyucedag/elektrik-maliyet-hesaplama"
        target="_blank"
        rel="noreferrer"
        className="text-base-500 group mt-12 flex items-center gap-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
        <span className="font-medium text-sm group-hover:underline">
          yigithanyucedag/elektrik-maliyet-hesaplama
        </span>
      </a>
    </>
  );
};

export default Home;
