import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ActivityDisplay from "./ActivityDisplay";
import IndexActivity from "./IndexActivity";

const test = [
  {
    id: 1,
    type: "test",
    name: "test1",
    descrition: "tes",
    startdate: "2023-09-20",
    time: 10,
    weight: 50,
  },
];

const ActivityForm = () => {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [descrition, setDescrition] = useState("");
  const [startdate, setStartdate] = useState(new Date());
  const [time, setTime] = useState(0);
  const [weight, setWeight] = useState(0);
  const [kcal, setKcal] = useState(null);
  const [kilogram, setKilogram] = useState(null);
  const [newData, setNewData] = useState(test);
  const cal = `${kcal} kcal`;
  const kilo = `${kilogram} kg`;

  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, "0");
  const day = String(new Date().getDate()).padStart(2, "0");
  const hours = String(new Date().getHours()).padStart(2, "0");
  const minutes = String(new Date().getMinutes()).padStart(2, "0");
  const seconds = String(new Date().getSeconds()).padStart(2, "0");
  const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

  const Data = (newData) => {
    setNewData((prevItem) => {
      return [...prevItem, newData];
    });
  };
  console.log(newData);

  useEffect(() => {
    type === "Run"
      ? setName("Run")
      : type === "Yoga"
      ? setName("Yoga")
      : type === "Aerobics"
      ? setName("Aerobics")
      : type === "KitaMuaythai"
      ? setName("KitaMuaythai")
      : type === "Training"
      ? setName("Weight Training")
      : "";
  }, [type]);

  const isValidate = () => {
    let proceed = true;
    let errMsg = "Enter your : ";
    if (type === null || type === "") {
      proceed = false;
      errMsg += "Please Select Type ";
    }
    if (name === null || name === "") {
      proceed = false;
      errMsg += "Activity Name ";
    }
    if (descrition === null || descrition === "") {
      proceed = false;
      errMsg += "Descrition ";
    }
    if (time === null || time === 0) {
      proceed = false;
      errMsg += "Time ";
    }
    if (weight === null || weight === 0) {
      proceed = false;
      errMsg += "Weight ";
    }
    if (!proceed) {
      toast.warning(errMsg);
      console.log(errMsg);
    }
    return proceed;
  };

  const saveData = (e) => {
    e.preventDefault();
    if (isValidate()) {
      const formData = {
        id: uuidv4(),
        type: type,
        name: name,
        descrition: descrition,
        startdate: startdate,
        time: parseInt(time),
        weight: parseFloat(weight),
        kcal: parseFloat(kcal),
        kilogram: parseFloat(kilogram),
      };
      Data(formData);
      setType();
      setName("");
      setDescrition("");
      setTime(0);
      setStartdate("");
      setWeight(0);
      setKcal();
      setKilogram();
    }
  };

  // calculate kcal and kilogram
  const calculateActivity = () => {
    const METs = {
      Run: 9.6,
      Yoga: 2.5,
      Aerobics: 5,
      Muaythai: 6,
      Training: 8,
    };

    if (type in METs) {
      const met = METs[type];
      const kcal = met * 0.0175 * weight * time;
      const cal = kcal / 7700;
      setKcal(kcal.toFixed(2));
      setKilogram(cal.toFixed(2));
    } else {
      // toast.success("Welcome to ActivityForm");
    }
  };

  useEffect(() => {
    calculateActivity();
  }, [type, time, weight]);

  useEffect(() => {
    setInterval(() => setStartdate(new Date()), 3000);
  }, []);

  return (
    <div className="flex h-screen dark:bg-[#0b0f32]">
      <div className="flex flex-col items-center m-auto sm:p-10 p-5 rounded-xl shadow-lg border-2">
        <h1 className="my-5 text-center text-4xl font-bold leading-9 tracking-tight text-[#8278d9]">
          ActivityForm
        </h1>
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={saveData} className="space-y-6 ">
            {/* activity type */}
            <div className="flex h-1/2 leading-10">
              <label
                htmlFor="type"
                className="w-1/2 px-9 flex items-center justify-center bg-[#8278d9] text-white font-semibold rounded-l-lg hover:bg-indigo-500"
              >
                Activity Type
              </label>
              <select
                name="type"
                onChange={(e) => setType(e.target.value)}
                className="appearance-none rounded-r-lg px-2 focus:outline-none focus:ring-2 focus:ring-[#8278d9] focus:border-transparent ring-1 ring-inset ring-[#8278d9]"
              >
                <option className="text-[#131c85]" value="">
                  Please Select Activity type
                </option>
                <option className="text-[#131c85]" value="Run">
                  Run
                </option>
                <option className="text-[#131c85]" value="Yoga">
                  Yoga
                </option>
                <option className="text-[#131c85]" value="Aerobics">
                  Aerobics
                </option>
                <option className="text-[#131c85]" value="KitaMuaythai">
                  Kita Muaythai
                </option>
                <option className="text-[#131c85]" value="Training">
                  Weight Training
                </option>
              </select>
            </div>
            {/* activity-name */}
            <label className="flex rounded-lg leading-10">
              <span className="w-1/2 flex items-center  justify-center bg-[#8278d9] text-white font-semibold rounded-l-lg hover:bg-indigo-500">
                Activity Name
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="name"
                name="detial"
                className="w-full px-2 rounded-r-lg placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#8278d9] focus:border-transparent ring-1 ring-inset ring-[#8278d9]"
                placeholder="Activity Name"
              />
            </label>
            {/* descrition */}
            <label className="flex rounded-lg leading-10">
              <span className="w-1/2 flex items-center justify-center bg-[#8278d9] text-white font-semibold rounded-l-lg hover:bg-indigo-500">
                Description
              </span>
              <input
                value={descrition}
                onChange={(e) => setDescrition(e.target.value)}
                type="text"
                name="detial"
                className="w-full px-2 leading-snug rounded-r-lg placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#8278d9] focus:border-transparent ring-1 ring-inset ring-[#8278d9]"
                placeholder="Descrition"
                maxLength="50"
                rows="2"
              />
            </label>
            {/* duration  */}
            <label className="flex rounded-lg leading-10">
              <span className="w-1/2 flex items-center  justify-center bg-[#8278d9] text-white font-semibold rounded-l-lg hover:bg-indigo-500">
                Duration
              </span>
              <input
                value={time}
                onChange={(e) => setTime(e.target.value)}
                type="number"
                name="duration"
                className="w-full [&::-webkit-inner-spin-button]:appearance-none px-2 placeholder:text-sm rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#8278d9] focus:border-transparent ring-1 ring-inset ring-[#8278d9]"
                placeholder="Minute"
              />
            </label>
            {/* Weight */}
            <label className="flex rounded-lg leading-10">
              <span className="w-1/2 flex items-center  justify-center bg-[#8278d9] text-white font-semibold rounded-l-lg hover:bg-indigo-500">
                Current weight
              </span>
              <input
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                type="number"
                name="weight"
                className="w-full [&::-webkit-inner-spin-button]:appearance-none px-2 rounded-r-lg placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#8278d9] focus:border-transparent ring-1 ring-inset ring-[#8278d9]"
                placeholder="Kilogram"
              />
            </label>
            {/* Date */}
            <label className="flex rounded-lg leading-10">
              <span className="w-1/2 flex items-center  justify-center bg-[#8278d9] text-white font-semibold rounded-l-lg hover:bg-indigo-500">
                Date
              </span>
              <input
                value={formattedDateTime}
                onChange={() => setStartdate(startdate)}
                type="text"
                name="date"
                className="bg-white text-sm w-full px-2 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#8278d9] focus:border-transparent ring-1 ring-inset ring-[#8278d9]"
                disabled
              />
            </label>
            {/* Calories Burned  */}
            <label className="flex rounded-lg leading-10">
              <span className="w-1/2 flex items-center justify-center bg-[#8278d9] text-white font-semibold rounded-l-lg hover:bg-indigo-500">
                Calories Burn
              </span>
              <input
                value={kcal === null ? "0" : cal}
                type="text"
                name="date"
                className="bg-white w-full px-2 rounded-r-lg placeholder:text-[#131c85] focus:outline-none focus:ring-2 focus:ring-[#8278d9] focus:border-transparent ring-1 ring-inset ring-[#8278d9]"
                disabled
              />
            </label>
            {/* kilogram bure */}
            <label className="flex rounded-lg leading-10">
              <span className="w-1/2 flex items-center justify-center bg-[#8278d9] text-white font-semibold rounded-l-lg hover:bg-indigo-500">
                Kilogram Burn
              </span>
              <input
                value={kcal === null ? "0" : kilo}
                type="text"
                name="date"
                className="bg-white w-full px-2 rounded-r-lg placeholder:text-[#131c85] focus:outline-none focus:ring-2 focus:ring-[#8278d9] focus:border-transparent ring-1 ring-inset ring-[#8278d9]"
                disabled
              />
            </label>

            <div className="flex justify-end">
              <button
                type="submit"
                className=" flex w-1/2 justify-center rounded-full rounded-tl-lg bg-[#8278d9] px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                CONFIRM
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />

        {/* <IndexActivity newData={newData} /> */}
      </div>
    </div>
  );
};
export default ActivityForm;
