import { useState } from "react";
import SelectSido from "./component/SelectSido";
import SelectSiGunGu from "./component/SelectSiGunGu";
import SelectEupMyeonDong from "./component/SelectEupMyeonDong";

function App() {
  const [createNameArray, setCreateNameArray] = useState([]);
  const [selectedSidoName, setSelectedSidoName] = useState("");
  const [selectedSidoCode, setSelectedSidoCode] = useState("");
  const [selectedSiGunGuName, setSelectedSiGunGuName] = useState("");
  const [selectedSiGunGuCode, setSelectedSiGunGuCode] = useState("");
  const [selectedEupMyeonDongName, setSelectedEupMyeonDongName] = useState("");
  const [selectedEupMyeonDongCode, setSelectedEupMyeonDongCode] = useState("");

  const handleSidoChange = (code, name) => {
    setSelectedSidoCode(code);
    setSelectedSidoName(name);
    setSelectedSiGunGuCode("");
    setSelectedSiGunGuName("");
    setSelectedEupMyeonDongCode("");
    setSelectedEupMyeonDongName("");
  };

  const handleSiGunGuChange = (code, name) => {
    setSelectedSiGunGuCode(code);
    setSelectedSiGunGuName(name);
    setSelectedEupMyeonDongCode("");
    setSelectedEupMyeonDongName("");
  };

  const handleEupMyeonDongChange = (code, name) => {
    setSelectedEupMyeonDongCode(code);
    setSelectedEupMyeonDongName(name);
  };

  const createValueTxts = () => {
    setCreateNameArray([...createNameArray, { sido: selectedSidoName, siGunGu: selectedSiGunGuName, eupMyeonDong: selectedEupMyeonDongName }]);
    setSelectedSidoName("");
    setSelectedSidoCode("");
    setSelectedSiGunGuName("");
    setSelectedSiGunGuCode("");
    setSelectedEupMyeonDongName("");
    setSelectedEupMyeonDongCode("");
  };

  return (
    <div className="App">
      <label htmlFor="sido">시도 선택 : </label>
      <SelectSido
        onChange={handleSidoChange}
        selectedSidoCode={selectedSidoCode}
        disabled={false}
      />
      <SelectSiGunGu
        onChange={handleSiGunGuChange}
        siDoCode={selectedSidoCode}
        selectedSiGunGuCode={selectedSiGunGuCode}
        disabled={!selectedSidoCode}
      />
      <SelectEupMyeonDong
        onChange={handleEupMyeonDongChange}
        siDoCode={selectedSidoCode}
        siGunGuCode={selectedSiGunGuCode}
        selectedEupMyeonDongCode={selectedEupMyeonDongCode}
        disabled={!selectedSiGunGuCode}
      />
      <button onClick={createValueTxts}>추가</button>
      <div>
        {createNameArray.map((name, index) => (
          <div key={index}>
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
