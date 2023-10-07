import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const ActivityDisplay = ({
  type,
  name,
  descrition,
  startDate,
  endDate,
  time,
  weight,
}) => {
  console.log(type);
  console.log(name);
  console.log(descrition);
  const [dateRange, setDateRange] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [numberOfDays, setNumberOfDays] = useState(0);

  // เรียกใช้ calculateDays เมื่อ startDate หรือ endDate เปลี่ยนแปลง
  useEffect(() => {
    calculateDays();
  }, [startDate, endDate]);

  const calculateDays = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const daysDifference = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      setNumberOfDays(daysDifference + 1);

      // Create an array of dates within the range
      const range = [];
      for (let i = 0; i <= daysDifference; i++) {
        const currentDate = new Date(start);
        currentDate.setDate(currentDate.getDate() + i);
        range.push(currentDate.toDateString());
      }
      setDateRange(range);

      // Initialize selected dates to all false
      setSelectedDates(new Array(range.length).fill(false));
    } else {
      setNumberOfDays(0);
      setDateRange([]);
      setSelectedDates([]);
    }
  };

  const handleCheckboxChange = (index) => {
    const newSelectedDates = [...selectedDates];
    newSelectedDates[index] = !newSelectedDates[index];
    setSelectedDates(newSelectedDates);
  };

  // สูตรหา Kcal
  const [totalkcal, setTotalkcal] = useState();
  const [kcal, setKcal] = useState();

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
      const totalKcal = kcal * numberOfDays;
      setTotalkcal(totalKcal.toFixed(2));
      setKcal(kcal.toFixed(2));
    } else {
      toast.error("Choose Type for Activity");
    }
  };

  useEffect(() => {
    calculateActivity();
  }, [type, numberOfDays]);

  return (
    <div className="m-2 bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 mt-2">
      <ToastContainer />
      {numberOfDays > 0 && (
        <div>
          <p className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
            Number of days: {numberOfDays}
          </p>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Selected
                </th>
                <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Index
                </th>
                <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Date
                </th>
                <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Type
                </th>
                <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Activity Name
                </th>
                <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Descrition
                </th>
                <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Time
                </th>
                <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Kcal
                </th>
                <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  KG
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
              {dateRange.map((date, index) => (
                <tr key={index}>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedDates[index]}
                      onChange={() => handleCheckboxChange(index)}
                      className="px-4 py-4 ml-5"
                    />
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                    {index}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                    {date}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                    {type}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                    {name}
                  </td>
                  <td className="bg-gray-900 px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                    {descrition}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                    {time}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                    {kcal}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                    Null
                  </td>
                </tr>
              ))}
              <tr className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                <td className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"></td>
                <td className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"></td>
                <td className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"></td>
                <td className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"></td>
                <td className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"></td>
                <td className="px-4 py-3.5 text-sm font-bold text-center rtl:text-left text-gray-500 dark:text-gray-100">
                  TOTAL
                </td>
                <td className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-gray-500 dark:text-gray-100">
                  {time * numberOfDays}
                </td>
                <td className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-gray-500 dark:text-gray-100">
                  {totalkcal}
                </td>
                <td className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-gray-500 dark:text-gray-100">
                  Null
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ActivityDisplay;
