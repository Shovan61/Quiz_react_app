import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { useGlobalContext } from './context';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(5, 10, 6),
    },
    card: {
        boxShadow: theme.shadows[5],
        padding: theme.spacing(8, 20, 8, 20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        marginTop: '3rem',
    },
}));

function ModalComponent({ open, correctAns, quesList }) {
    const classes = useStyles();
    const { setisWaiting } = useGlobalContext();
    return (
        <div>
            <Modal
                aria-labelledby='transition-modal-title'
                aria-describedby='transition-modal-description'
                className={classes.modal}
                open={open}
                // onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <Fade in={open}>
                    <Card className={classes.card}>
                        <h2
                            style={{
                                color: 'green',
                                marginBottom: '2rem',
                                letterSpacing: '3px',
                            }}>
                            Congrats!
                        </h2>
                        <p>
                            You answered {correctAns} correctly out of{' '}
                            {quesList.length} questions
                        </p>
                        <Button
                            variant='outlined'
                            color='secondary'
                            className={classes.btn}
                            onClick={() => setisWaiting(true)}>
                            Play Again
                        </Button>
                    </Card>
                </Fade>
            </Modal>
        </div>
    );
}

export default ModalComponent;
