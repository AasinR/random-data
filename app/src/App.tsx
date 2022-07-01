import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DataListPage, DataPage, ErrorPage } from './pages';
import { NavBar } from './components';

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
                    <Route path='*' element={<ErrorPage />}/>
                </Routes>
            </BrowserRouter>
        </div>
	);
}

function TestHome() {
    const items = [];
    for (let i=0; i<100; i++) {
        items.push(
            <p key={i} className='test'> Number: {i}</p>
        );
    }
    return (
        <div>
            {items}
        </div>
    );
}

export default App;
