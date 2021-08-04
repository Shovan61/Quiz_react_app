import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { shuffleArray } from './helper';
import { useGlobalContext } from './context';
import ModalComponent from './ModalComponent';

const useStyles = makeStyles({
    root: {
        width: '80%',
        boxShadow: '4px 5px 14px -6px #000000',
        padding: '3rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    question: {
        fontWeight: '400',
        letterSpacing: '3px',
        marginBottom: '4rem',
    },
    answerList: {
        alignSelf: 'center',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '2rem',
    },
    answer: {
        width: '70%',
        padding: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1rem',
        cursor: 'pointer',
        backgroundColor: '#c7c7ff',
        borderRadius: '5px',
        transition: 'all 0.3s ease-in',
        '&:hover': {
            backgroundColor: '#7a7aff',
        },
        '& span': {
            transition: 'all 0.3s ease-in',
        },
        '&:hover span': {
            color: 'white',
        },
        correct: {
            color: 'green',
            marginBottom: '2rem',
        },
    },
});

function ShowQuestions() {
    const classes = useStyles();
    const { isLoading, quesList } = useGlobalContext();
    const [curQues, setcurQues] = useState({
        incorrect_answers: ['loading', 'loading', 'loading'],
        correct_answer: 'loading',
    });
    const [index, setindex] = useState(0);
    const [isQuesEnd, setisQuesEnd] = useState(false);
    const [correctAns, setcorrectAns] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setcurQues(quesList[index]);
    }, [isLoading, index]);

    const nextQues = () => {
        const totalQuesInd = quesList.length - 1;
        // console.log(totalQuesInd, index);
        if (index < totalQuesInd) {
            setindex((prev) => {
                return prev + 1;
            });
        } else {
            setisQuesEnd(true);
            setOpen(true);
        }
    };

    const checkAns = (value) => {
        if (curQues.correct_answer === value && !isQuesEnd) {
            setcorrectAns((prev) => {
                return prev + 1;
            });
        }

        nextQues();
    };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    if (isLoading) {
        return <CircularProgress />;
    } else {
        let allAns = [...curQues.incorrect_answers, curQues.correct_answer];
        let shuffledAns = shuffleArray(allAns);

        return (
            <>
                <ModalComponent
                    // handleOpen={handleOpen}
                    // handleClose={handleClose}
                    open={open}
                    correctAns={correctAns}
                    quesList={quesList}
                />

                <Card className={classes.root}>
                    <span
                        style={{
                            color: 'green',
                            marginBottom: '2rem',
                            alignSelf: 'flex-end',
                        }}>
                        Correct Answer : {correctAns} / {quesList.length}
                    </span>
                    <h1 className={classes.question}>{curQues.question}</h1>
                    <div className={classes.answerList}>
                        {shuffledAns.map((cur, i) => (
                            <div
                                className={classes.answer}
                                key={i}
                                onClick={() => checkAns(cur)}>
                                <span>{cur}</span>
                            </div>
                        ))}
                    </div>

                    <Button
                        disabled={isQuesEnd}
                        variant='contained'
                        color='secondary'
                        className={classes.btn}
                        onClick={nextQues}>
                        Next Question
                    </Button>
                </Card>
            </>
        );
    }
}

export default ShowQuestions;
