
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [sidoList, setSidoList] = useState([]);
  const [selectedSido, setSelectedSido] = useState("");
  const [siGunguList, setSiGunguList] = useState([]);
  const [selectedSiGungu, setSelectedSiGungu] = useState("");
  const [eupMyeonDongList, setEupMyeonDongList] = useState([]);
  const [selectedEupMyeonDong, setSelectedEupMyeonDong] = useState("");
  const [sidoName, setSidoName] = useState("");
  const [siGunGuName, setSiGunGuName] = useState("");
  const [eupMyeonDongName, setEupMyeonDongName] = useState("");
  const [createNameArray, setCreateNameArray] = useState([]);
  useEffect(() => {
    fetchSidoList();
  }, [createNameArray]);

  const fetchSidoList = () => {
    axios.get("https://dev-admin.gongsiltoday.com/api/regions/si-do")
      .then((res) => {
        setSidoList(res.data.result);
      })
      .catch((error) => {
        console.error("에러:", error);
      });
  };

  const fetchGunguList = (siDoCode) => {
    axios.get(`https://dev-admin.gongsiltoday.com/api/regions/si-gun-gu/${siDoCode}`)
      .then((res) => {
        setSiGunguList(res.data.result);
        setEupMyeonDongList([]);
        setSelectedSiGungu("");
      })
      .catch((error) => {
        console.error("에러:", error);
      });
  };

  const fetchEupMyeonDongList = (siGunGuCode) => {
    axios.get(`https://dev-admin.gongsiltoday.com/api/regions/eup-myeon-dong/${siGunGuCode}`)
      .then((res) => {
        setEupMyeonDongList(res.data.result);
      })
      .catch((error) => {
        console.error("에러:", error);
      });
  };

  const handleSidoChange = (e) => {
    const selectedSiDoCode = e.target.value;
    const selectedSiDoName = e.target.options[e.target.selectedIndex].text;
    setSelectedSido(selectedSiDoCode);
    fetchGunguList(selectedSiDoCode);
    setSidoName(selectedSiDoName);
  };

  const handleGunguChange = (e) => {
    const selectedSiGunguCode = e.target.value;
    const selectedSigunguName = e.target.options[e.target.selectedIndex].text;
    setSelectedSiGungu(selectedSiGunguCode);
    fetchEupMyeonDongList(selectedSiGunguCode);
    setSiGunGuName(selectedSigunguName);
  };

  const handleEupMyeonDongChange = (e) => {
    const selectedEupMyeonDong = e.target.value;
    const selectedEupMyeonDongName = e.target.options[e.target.selectedIndex].text;
    setSelectedEupMyeonDong(selectedEupMyeonDong);
    setEupMyeonDongName(selectedEupMyeonDongName)
  };

  const createVlueTxts = () => {
    setCreateNameArray([...createNameArray, { sido: sidoName, siGunGu: siGunGuName, eupMyeonDong: eupMyeonDongName }]);
    setSelectedSido("");
    setSiGunguList([]);
    setEupMyeonDongList([]);
    setSidoName("")
    setSiGunGuName("")
    setEupMyeonDongName("")
   
  };
  return (
    <div className="App">
      <label htmlFor="sido">시도 선택 : </label>
      <select id="sido" value={selectedSido} onChange={handleSidoChange}>
        <option value="">시도를 선택하세요</option>
        {sidoList.map((sido) => (
          <option key={sido.code} value={sido.code}>
            {sido.name}
          </option>
        ))}
      </select>
      <select id="gungu" value={selectedSiGungu} onChange={handleGunguChange}>
        <option value="">시군구를 선택하세요</option>
        {siGunguList.map((gungu) => (
          <option key={gungu.code} value={gungu.code}>
            {gungu.name}
          </option>
        ))}
      </select>
      <select id="eupMyeonDong" value={selectedEupMyeonDong} onChange={handleEupMyeonDongChange}>
        <option value="">읍면동을 선택하세요</option>
        {eupMyeonDongList.map((eupMyeonDong) => (
          <option key={eupMyeonDong.code} value={eupMyeonDong.code}>
            {eupMyeonDong.name}
          </option>
        ))}
      </select>
      <button onClick={createVlueTxts}>추가</button>
      <div>
        {createNameArray.map((name, ix) => (
          <div key={ix}>
            <span>{name.sido}</span>
            <span>{name.siGunGu}</span>
            <span>{name.eupMyeonDong}</span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;

