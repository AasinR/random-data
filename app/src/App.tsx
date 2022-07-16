import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DataListPage, DataPage, DatePage, ErrorPage, PasswordPage, RandomPage } from './pages';
import { NavBar } from './components';

function App() {

    return (
        <div>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path='' element={<TestHome />} />
                    <Route path='data'>
                        <Route path='' element={<DataListPage />} />
                        <Route path=':dataId' element={<DataPage />} />
                    </Route>
                    <Route path='random'>
                        <Route path='' element={<RandomPage />} />
                        <Route path='password' element={<PasswordPage />} />
                        <Route path='date' element={<DatePage />} />
                    </Route>
                    <Route path='*' element={<ErrorPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

function TestHome() {
    const items = [];
    for (let i = 0; i < 100; i++) {
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
