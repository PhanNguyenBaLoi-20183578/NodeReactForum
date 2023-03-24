import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import './Forum.css';
import Grid from '@mui/material/Grid';

export default function ShowForum() {
  const [forum, setForum] = useState(null);
  const [threads, setThreads] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getForum();
    getThread();
  }, []);

  const getForum = async () => {
    //thieu id,vv
    //const response = await axios.get('/api/forum/');
    const response = await axios.get('/api/forum/' + id);
    setForum(response.data);
  };
  const getThread = async () => {
    const response = await axios.get('/api/thread/forum/' + id);
    setThreads(response.data);
  };
  const deleteCategories = async (value, e) => {
    alert(value);
  };
  const navigate = useNavigate();
  return (
    <div class="body">
      <div style={{ padding: '2rem' }}>
        <div class="header">
          {forum && (
            <h1 class="header">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Icon-round-Question_mark.svg/2048px-Icon-round-Question_mark.svg.png"
                width="40"
                height="40"
              ></img>
              {forum.title}
            </h1>
          )}
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/thread/create/' + id)}
        >
          Tạo Topic
        </Button>
        <div class="content">
          <List>
            {threads.map((thread, number) => (
              <ListItem>
                <Button
                  onClick={() => navigate(`/thread/${thread._id}`)}
                  style={{
                    width: '95%',
                    height: '20%',
                    backgroundColor: 'skyblue',
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={1} md={1}>
                      <font>{thread.name}</font>
                      <img src={thread.image} width="70" height="70"></img>
                    </Grid>
                    <Grid item xs={11} md={11}>
                      <font size="+3" color="blue">
                        {thread.title}
                      </font>
                    </Grid>

                    <Grid item xs={11} md={18}>
                      {'Cập nhật gần nhất:  ' + thread.createdAt}
                    </Grid>
                  </Grid>
                </Button>
                <button
                  value={thread._id}
                  onClick={(e) => deleteCategories(thread._id, e)}
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
