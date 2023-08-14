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
        <div className='App overflow-hidden'>
            <main className='p-3 lg:max-w-md mx-auto mb-10'>
                <Routes>
                    <Route
                        path={'/'}
                        element={currentUser ? <Cabinet /> : <Hero />}
                    />
                    {currentUser && (
                        <>
                            <Route path={'/match'} element={<Match />} />
                            <Route path={'/list'} element={<List />} />
                            {/* <Route path={'/cabinet'} element={<Cabinet />} /> */}
                            <Route path={'/*'} element={<Cabinet />} />
                        </>
                    )}
                </Routes>
            </main>
            {currentUser && <BottomBar />}
        </div>
    );
}

export default App;
