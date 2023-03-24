import { Button, TextField } from '@mui/material';
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateCategory = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const data = {
      title,
    };
    //thieu dau /trong /api=> sai dia chi,ko post dc.vc
    const response = await axios.post('/api/category/create', data);
    const { _id } = response.data;
    navigate('/category/' + _id);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Create Category</h1>
      <form onSubmit={handleOnSubmit}>
        <TextField
          label="Title"
          required
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
      </form>
    </div>
  );
};
export default CreateCategory;
