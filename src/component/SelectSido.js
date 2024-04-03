import { useEffect, useState } from "react";
import axios from "axios";

export default function SelectSido({ onChange, selectedSidoCode, disabled }) {
  const [sidoList, setSidoList] = useState([]);

  useEffect(() => {
    fetchSidoList();
  }, []);

  const fetchSidoList = () => {
    axios.get("https://dev-admin.gongsiltoday.com/api/regions/si-do")
      .then((res) => {
        const sidoData = res.data.result;
        const seoul = sidoData.find(sido => sido.name === '서울특별시');
        const filteredSidoData = sidoData.filter(sido => sido.name !== '서울특별시');
        setSidoList([seoul, ...filteredSidoData]);
      })
      .catch((error) => {
        console.error("에러:", error);
      });
  };
  

  const handleSidoChange = (e) => {
    const selectedSidoCode = e.target.value;
    const selectedIndex = e.target.selectedIndex;
    const sidoName = e.target.options[selectedIndex].text;
    onChange(selectedSidoCode, sidoName);
  };

  return (
    <select onChange={handleSidoChange} value={selectedSidoCode} disabled={disabled} defaultValue={11}>
      <option value="">시도를 선택하세요</option>
      {sidoList.map((sido) => (
        <option key={sido.code} value={sido.code} defaultValue={sidoList.defaultValue === sido.code}>{sido.name}</option>
      ))}
    </select>
  )
}
