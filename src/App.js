import { Route, Routes } from 'react-router-dom';
import './App.css';
import Hero from './components/Hero/Hero';
import Match from './components/Match/Match';
import List from './components/List/List';
import Cabinet from './components/Cabinet/Cabinet';
import Navbar from './components/Navbar/Navbar';
import { useSelector } from 'react-redux';
import BottomBar from './components/BottomBar/BottomBar';

// npx generate-react-cli component Box
function App() {
    const currentUser = useSelector((state) => state.user.user);

    return (
        <div className='App overflow-hidden bg-gradient-to-r from-[#6fcf48] to-[#94e9ad] min-h-screen'>
            <main className='p-3 lg:max-w-md mx-auto mb-10'>
                <Routes>
                    <Route
                        path={'/'}
                        element={currentUser ? <Cabinet /> : <Hero />}
                    />
                    <Route
                        path={'/*'}
                        element={currentUser ? <Cabinet /> : <Hero />}
                    />
                    {currentUser && (
                        <>
                            <Route path={'/match'} element={<Match />} />
                            <Route path={'/list'} element={<List />} />
                            {/* <Route path={'/cabinet'} element={<Cabinet />} /> */}
                        </>
                    )}
                </Routes>
            </main>
            {currentUser && <BottomBar />}
        </div>
    );
}

export default App;
