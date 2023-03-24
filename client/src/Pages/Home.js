import React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import './Home.css';
import Grid from '@mui/material/Grid';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [idcat, setIdCat] = useState('');
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const response = await axios.get('/api/category');
    setCategories(response.data);
  };
  const deleteCategories = async (value, e) => {
    alert(value);
  };
  const navigate = useNavigate();
  return (
    <div class="body">
      <div style={{ padding: '2rem' }}>
        <div class="header">
          <Button onClick={() => navigate(`/`)}>
            <img
              src="https://thumbs.dreamstime.com/b/home-button-5836498.jpg"
              width="70"
              height="70"
            ></img>{' '}
            Trang chủ
          </Button>
          <h2>
            <div class="input-group">
              <input
                type="search"
                class="form-control rounded"
                placeholder="Nhập từ khóa tìm kiếm..."
                aria-label="Search"
                aria-describedby="search-addon"
              />
              <button type="button" class="btn btn-outline-primary">
                Tìm kiếm
              </button>
            </div>
          </h2>
        </div>
        <Divider style={{ margin: '1rem 0' }} />
        <div class="content">
          <List>
            {categories.map((cat, number) => (
              <ListItem>
                <button
                  onClick={() => navigate(`/category/${cat._id}`)}
                  style={{
                    width: '95%',
                    height: '20%',
                    backgroundColor: 'skyblue',
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={1} md={1}>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR67vsJBQfA9r8PZrJcX6JgD1Xc5yBH9gDyNcf0-LWOVQ&s"
                        width="70"
                        height="70"
                        margin="1px 11px 21px 1px"
                      ></img>
                    </Grid>
                    <Grid item xs={11} md={11}>
                    <font size="+3" color='blue' >{cat.title}</font>
                      
                    </Grid>
                    <Grid item xs={1} md={1} >
                    <font size="+1"  >{cat.NumberForum} Chủ đề</font>
                    </Grid>
                    <Grid item xs={6} md={8}>
                      {'Cập nhật gần nhất:  ' + cat.createdAt}
                    </Grid>
                  </Grid>
                </button>
                <button
                  value={cat._id}
                  onClick={(e) => deleteCategories(cat._id, e)}
                  style={{
                    backgroundColor: 'skyblue',
                  }}
                >
                  <img
                    src="https://icons.veryicon.com/png/o/miscellaneous/management-console-icon-update-0318/material-delete.png"
                    width="20"
                    height="20"
                  ></img>
                </button>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
}
