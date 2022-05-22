import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { incremented, amountAdded } from './features/counter/counter-slice';

const App = () => {
    const count = useAppSelector((state) => state.counter.value);
    const dispatch = useAppDispatch();

    function handleClick() {
        dispatch(incremented());
    }

    function incrementBy5() {
        dispatch(amountAdded(5));
    }

    return (
        <Grid container direction='column'>
            <Typography>The current count is {count}</Typography>
            <Button onClick={handleClick}>Increment</Button>
            <Button onClick={incrementBy5}>Increment by 5</Button>
        </Grid>
    );
};

export default App;
