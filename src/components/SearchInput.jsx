import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import '../styles.css';
import '../../data/data.json';
import { Box } from '@mui/system';
import { TextField } from '@mui/material';

export const SearchInput = () => {

    const [data, setData] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [search, setSearch] = useState('');

    const handleInputChange = ({ target }) => {
        if (target.value.length <= 8) {
            setSearch(target.value);
        } else {
            setSearch(target.value.slice(0, 8));
        }
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = data.filter(item => {
            return item.dni.toString().includes(search);
        });
        setSearchResults(newData);
        setSearch('');
    }

    useEffect(() => {
        fetch('../../data/data.json')
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => console.log(error));
    }, [])

    const handlePayment = (id) => {
        const newData = data.map(item => {
            if (item.id === id && item.fechaPago === null) {
                item.fechaPago = new Date().toLocaleDateString();
            }  else if (item.id === id && item.fechaPago !== null) {
                alert('No se puede pagar dos veces la misma infracción');
            }
            return item;
        }).sort((a, b) => a.id - b.id);
        setData(newData);
    }

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
        >
            <div className="container__search">
                <TextField id="filled-basic" label="DNI" variant="filled" name="dni" value={search} onChange={handleInputChange} />
                <Button variant="contained" style={{ marginLeft: '1em' }} onClick={handleSubmit}>Buscar</Button>
            </div>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>DNI</TableCell>
                            <TableCell align="center">Fecha</TableCell>
                            <TableCell align="center">Infracción #</TableCell>
                            <TableCell align="center">Importe</TableCell>
                            <TableCell align="center">Fecha de Pago</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            searchResults.length > 1 ? 
                            (
                                searchResults.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.dni}
                                        </TableCell>
                                        <TableCell align="center">{row.fecha}</TableCell>
                                        <TableCell align="center">{row.infraccion}</TableCell>
                                        <TableCell align="center">$ {row.importe}</TableCell>
                                        <TableCell align="center">{row.fechaPago}</TableCell>
                                        <TableCell align="center">
                                            <Button
                                                size="small"
                                                onClick={() => {
                                                    handlePayment(row.id);
                                                }
                                                }
                                            >
                                                <AttachMoneyIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                // no results
                                <TableRow>
                                    <TableCell colSpan={6} align="center">No hay resultados</TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )

}