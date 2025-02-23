import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { ArcElement, Chart as ChartJS } from "chart.js";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


ChartJS.register(ArcElement);


const DAYS_IN_CYCLE = 30; // Adjustable cycle length

const getCurrentDateInfo = () => {
 const now = new Date();
 return {
   day: now.getDate() % DAYS_IN_CYCLE,
   month: now.toLocaleString('default', { month: 'long' }),
   year: now.getFullYear()
 };
};


const generateTrackingData = (highlightedDay, isCurrentMonth) => {
 return Array.from({ length: DAYS_IN_CYCLE }, (_, i) => ({
   day: i + 1,
   isToday: isCurrentMonth && i + 1 === getCurrentDateInfo().day,
   isHighlighted: i + 1 === highlightedDay,
 }));
};


const Tracking = () => {
 const [isMenuOpen, setIsMenuOpen] = useState(false); // State for toggling the menu
 const [{ day: today, month: currentMonth, year: currentYear }] = useState(getCurrentDateInfo());
 const [selectedMonth, setSelectedMonth] = useState(currentMonth);
 const [selectedYear, setSelectedYear] = useState(currentYear);
 const [highlightedDay, setHighlightedDay] = useState(today);
 const [medications, setMedications] = useState([]);
 const [newMed, setNewMed] = useState({ name: "", dosage: "", time: "" });
 const [trackingData, setTrackingData] = useState(generateTrackingData(highlightedDay, selectedMonth === currentMonth && selectedYear === currentYear));
 const [selectedSymptoms, setSelectedSymptoms] = useState([]);
 const [showCalendar, setShowCalendar] = useState(false); // Calendar state

 const isCurrentMonth = selectedMonth === currentMonth && selectedYear === currentYear;

 const handleSymptomChange = (symptom) => {
   setSelectedSymptoms((prevSymptoms) => {
     if (prevSymptoms.includes(symptom)) {
       return prevSymptoms.filter((item) => item !== symptom);
     } else {
       return [...prevSymptoms, symptom];
     }
   });
 };


 useEffect(() => {
   setTrackingData(generateTrackingData(highlightedDay, isCurrentMonth));
 }, [highlightedDay, selectedMonth, selectedYear]);


 const adjustDate = (increment) => {
   let newDay = highlightedDay + increment;
   let newMonth = selectedMonth;
   let newYear = selectedYear;
   if (newDay < 1) {
     newDay = DAYS_IN_CYCLE;
     const date = new Date(`${selectedMonth} 1, ${selectedYear}`);
     date.setMonth(date.getMonth() - 1);
     newMonth = date.toLocaleString('default', { month: 'long' });
     newYear = date.getFullYear();
   } else if (newDay > DAYS_IN_CYCLE) {
     newDay = 1;
     const date = new Date(`${selectedMonth} 1, ${selectedYear}`);
     date.setMonth(date.getMonth() + 1);
     newMonth = date.toLocaleString('default', { month: 'long' });
     newYear = date.getFullYear();
   }
   setSelectedMonth(newMonth);
   setSelectedYear(newYear);
   setHighlightedDay(newDay);
 };

 const addMedication = () => {
   if (newMed.name && newMed.dosage && newMed.time) {
     setMedications((prevMeds) =>
       [...prevMeds, { ...newMed, taken: false }].sort((a, b) => a.time.localeCompare(b.time))
     );
     setNewMed({ name: "", dosage: "", time: "" });
   }
 };

 const removeMedication = (index) => {
   setMedications((prevMeds) => prevMeds.filter((_, i) => i !== index));
 };

 const toggleMedication = (index) => {
   setMedications((prevMeds) =>
     prevMeds.map((med, i) => (i === index ? { ...med, taken: !med.taken } : med))
   );
 };

 const toggleSymptom = (symptom) => {
   setSelectedSymptoms((prevSymptoms) =>
     prevSymptoms.includes(symptom)
       ? prevSymptoms.filter((s) => s !== symptom)
       : [...prevSymptoms, symptom]
   );
 };

 const openCalendarWindow = () => {
  const calendarWindow = window.open(
    "",
    "Calendar",
    "width=400,height=500,scrollbars=no,resizable=no"
  );

  if (calendarWindow) {
    calendarWindow.document.write(`
      <html>
  <head>
    <title>Select a Date</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/react-datepicker/4.8.0/react-datepicker.min.css">
    <style>
      body {
        font-family: Arial, sans-serif;
        text-align: center;
        padding: 20px;
      }
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .calendar {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-gap: 5px;
        justify-items: center;
        margin-top: 20px;
      }
      .calendar button {
        width: 30px;
        height: 30px;
        border: 1px solid #ccc;
        background-color: #fff;
        font-size: 14px;
        cursor: pointer;
      }
      .calendar button:hover {
        background-color: #f0f0f0;
      }
      .calendar .today {
        background-color: #4CAF50;
        color: white;
      }
      .calendar .selected {
        background-color: #00BFFF;
        color: white;
      }
      button {
        margin-top: 10px;
        padding: 5px 10px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <button id="prevMonth">Prev Month</button>
      <p id="monthDisplay"></p>
      <button id="nextMonth">Next Month</button>

      <div class="calendar" id="calendarGrid"></div>

      <button id="selectButton">Select Date</button>
    </div>

    <script>
      let currentDate = new Date();
      let selectedDate = null;

      function renderCalendar() {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();

        // Set month display
        const monthName = currentDate.toLocaleString('default', { month: 'long' });
        document.getElementById('monthDisplay').innerText = monthName + " " + year;

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startDay = firstDay.getDay();
        const calendarGrid = document.getElementById('calendarGrid');

        // Clear the grid before rendering
        calendarGrid.innerHTML = '';

        // Add empty cells before the first day of the month
        for (let i = 0; i < startDay; i++) {
          const emptyCell = document.createElement('button');
          calendarGrid.appendChild(emptyCell);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
          const dayButton = document.createElement('button');
          dayButton.innerText = day;
          dayButton.addEventListener('click', function () {
            selectedDate = new Date(year, month, day);
            document.querySelectorAll('.calendar button').forEach(btn => btn.classList.remove('selected'));
            dayButton.classList.add('selected');
          });
          if (day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
            dayButton.classList.add('today');
          }
          calendarGrid.appendChild(dayButton);
        }
      }

      document.getElementById('prevMonth').addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
      });

      document.getElementById('nextMonth').addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
      });

      document.getElementById('selectButton').addEventListener('click', function () {
        if (selectedDate) {
          window.opener.updateDate(selectedDate.toISOString().split('T')[0]);
        } else {
          alert('Please select a valid date.');
        }
      });

      // Initial render
      renderCalendar();
    </script>
  </body>
</html>


    `);

    // Allow the parent page to update the date
    window.updateDate = (dateString) => {
      const selectedDate = new Date(dateString);
      setSelectedMonth(selectedDate.toLocaleString("default", { month: "long" }));
      setSelectedYear(selectedDate.getFullYear());
      setHighlightedDay(selectedDate.getDate());
    };
  }
};

 const data = {
   labels: trackingData.map((d) => d.day.toString()),
   datasets: [
     {
       data: Array(DAYS_IN_CYCLE).fill(1),
       backgroundColor: trackingData.map((d) =>
         d.isToday ? "#00ff00" : d.isHighlighted ? "#ff1493" : "#ffcccb"
       ),
     },
   ],
 };

 return (
   <div className="relative min-h-screen flex flex-col items-center justify-start pt-6 bg-gray-900">
     <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="absolute top-4 right-4 p-2 bg-blue-600 text-white rounded-full">&#9776;</button>
     {isMenuOpen && (
       <div className="absolute top-10 right-4 bg-white shadow-lg rounded-md p-4 w-48">
         <ul>
           <li><a href="#/" className="block px-4 py-2 text-blue-600 hover:bg-gray-100">Home</a></li>
           <li><a href="#/personal-info" className="block px-4 py-2 text-blue-600 hover:bg-gray-100">Personal Info</a></li>
           <li><a href="#/AI-Assistant" className="block px-4 py-2 text-blue-600 hover:bg-gray-100">AI Assistant</a></li>
           <li><a href="#/tracking" className="block px-4 py-2 text-blue-600 hover:bg-gray-100">Tracking</a></li>
           <li><a href="#/about" className="block px-4 py-2 text-blue-600 hover:bg-gray-100">About Us</a></li>
         </ul>
       </div>
     )}

     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
       <div className="flex space-x-4 mb-4">
         <select
           className="bg-gray-800 text-white px-4 py-2 rounded"
           value={selectedMonth}
           onChange={(e) => setSelectedMonth(e.target.value)}
         >
           {Array.from({ length: 12 }, (_, i) => {
             const monthName = new Date(0, i).toLocaleString('default', { month: 'long' });
             return <option key={i} value={monthName}>{monthName}</option>;
           })}
         </select>
         <input
           type="number"
           className="bg-gray-800 text-white px-4 py-2 rounded"
           value={selectedYear}
           onChange={(e) => setSelectedYear(Number(e.target.value))}
         />
       </div>
       <h2 className="text-2xl font-bold mb-4">Tracking - {selectedMonth} {highlightedDay} of the cycle</h2>
       <div className="w-72 h-72 relative">
         <Pie data={data} options={{ responsive: true, cutout: "80%" }} />
         <button
            onClick={openCalendarWindow}
            className="absolute inset-0 m-auto bg-purple-800 text-white p-2 rounded-full w-12 h-12 flex items-center justify-center"
          >
          📅
      </button>
       </div>
       <div className="flex mt-4 space-x-4">
         <button className="bg-blue-500 px-4 py-2 rounded text-white" onClick={() => adjustDate(-1)}>← Previous Day</button>
         <button className="bg-gray-800 px-4 py-2 rounded-full text-white" onClick={() => {
           setSelectedMonth(currentMonth);
           setSelectedYear(currentYear);
           setHighlightedDay(today);
         }}>Back to Today</button>
         <button className="bg-blue-500 px-4 py-2 rounded text-white" onClick={() => adjustDate(1)}>Next Day →</button>
       </div>
       {/* Medication Tracker */}
       <div className="mt-10 w-1/2">
         <h3 className="text-xl font-bold text-center">Medication Tracker</h3>
         <div className="flex space-x-2 mt-2 justify-center">
           <input type="text" placeholder="Medication" className="px-2 py-1 text-black rounded" value={newMed.name} onChange={(e) => setNewMed({ ...newMed, name: e.target.value })} />
           <input type="text" placeholder="Dosage" className="px-2 py-1 text-black rounded" value={newMed.dosage} onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })} />
           <input type="time" className="px-2 py-1 text-black rounded" value={newMed.time} onChange={(e) => setNewMed({ ...newMed, time: e.target.value })} />
           <button className="bg-green-500 px-3 py-1 rounded" onClick={addMedication}>+</button>
         </div>
         <ul className="mt-4">
           {medications.map((med, index) => (
             <li key={index} className="flex justify-between items-center bg-gray-800 px-4 py-2 mt-2 rounded">
               <span>{med.name} - {med.dosage} at {med.time}</span>
               <div className="flex space-x-2">
                 <input type="checkbox" checked={med.taken} onChange={() => toggleMedication(index)} />
                 <button className="bg-red-500 px-2 py-1 rounded text-white" onClick={() => removeMedication(index)}>-</button>
               </div>
             </li>
           ))}
         </ul>
       </div>

       {/* Symptom selection section */}
        <div className="mt-8 w-full mb-8">
          <h3 className="text-xl font-bold text-center">Symptoms</h3>
          <div className="mt-4 grid grid-cols-4 gap-4">
            {[
              "Headache", "Fatigue", "Nausea", "Mood swings",
              "Dizziness", "Bloating", "Restlessness", "Irritable", "Light headed", "Insomnia", "Constipation", "Diarrhea"
            ].map((symptom, index) => (
              <label key={index} className="flex flex-col items-center mt-4 space-y-2 text-white">
                <div
                  className={`w-24 h-12 flex items-center justify-center border-2 rounded-md cursor-pointer ${
                    selectedSymptoms.includes(symptom) ? "bg-green-500 border-green-500" : "bg-gray-500 border-gray-300"
                  }`}
                  onClick={() => handleSymptomChange(symptom)}
                >
                  <span className="text-center text-white">{symptom}</span>
                </div>
              </label>
            ))}
          </div>
        </div>



     </div>

     <footer className="mt-24 text-center text-gray-500 mb-8">
        <p>&copy; {new Date().getFullYear()} TrackRx. All rights reserved.</p>
      </footer>
   </div>
 );
};


export default Tracking;





