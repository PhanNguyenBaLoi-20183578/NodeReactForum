import React, { useState, useEffect, useContext } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import AuthContext from '../../Contexts/AuthContext';

export default function BrowserCategory() {
  const [categories, setCategories] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const response = await axios.get('/api/category');
    setCategories(response.data);
  };
  const handleCreat = async (event) => {
    if (user == null) {
      navigate('/category/create');
      alert('Bạn cần đăng nhập');
    } else {
      if (user.isAdmin) {
        navigate('/category/create');
      } else {
        alert('Bạn không phải admin');
      }
    }
  };
  const navigate = useNavigate();
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Tạo thư mục</h1>

      <Button variant="contained" color="primary" onClick={handleCreat}>
        Tạo thư mục
      </Button>

      <Divider style={{ margin: '2rem 0' }} />

      <List>
        {categories.map((cat, number) => (
          <ListItem button onClick={() => navigate(`/category/${cat._id}`)}>
            <ListItemText primary={cat.title} secondary={cat.createdAt} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
