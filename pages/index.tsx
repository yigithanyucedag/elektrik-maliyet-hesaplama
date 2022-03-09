import type { NextPage } from "next";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import Table from "../components/Table";

const Home: NextPage = () => {
  const items = useSelector((state: RootState) => state.table);
  const allDevices = items.length;
  const totalPowerConsumption = items.reduce(
    (acc, item) =>
      acc +
      ((item.watt * (item.workingHours * item.weeklyUsage)) / 1000) *
        item.amount *
        4,
    0
  );

  //find the most power consuming device name
  const mostPowerConsumingDevice = items.reduce(
    (acc, item) => {
      const powerConsumption =
        ((item.watt * (item.workingHours * item.weeklyUsage)) / 1000) *
        item.amount *
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
              {mostPowerConsumingDevice.deviceName}
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">Aylık Toplam Maliyet</div>
            <div className="stat-value">
              {(totalPowerConsumption * 1.25).toFixed(2)}₺
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
