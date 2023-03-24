import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';

export default function BrowserFora() {
  const [forum, setForum] = useState([]);
  useEffect(() => {
    getForum();
  }, []);
  const getForum = async () => {
    const response = await axios.get('/api/forum');
    setForum(response.data);
  };
  const navigate = useNavigate();
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Browser Forum</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/forum/create')}
      >
        CreatForum
      </Button>
      <Divider style={{ margin: '2rem 0' }} />
      <List>
        {forum.map((cat, number) => (
          <ListItem Button onClick={() => navigate(`/forum/${cat._id}`)}>
            <ListItemText primary={cat.title} secondary={cat.createdAt} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
