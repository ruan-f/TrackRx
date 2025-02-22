import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { ArcElement, Chart as ChartJS } from "chart.js";


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
 
 const isCurrentMonth = selectedMonth === currentMonth && selectedYear === currentYear;
 const [trackingData, setTrackingData] = useState(generateTrackingData(highlightedDay, isCurrentMonth));

 const [selectedSymptoms, setSelectedSymptoms] = useState([]);

 const handleSymptomChange = (symptom) => {
   setSelectedSymptoms((prevSymptoms) => {
     if (prevSymptoms.includes(symptom)) {
       // Remove the symptom if it's already in the list (uncheck it)
       return prevSymptoms.filter((item) => item !== symptom);
     } else {
       // Add the symptom to the list if it's not already there (check it)
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
       ? prevSymptoms.filter((s) => s !== symptom) // Remove symptom
       : [...prevSymptoms, symptom] // Add symptom
   );
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

 const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

 return (
   <div className="relative min-h-screen flex flex-col items-center justify-start pt-6 bg-gray-900">
     <button onClick={toggleMenu} className="absolute top-4 right-4 p-2 bg-blue-600 text-white rounded-full">&#9776;</button>
     {isMenuOpen && (
       <div className="absolute top-10 right-4 bg-white shadow-lg rounded-md p-4 w-48">
         <ul>
           <li><a href="#/" className="block px-4 py-2 text-blue-600 hover:bg-gray-100">Home</a></li>
           <li><a href="#/personal-info" className="block px-4 py-2 text-blue-600 hover:bg-gray-100">Personal Info</a></li>
           <li><a href="#/AI-Assistant" className="block px-4 py-2 text-blue-600 hover:bg-gray-100">AI Assistant</a></li>
           <li><a href="#/tracking" className="block px-4 py-2 text-blue-600 hover:bg-gray-100">Tracking</a></li>
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
        <div className="mt-8 w-2/3 mb-8">
          <h3 className="text-xl font-bold text-center">Symptoms</h3>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {[
              "Headache", "Fatigue", "Nausea", "Mood swings",
              "Cramps", "Dizziness", "Back pain", "Bloating",
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
   </div>
 );
};

export default Tracking;
