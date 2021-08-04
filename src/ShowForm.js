import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { useGlobalContext } from './context';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
    root: {
        width: '40%',
        boxShadow: '4px 5px 14px -6px #000000',
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        fontWeight: '500',
        letterSpacing: '2px',
        padding: '2rem',
        color: 'blue',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        padding: '1.5rem',
    },
    formlabel: {
        fontWeight: '400',
        color: '#444',
        marginBottom: '5px',
    },
    inp: {
        padding: '5px',
        outline: '#777',
        '&:focus': {
            outline: '1px solid blue',
        },
    },
    btn: {
        width: '20%',
        alignSelf: 'center',
        marginTop: '0.5rem',
        marginBottom: '2rem',
    },
});

function ShowForm() {
    const classes = useStyles();
    const {
        ques,
        category,
        difficulty,
        handleQues,
        handleCategory,
        handleDifficulty,
        setisWaiting,
        isError,
    } = useGlobalContext();

    const ChangeNum = (val) => {
        handleQues(val);
    };

    return (
        <Card className={classes.root}>
            <h1 className={classes.header}>Setup Quiz</h1>
            <div className={classes.form}>
                <label for='number-question' className={classes.formlabel}>
                    Number Of Questions:
                </label>
                <input
                    type='number'
                    className={classes.inp}
                    value={ques}
                    onChange={(e) => ChangeNum(parseInt(e.target.value))}
                />
            </div>
            <div className={classes.form}>
                <label for='Category' className={classes.formlabel}>
                    Category:
                </label>
                <select
                    name={category}
                    className={classes.inp}
                    value={category}
                    onChange={(e) => handleCategory(e.target.value)}>
                    <option value='sports'>sports</option>
                    <option value='history'>history</option>
                    <option value='politics'>politics</option>
                </select>
            </div>
            <div className={classes.form}>
                <label for='Difficulty' className={classes.formlabel}>
                    Select Difficulty:
                </label>
                <select
                    name={difficulty}
                    className={classes.inp}
                    value={difficulty}
                    onChange={(e) => handleDifficulty(e.target.value)}>
                    <option value='easy'>easy</option>
                    <option value='medium'>medium</option>
                    <option value='hard'>hard</option>
                </select>
            </div>
            {isError && (
                <Alert severity='error'>
                    No question selected or Too many question!
                </Alert>
            )}
            <Button
                disabled={isError}
                variant='contained'
                color='primary'
                className={classes.btn}
                onClick={() => setisWaiting(false)}>
                Start
            </Button>
        </Card>
    );
}

export default ShowForm;
