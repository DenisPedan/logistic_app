import React, {useState} from 'react';
import './App.css';
import RequestsTable from "./components/RequestsTable";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Request from "./components/Request";
import {defaultState} from "./components/CreateAndEditWindow";
import {ThemeProvider} from "@gravity-ui/uikit";

function App() {

  const [adminMode, setAdminMode] = useState(false)
  const [requestData, setRequestData] = useState(defaultState)

  return (
      <ThemeProvider>
        <BrowserRouter>
              <div className="App">
                    <div className='navbar'>
                      <button className='button' onClick={() => setAdminMode(prev => !prev)}>
                          {
                              adminMode ? 'Выйти из режима администратора' : 'Стать администратором'
                          }
                      </button>
                    </div>
                    <Routes >
                        <Route path='/' element={<RequestsTable setRequestData={setRequestData} adminMode={adminMode}/>}/>
                        {adminMode && <Route path='/request/:id' element={<Request requestData={requestData}/>}/>}
                    </Routes>
              </div>
        </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
