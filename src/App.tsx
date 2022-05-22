import {
    Button,
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { incremented, amountAdded } from './features/counter/counter-slice';
import { useFetchBreedsQuery } from './features/dogs/dogs-api-slice';

const App = () => {
    const count = useAppSelector((state) => state.counter.value);
    const [numberOfDogs, setNumberOfDogs] = useState(10);
    const { data = [], isFetching } = useFetchBreedsQuery(numberOfDogs);

    const dispatch = useAppDispatch();

    function handleClick() {
        dispatch(incremented());
    }

    function incrementBy5() {
        dispatch(amountAdded(5));
    }

    return (
        <Grid container direction='column'>
            <Grid item justifyContent='center' style={{ paddingBottom: 48 }}>
                <Typography variant='h3' align='center' gutterBottom>
                    Count Example
                </Typography>
                <Typography align='center'>The current count is {count}</Typography>
                <Grid container justifyContent='center'>
                    <Button
                        variant='outlined'
                        onClick={handleClick}
                        style={{ marginRight: 8 }}
                        color='primary'
                    >
                        Increment
                    </Button>
                    <Button variant='outlined' onClick={incrementBy5} color='secondary'>
                        Increment by 5
                    </Button>
                </Grid>
            </Grid>
            <Typography variant='h3' align='center' gutterBottom>
                Dogs Fetching Example (Using RTK Query)
            </Typography>
            <Grid container direction='column' alignContent='center'>
                <Grid item style={{ width: '50%' }}>
                    <FormControl fullWidth>
                        <InputLabel id='number-of-dogs-selector-input-label'>
                            Number of Dogs
                        </InputLabel>
                        <Select
                            labelId='number-of-dogs-selector-label'
                            id='number-of-dogs-selector'
                            value={numberOfDogs}
                            onChange={(e) => setNumberOfDogs(e.target.value as number)}
                            variant='outlined'
                        >
                            {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
                                <MenuItem key={value} value={value}>
                                    {value}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item style={{ paddingLeft: 8, paddingRight: 8, alignSelf: 'center' }}>
                    <Typography gutterBottom>Number of dogs fetched: {data.length}</Typography>
                </Grid>
            </Grid>
            <Grid container justifyContent='center'>
                {isFetching ? (
                    <CircularProgress />
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Picture</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((breed) => (
                                <tr key={breed.id}>
                                    <td>{breed.name}</td>
                                    <td>
                                        <img src={breed.image.url} alt={breed.name} height={250} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </Grid>
        </Grid>
    );
};

export default App;
