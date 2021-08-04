import React, { useReducer, useEffect, useContext, useState } from 'react';

const sports = '21';
const history = '23';
const politics = '24';

export const AppContext = React.createContext();

function reducer(state, action) {
    switch (action.type) {
        case 'Set_Ques':
            return {
                ...state,
                numOfQues: action.payload,
            };
        case 'Set_Category':
            return { ...state, category: action.payload };
        case 'Set_Difficulty':
            return { ...state, difficulty: action.payload };
        case 'Set_Data':
            return { ...state, quesList: action.payload };
        default:
            throw new Error(`action ${action.type} is not found`);
    }
}
const initialState = {
    quesList: [],
    numOfQues: 10,
    category: 'sports',
    difficulty: 'easy',
};

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isError, setisError] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const [isWaiting, setisWaiting] = useState(true);

    useEffect(() => {
        fetchData();
    }, [isWaiting]);

    useEffect(() => {
        if (
            isNaN(parseFloat(state.numOfQues)) ||
            state.numOfQues < 1 ||
            state.numOfQues > 50
        ) {
            setisError(true);
        } else {
            setisError(false);
        }
    }, [state.numOfQues]);

    const fetchData = async () => {
        if (!isError) {
            let url;
            if (state.category === 'sports') {
                url = `https://opentdb.com/api.php?amount=${state.numOfQues}&category=${sports}&difficulty=${state.difficulty}&type=multiple`;
            } else if (state.category === 'history') {
                url = `https://opentdb.com/api.php?amount=${state.numOfQues}&category=${history}&difficulty=${state.difficulty}&type=multiple`;
            } else if (state.category === 'politics') {
                url = `https://opentdb.com/api.php?amount=${state.numOfQues}&category=${politics}&difficulty=${state.difficulty}&type=multiple`;
            }

            try {
                setisLoading(true);
                const response = await fetch(url);
                const getData = await response.json();
                // console.log(getData.results);
                if (!getData.results.length) {
                    setisWaiting(true);
                    setisError(true);
                } else {
                    dispatch({ type: 'Set_Data', payload: getData.results });
                    setisLoading(false);
                }
            } catch (error) {
                throw new Error(error);
            }
        }
    };

    const handleQues = (ques) => {
        dispatch({ type: 'Set_Ques', payload: ques });
    };

    const handleCategory = (cat) => {
        dispatch({ type: 'Set_Category', payload: cat });
    };

    const handleDifficulty = (diff) => {
        dispatch({ type: 'Set_Difficulty', payload: diff });
    };
    console.log(isError, state.numOfQues);
    return (
        <AppContext.Provider
            value={{
                quesList: state.quesList,
                ques: state.numOfQues,
                category: state.category,
                difficulty: state.difficulty,
                handleQues,
                handleCategory,
                handleDifficulty,
                setisError,
                setisWaiting,
                isLoading,
                isWaiting,
                isError,
            }}>
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};
