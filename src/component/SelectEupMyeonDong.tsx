import { useEffect, useState } from "react";
import axios from "axios";
import { AreaInfoModel } from "../models/AreaInfoModel";

export default function SelectEupMyeonDong({ onChange, siGunGuCode, selectedEupMyeonDongCode, disabled }:AreaInfoModel.ISiDoGunEupMyeonDongModel) {
  const [eupMyeonDongList, setEupMyeonDongList] = useState([]);

  useEffect(() => {
    if (siGunGuCode) {
      fetchEupMyeonDongList(siGunGuCode);
    }
  }, [siGunGuCode]);

  const fetchEupMyeonDongList = (siGunGuCode:string) => {
    axios.get(`https://dev-admin.gongsiltoday.com/api/regions/eup-myeon-dong/${siGunGuCode}`)
      .then((res) => {
        setEupMyeonDongList(res.data.result);
      })
      .catch((error) => {
        console.error("에러:", error);
      });
  };

  const handleEupMyeonDongChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEupMyeonDongCode = e.target.value;
    const selectedIndex = e.target.selectedIndex;
    const eupMyeonDongName = e.target.options[selectedIndex].text;
    onChange(selectedEupMyeonDongCode, eupMyeonDongName);
  };

  return (
    <select onChange={handleEupMyeonDongChange} value={selectedEupMyeonDongCode} disabled={disabled}>
      <option value="">읍면동을 선택하세요</option>
      {eupMyeonDongList.map((eupMyeonDong:AreaInfoModel.IAreaListInfo) => (
        <option key={eupMyeonDong.code} value={eupMyeonDong.code}>
          {eupMyeonDong.name}
        </option>
      ))}
    </select>
  )
}
