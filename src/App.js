import React from 'react';
import ShowForm from './ShowForm';
import ShowQuestions from './ShowQuestions';
import { useGlobalContext } from './context';
import './App.css';

function App() {
    const { isLoading, isWaiting } = useGlobalContext();
    return (
        <div className='App'>
            {isWaiting ? <ShowForm /> : <ShowQuestions />}
        </div>
    );
}

export default App;
