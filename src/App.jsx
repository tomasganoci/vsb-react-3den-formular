import React, { useState, useEffect } from "react";
import "./App.css";
import "./functions/validateFloat";
import RbGroup from "./components/RbGroup";
import ChbGroup from "./components/ChbGroup";
import NumImp from "./components/NumImp";
import Select from "./components/Select";
import Range from "./components/Range";
import Clock from "./components/Clock";
import validateFloat from "./functions/validateFloat";
import ProgressBar from "./components/ProgressBar";
import Button from "./components/Button";
import TextArea from "./components/TextArea";
import File from "./components/File";
import TextBox from "./components/TextBox";
import saveText from "./functions/saveText";

function App() {
  // promt s validací
  useEffect(() => {
    let zadanyScitanec = prompt("Zadejte platný sčítanec", 0);
    while (!validateFloat(zadanyScitanec)) {
      zadanyScitanec = prompt("Zadejte sčítanec", 0);
    }
    setScitanec1(zadanyScitanec);
  }, []);
  // /promt s validací

  // RbGroup - výběr zmrzliny
  const prichuteZmrzlin = [
    { label: "Vanilková", value: "vanilkova" },
    { label: "Čokoládová", value: "cokoladova" },
    { label: "Míchaná", value: "michana" },
  ];
  const [prichut, setPrichut] = useState("vanilkova");
  // /RbGroup - výběr zmrzliny

  //ChbGroup
  const necoNavrch = [
    { label: "Kousky oříšků", value: "kouskyOrisku" },
    { label: "Čoko hoblinky", value: "cokoHoblinky" },
    { label: "Karamelové křupinky", value: "karameloveKrupinky" },
  ];
  const [pridavky, setPridavky] = useState([]);
  // /ChbGroup

  // NumImp - počet kopečků
  const [kopecky, setKopecky] = useState(1);
  // /NumImp - počet kopečků

  // Select - výběr druhu zmrzliny
  const seznamDruhu = ["Smetanová", "Jogurtová", "Nízkotučná"];
  const [druh, setDruh] = useState("Jogurtová");
  // /Select - výběr druhu zmrzliny

  // Range - místo na disku
  const [disk, setDisk] = useState(50);
  // /Range - místo na disku

  // ProgressBar
  const initialCountDown = 10;
  const [countDown, setCountDown] = useState(initialCountDown);

  useEffect(() => {
    if (countDown > 0) {
      const timer = setTimeout(() => {
        setCountDown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countDown]);

  const progress =
    countDown > 0
      ? ((initialCountDown - countDown) / initialCountDown) * 100
      : 100;
  // /ProgressBar

  // TextBox - Sčítanec
  const [scitanec1, setScitanec1] = useState(0);
  const [scitanec2, setScitanec2] = useState(0);
  const [vysledek, setVysledek] = useState(
    "Zadejte validní sčítance a zmáčkněte tlačítko výpočtu"
  );
  // /TextBox - Sčítanec

  // TextArea
  const [text, setText] = useState("");
  // /TextArea

  // File

  // /File

  // handleData
  const handlers = {
    "rgb-prichut": setPrichut,
    "chb-pridavek": setPridavky,
    "num-kopecky": (data) => data >= 1 && data <= 4 && setKopecky(data),
    "sel-druh": setDruh,
    "rng-disk": setDisk,
    "txtbox-scitanec1": setScitanec1,
    "txtbox-scitanec2": setScitanec2,
    "txtarea-text": setText,
    "file-nacist": setText,

    // handleEvent
    "btn-soucet": () =>
      validateFloat(scitanec1) && validateFloat(scitanec2)
        ? setVysledek(`Součet je ${parseFloat(scitanec1) + parseFloat(scitanec2)}`)
        : setVysledek("Zadejte validní hodnotu!"),
    "btn-stahni": () => saveText(text),
  };

  const handleData = (data, source) => {
    if (handlers[source]) {
      handlers[source](data);
    }
  };
  // /handleData

  // handleEvent

  const handleEvent = (source) => {
    if (handlers[source]) {
      handlers[source]();
    }
  };
  // /handleEvent

  return (
    <div className="bg-info-subtle vw-100 vh-100">
      <div className="container bg-warning-subtle">
        <div className="row px-3">
          <div className="col-6 my-3">
            <p>
              {prichuteZmrzlin.map((item) =>
                item.value === prichut ? item.label : ""
              )}{" "}
              <span>{pridavky.map((pridavek) => pridavek + " ")}</span>{" "}
              {kopecky} kopečky {druh}
            </p>
            <RbGroup
              dataIn={prichuteZmrzlin}
              handleData={handleData}
              id="rgb-prichut"
              label="Příchuť zmrzliny"
              selectedValue={prichut}
            />
            <ChbGroup
              dataIn={necoNavrch}
              handleData={handleData}
              id="chb-pridavek"
              label="Něco navrch?"
              selectedValue={pridavky}
            />
            <NumImp
              dataIn={kopecky}
              handleData={handleData}
              id="num-kopecky"
              label="Počet kopečků (max 4)"
            />
            <Select
              dataIn={seznamDruhu}
              handleData={handleData}
              id="sel-druh"
              label="Vyber druh zmrzliny"
              selectedValue={druh}
            />
            <Range
              dataIn={disk}
              handleData={handleData}
              id="rng-disk"
              label="Místo na disku"
              max="100"
              min="0"
            />
            <p>
              <Clock />, zbývá {disk}% místa na disku
            </p>
          </div>
          <div className="col-6 my-3">
            <ProgressBar dataIn={progress} id="Progress" />
            <p>Instalace probíhá, čekejte {countDown} sekund.</p>
            <div className="row">
              <div className="col-6 my-3">
                <TextBox
                  dataIn={scitanec1}
                  handleData={handleData}
                  id="txtbox-scitanec1"
                  label="Sčítanec 1"
                />
              </div>
              <div className="col-6 my-3">
                <TextBox
                  dataIn={scitanec2}
                  handleData={handleData}
                  id="txtbox-scitanec2"
                  label="Sčítanec 2"
                />
              </div>
              <div className="col-6 my-3">
                <Button
                  handleEvent={handleEvent}
                  id="btn-soucet"
                  label="Vypočítej součet"
                />
              </div>
              <div className="col-6 my-3">{vysledek}</div>
            </div>
            <TextArea
              dataIn={text}
              handleData={handleData}
              height="200"
              id="txtarea-text"
              label="Operace s textem"
            />
            <div className="row">
              <div className="col-6 my-3">
                <File
                  handleData={handleData}
                  id="file-nacist"
                  label="Načti text ze souboru"
                />
              </div>
              <div className="col-6 my-3">
                <Button
                  handleEvent={handleEvent}
                  id="btn-stahni"
                  label="Stáhni soubor s textem"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
