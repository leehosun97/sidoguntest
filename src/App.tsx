import { useState } from "react";
import SelectSido from "./component/SelectSido";
import SelectSiGunGu from "./component/SelectSiGunGu";
import SelectEupMyeonDong from "./component/SelectEupMyeonDong";

function App() {
  interface ICreateNameArray {
    sido: string;
    siGunGu: string;
    eupMyeonDong: string;
  }
  const [createNameArray, setCreateNameArray] = useState<ICreateNameArray[]>([]);
  const [selectedSidoInfo, setSelectedSidoInfo] = useState({ code: "", name: "" });
  const [selectedSiGunGuInfo, setSelectedSiGunInfo] = useState({ code: "", name: "" });
  const [selectedEupMyeonDongInfo, setSelectedEupMyeonDongInfo] = useState({ code: "", name: "" });


  const handleSidoChange = (code: string, name: string) => {
    setSelectedSidoInfo({ code, name });
    setSelectedSiGunInfo({ code:"", name:"" });
    setSelectedEupMyeonDongInfo({ code:"", name:"" });
  };

  const handleSiGunGuChange = (code: string, name: string) => {
    setSelectedSiGunInfo({ code, name });
    setSelectedEupMyeonDongInfo({ code:"", name:"" });
  };

  const handleEupMyeonDongChange = (code: string, name: string) => {
    setSelectedEupMyeonDongInfo({ code, name })
  };

  const createValueTxts = () => {
    setCreateNameArray([...createNameArray, { sido: selectedSidoInfo.name, siGunGu: selectedSiGunGuInfo.name, eupMyeonDong: selectedEupMyeonDongInfo.name }]);
    setSelectedSidoInfo({ code:"", name:"" });
    setSelectedSiGunInfo({ code:"", name:"" })
    setSelectedEupMyeonDongInfo({ code:"", name:"" });
  };

  return (
    <div className="App">
      <label htmlFor="sido">시도 선택 : </label>
      <SelectSido
        onChange={handleSidoChange}
        selectedSidoCode={selectedSidoInfo.code}
        disabled={false}
      />
      <SelectSiGunGu
        onChange={handleSiGunGuChange}
        siDoCode={selectedSidoInfo.code}
        selectedSiGunGuCode={selectedSiGunGuInfo.code}
        disabled={!selectedSidoInfo.code}
      />
      <SelectEupMyeonDong
        onChange={handleEupMyeonDongChange}
        siDoCode={selectedSidoInfo.code}
        siGunGuCode={selectedSiGunGuInfo.code}
        selectedEupMyeonDongCode={selectedEupMyeonDongInfo.code}
        disabled={!selectedSiGunGuInfo.code}
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
