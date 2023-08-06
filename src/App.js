import { Route, Routes } from 'react-router-dom';
import './App.css';
import Hero from './components/Hero/Hero';
import Match from './components/Match/Match';
import List from './components/List/List';
import Cabinet from './components/Cabinet/Cabinet';
import Navbar from './components/Navbar/Navbar';

// npx generate-react-cli component Box
function App() {
    return (
        <div className='App'>
            <Navbar />
            <main className='mt-20 p-6'>
                <Routes>
                    <Route path={'/'} element={<Hero />} />
                    <Route path={'/match'} element={<Match />} />
                    <Route path={'/list'} element={<List />} />
                    <Route path={'/cabinet'} element={<Cabinet />} />
                    <Route path={'/*'} element={<Hero />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
