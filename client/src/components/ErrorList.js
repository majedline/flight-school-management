import React from 'react';
import { FormHelperText } from '@mui/material';


const ErrorList = ({ list }) => {

    return (
        <>
            <ul>
                {
                    (Array.isArray(list)) ?
                        list.map((str, index) => (
                            <div key={index}><FormHelperText error={true}>{str}</FormHelperText></div>
                        )) : list
                }
            </ul>
        </>
    );
};
export default ErrorList;