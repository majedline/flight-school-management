import React, { useState } from 'react';
import { Typography, TextField, Table, TableHead, TableRow, TableBody, TableCell, Paper } from '@mui/material';
import BoxView from './BoxView';

function History({ historyListData }) {

    const [filterText, setFilterText] = useState('');

    const handleFilterChange = (e) => {
        setFilterText(e.target.value);
    };

    const filteredHistory = historyListData.filter((record) =>
        record.info.toLowerCase().includes(filterText.toLowerCase()) ||
        String(record.date).toLowerCase().includes(filterText.toLowerCase())
    );


    return (
        <BoxView>

            <TextField
                label="Search"
                name="search"
                variant="outlined"
                fullWidth
                value={filterText}
                onChange={handleFilterChange}
                style={{ marginBottom: '16px', marginLeft: '16px', marginRight: '16px', marginTop: '8px' }}
            />

            <Paper elevation={3} sx={{ width: '100%' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Info</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredHistory.map((record) => (
                            <TableRow
                                key={record.id}
                                style={{ textDecoration: 'none' }}
                            >
                                <TableCell >{record.info}</TableCell>
                                <TableCell>{record.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

        </BoxView>
    );
}

export default History;
