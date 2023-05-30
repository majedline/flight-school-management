import * as React from 'react';
import PropTypes from 'prop-types';
import TabPanel from './TabPanel';
import { Typography, Box, Tab, Tabs } from '@mui/material';


TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs({ title, tab1, tab2, tab3, tab4 }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (

        <Box sx={{ width: '100%' }}>
            <Typography variant="h4" component="h1" align="center">
                {title}
            </Typography>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {(tab1) ? <Tab label="Basic Info." {...a11yProps(0)} /> : ""}
                    {(tab2) ? <Tab label="Additional Info." {...a11yProps(1)} /> : ""}
                    {(tab3) ? <Tab label="Address" {...a11yProps(2)} /> : ""}
                    {(tab4) ? <Tab label="History" {...a11yProps(3)} /> : ""}
                </Tabs>
            </Box>

            {(tab1) ? (<TabPanel value={value} index={0}> {tab1}</TabPanel>) : ("")}
            {(tab2) ? (<TabPanel value={value} index={1}> {tab2}</TabPanel>) : ("")}
            {(tab3) ? (<TabPanel value={value} index={2}> {tab3}</TabPanel>) : ("")}
            {(tab4) ? (<TabPanel value={value} index={3}> {tab4}</TabPanel>) : ("")}

        </Box>
    );
}
