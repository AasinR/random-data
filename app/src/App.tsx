import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataListPage from './pages/DataListPage';
import DataPage from './pages/DataPage';
import NavBar from './components/navbar/NavBar';

function App() {
    
    return (
        <div>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path='' element={<TestHome />}/>
                    <Route path='data'>
                        <Route path='' element={<DataListPage />}/>
                        <Route path=':dataId' element={<DataPage />}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
	);
}

function TestHome() {
    const items = [];
    for (let i=0; i<100; i++) {
        items.push(
            <p className='test'> Number: {i}</p>
        );
    }
    return (
        <div>
            {items}
        </div>
    );
}

export default App;
