import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { AreaInfoModel } from "../models/AreaInfoModel";

export default function SelectSido({ onChange, selectedSidoCode, disabled }: AreaInfoModel.ISiDoGunEupMyeonDongModel) {
  const [sidoList, setSidoList] = useState<AreaInfoModel.IAreaListInfo[]>([]);

  useEffect(() => {
    fetchSidoList();
  }, []);

  const fetchSidoList = () => {
    axios.get<{ result: AreaInfoModel.IAreaListInfo[] }>("https://dev-admin.gongsiltoday.com/api/regions/si-do")
      .then((res) => {
        const sidoData = res.data.result;
        const seoul:  AreaInfoModel.IAreaListInfo | undefined = sidoData.find(sido => sido.name === '서울특별시');
        const filteredSidoData = sidoData.filter(sido => sido.name !== '서울특별시');
        if (seoul) {
          setSidoList([seoul, ...filteredSidoData]);
        } else {
          setSidoList(filteredSidoData);
        }
        
      })
      .catch((error) => {
        console.error("에러:", error);
      });
  };

  const handleSidoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSidoCode = e.target.value;
    const selectedIndex = e.target.selectedIndex;
    const sidoName = e.target.options[selectedIndex].text;
    onChange(selectedSidoCode, sidoName);
  };

  return (
    <select onChange={handleSidoChange} value={selectedSidoCode} disabled={disabled}>
      <option value="">시도를 선택하세요</option>
      {sidoList.map((sido: AreaInfoModel.IAreaListInfo) => (
        <option key={sido.code} value={sido.code}>{sido.name}</option>
      ))}
    </select>
  );
}
