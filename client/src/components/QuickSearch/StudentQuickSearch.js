
import api from '../../util/api';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';

const FullWidthTextField = styled(TextField)`
  width: 700px;
`;

const QuickSearchStudent = () => {
  const [name, setName] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const searchStudents = async () => {
      try {
        if (name.length >= 3) {
          const response = await axios.get(`${api.studentQuickSearch}?name=${name}`);
          setResults(response.data);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error('Error searching students:', error);
      }
    };

    searchStudents();
  }, [name]);

  const handleNameChange = (event, value) => {
    setName(value || '');
  };

  return (
    <Autocomplete
      options={results}
      getOptionLabel={(student) => `${student.firstName} ${student.lastName}`}
      renderInput={(params) => (
        <FullWidthTextField
          {...params}
          label="Student Name"
          name="StudentName"
          value={name}
          variant="outlined"
          onChange={handleNameChange}
        />
      )}
    />
  );
};

export default QuickSearchStudent;
