
import { useState } from 'react';
import './App.css';


function App() {
  

  return (
   <div style = {{"width":"330px"}}>
    <Header/>
    <NumberSelect/>
    <MyComponent/>
   </div>
  )
}

export default App;


function Header () {
  return (
   <div>
     <h1>Welcome to OnThisDay app ! </h1>
   </div>
  )
}

function NumberSelect() {
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth,setSelectedMonth] = useState('');
 

  const handleselectedDay = (event) => {
    setSelectedDay(event.target.value);
  };

  const handleselectedMonth = (event)=>{
    setSelectedMonth(event.target.value);
  }

  return (
    <div>
      <label htmlFor="daySelect">Select the day: </label>
      <select id="daySelect" value={selectedDay} onChange={handleselectedDay}>
        <option value=" ">DD</option>
        {[...Array(30).keys()].map((number) => (
               <option key={number + 1} value={number + 1}>
                 { number < 9 ? `0${number + 1}` : `${number + 1}`}
               </option>
        ))}
      </select>
      <div>
      <label htmlFor="monthSelect">Select the month: </label>
      <select id="monthSelect" value={selectedMonth} onChange={handleselectedMonth}>
        <option value=" ">MM</option>
        {[...Array(12).keys()].map((number) => (
          <option key={number + 1} value={number + 1}>
            { number < 9 ? `0${number + 1}` : `${number + 1}`}
          </option>
        ))}
      </select>
      </div>
      <FetchEvent selectedDay = {selectedDay} selectedMonth = {selectedMonth}/>
    </div>
  );
}

function FetchEvent({selectedDay,selectedMonth}) {
  
  const [allData, setAllData] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSelectedEvent = (event) => {
    setSelectedEvent(event.target.value.trim());
    setShowEventDetails(false); 
  };

  const fetchingAllData = async () => {
    setLoading(true);
    const apiUrl =  `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${selectedMonth}/${selectedDay}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setAllData(data);
      setShowEventDetails(true);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  return (
    <div className='sections-style'>
      <div>
        <label htmlFor="eventselect">Select the section you are interested in </label>
        <select id="eventselect" value={selectedEvent} onChange={handleSelectedEvent}>
          <option value="">Choose</option>
          <option value="births">Births</option>
          <option value="deaths">Deaths</option>
          <option value="holidays">Holidays</option>
          <option value="events">Events</option>
        </select>
      </div>
      <button className='search-button' onClick={fetchingAllData}>Search</button>

      {loading && (
        <div className="loading-container">
          <img src= "./public/Spinner@1x-1.0s-200px-200px.gif" className='gif-style' alt="Loading..." />
        </div>
      )}
      
      {showEventDetails && allData && selectedEvent && selectedEvent.trim() && (
        <div>
          <h2>{selectedEvent.charAt(0).toUpperCase() + selectedEvent.slice(1)}</h2>
          <ul>
            {allData[selectedEvent].map((chosen, index) => (
              <li key={index}>
                <p>{chosen.text} {chosen.year}</p>
              </li>
            ))}
          </ul>:
        </div>
      )}
    </div>
  );
}

const MyComponent = () => {
  
  const options = ['option3', 'option2', 'option3', 'option4'];

  
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <h2>Select Option:</h2>
      <select value={selectedOption} onChange={handleSelectChange}>
        
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};



