import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import ResultPage from './components/ResultPage';
import Checkpoint from './components/Checkpoint';
import Checkpoint1 from './components/Checkpoint1';
import Checkpoint2 from './components/Checkpoint2';
import Checkpoint3 from './components/Checkpoint3';
import Checkpoint4 from './components/Checkpoint4';
import Checkpoint5 from './components/Checkpoint5';
import Finishline from './components/Finishline';
import Participateinmaster from './components/Participateinmaster';
import Racelogpoint1 from './components/Racelogpoint1';
import Startline from './components/Startline';
import Usermaster from './components/Usermaster';
import RegistrationTable from './components/RegistrationTable';
import Racetimes from './components/Racetimes';
import EventList from './components/EventList';
import RegistrationFilter from './components/RegistrationFilter';
// import EventResults from './components/EventSearch';
import Header from './components/Header';
import Footer from './components/Footer';
import EventResults from './components/EventResults';
import CategoryMaster from './components/CategoryMaster'; // Import CategoryMaster

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        {/* <Route path="/" element={<MainPage />} /> */}
        <Route path="/" element={<MainPage />} />
        <Route path="/ResultPage" element={<ResultPage />} />
        <Route path="/Checkpoint" element={<Checkpoint />} />
        <Route path="/Checkpoint1" element={<Checkpoint1 />} />
        <Route path="/Checkpoint2" element={<Checkpoint2 />} />
        <Route path="/Checkpoint3" element={<Checkpoint3 />} />
        <Route path="/Checkpoint4" element={<Checkpoint4 />} />
        <Route path="/Checkpoint5" element={<Checkpoint5 />} />
        <Route path="/Finishline" element={<Finishline />} />
        <Route path="/Participateinmaster" element={<Participateinmaster />} />
        <Route path="/Racelogpoint1" element={<Racelogpoint1 />} />
        <Route path="/Startline" element={<Startline />} />
        <Route path="/Usermaster" element={<Usermaster />} />
        <Route path="/RegistrationTable" element={<RegistrationTable />} />
        <Route path="/Racetimes" element={<Racetimes />} />
        <Route path="/EventList" element={<EventList />} />
        <Route path="/RegistrationFilter" element={<RegistrationFilter />} />
        <Route path="/EventResults/:event_id" element={<EventResults />} />
        <Route path="/CategoryMaster" element={<CategoryMaster />} /> {/* Add this route */}
      </Routes>
      <Footer />
    </Router>

  );
}

export default App;
