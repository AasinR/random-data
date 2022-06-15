import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DataPage from './components/data/DataPage';
import NavBar from './components/navbar/NavBar';

function App() {
    
    return (
        <div>
            <NavBar />
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<TestHome />}/>
                    <Route path='/data' element={<DataPage />}/>
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
