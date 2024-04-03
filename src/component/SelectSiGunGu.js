import { useEffect, useState } from "react";
import axios from "axios";

export default function SelectSiGunGu({ onChange, siDoCode, selectedSiGunGuCode, disabled }) {
  const [siGunguList, setSiGunguList] = useState([]);

  useEffect(() => {
    if (siDoCode) {
      fetchSiGunGuList(siDoCode);
    }
  }, [siDoCode]);

  const fetchSiGunGuList = (siDoCode) => {
    axios.get(`https://dev-admin.gongsiltoday.com/api/regions/si-gun-gu/${siDoCode}`)
      .then((res) => {
        setSiGunguList(res.data.result);
      })
      .catch((error) => {
        console.error("에러:", error);
      });
  };

  const handleSiGunGuChange = (e) => {
    const selectedSiGunGUCode = e.target.value;
    const selectedIndex = e.target.selectedIndex;
    const siGunGuName = e.target.options[selectedIndex].text;
    onChange(selectedSiGunGUCode, siGunGuName);
  };

  return (
    <select onChange={handleSiGunGuChange} value={selectedSiGunGuCode} disabled={disabled}>
      <option value="">시군구를 선택하세요</option>
      {siGunguList.map((gungu) => (
        <option key={gungu.code} value={gungu.code}>
          {gungu.name}
        </option>
      ))}
    </select>
  )
}
