import { Button, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CreateForum = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const data = {
      title,
      categoryId: id,
    };
    //thieu dau /trong /api=> sai dia chi,ko post dc.vc
    const response = await axios.post('/api/forum/create', data);
    const { _id } = response.data;
    navigate('/forum/' + _id);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Create Forum</h1>
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
export default CreateForum;
