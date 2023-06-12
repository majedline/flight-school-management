import React, { useState, useMemo } from 'react';
import { Typography, Grid, TextField, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Modal } from '@mui/material';
import BoxView from '../components/BoxView';

const CalendarPage = () => {
    const [filterText, setFilterText] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);

    const sampleData = [
        { date: new Date().setDate(5), data: 'KWO Lesson', details: "Student John Rud with instructor Steve Jinkens" },
        { date: new Date().setDate(10), data: 'KWM Tour', details: "Steve Jinkens taking Alex Smith on tour" },
        { date: new Date().setDate(15), data: 'KWO Maintenance', details: "KWO Scheduled Maintenance" },
        { date: new Date().setDate(18), data: 'KWM Lesson', details: "Student John Rud with instructor Steve Jinkens" },
        { date: new Date().setDate(50), data: 'KWM Lesson', details: "Student John Rud with instructor Steve Jinkens" },
    ];

    // Memoized filteredData
    const filteredData = useMemo(() => {
        return sampleData.filter(item => {
            const itemDate = new Date(item.date);
            const filterDateFrom = dateFrom ? new Date(dateFrom) : null;
            const filterDateTo = dateTo ? new Date(dateTo) : null;

            return (
                item.data.toLowerCase().includes(filterText.toLowerCase()) &&
                (!filterDateFrom || itemDate >= filterDateFrom) &&
                (!filterDateTo || itemDate <= filterDateTo)
            );
        });
    }, [sampleData, filterText, dateFrom, dateTo]);

    // Function to handle row click and open modal
    const handleRowClick = item => {
        setSelectedItem(item);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setSelectedItem(null);
    };

    return (
        <BoxView>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                Calendar Page                
            </Typography>

            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                    <TextField
                        label="Search"
                        value={filterText}
                        onChange={e => setFilterText(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        label="Date From"
                        type="date"
                        value={dateFrom}
                        onChange={e => setDateFrom(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        label="Date To"
                        type="date"
                        value={dateTo}
                        onChange={e => setDateTo(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                </Grid>
            </Grid>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Details</TableCell>
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map(item => (
                            <TableRow
                                key={item.date}
                                onClick={() => handleRowClick(item)}
                                onMouseOver={e => e.currentTarget.classList.add('highlighted')}
                                onMouseOut={e => e.currentTarget.classList.remove('highlighted')}
                                className="table-row"
                            >
                                <TableCell component="th" scope="row" className="clickable">
                                    {item.data}
                                </TableCell>
                                <TableCell>{item.details}</TableCell>
                                <TableCell>{new Date(item.date).toDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={selectedItem !== null} onClose={handleCloseModal}>
                <div className="modal-content">
                    {selectedItem && (
                        <div>
                            <Typography variant="h6">{selectedItem.data}</Typography>
                            <Typography variant="body1">{selectedItem.details}</Typography>
                            <Typography variant="body2">
                                Date: {new Date(selectedItem.date).toDateString()}
                            </Typography>
                        </div>
                    )}
                </div>
            </Modal>


            <style>
                {`
                    .highlighted {
                        background-color: lightgray;
                    }

                    .clickable {
                        cursor: pointer;
                    }

                    .modal-content {
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background-color: white;
                        padding: 20px;
                    }
                `}
            </style>
        </BoxView>
    );
};

export default CalendarPage;
