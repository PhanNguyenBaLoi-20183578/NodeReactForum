import React, { useState, useEffect, useContext } from 'react';
import { Button, TextField } from '@mui/material';
import { Await, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import AuthContext from '../../Contexts/AuthContext';
import './Thread.css';
export default function ShowThread() {
  const { user } = useContext(AuthContext);
  const [thread, setThread] = useState(null);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isReply, setisReply] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getThread();
    getPosts();
  }, []);

  const getThread = async () => {
    const response = await axios.get('/api/thread/' + id);
    setThread(response.data);
  };
  const getPosts = async () => {
    const response = await axios.get('/api/post/thread/' + id, {
      params: {
        page,
      },
    });
    if (response.data.length) {
      setPosts(response.data);
      setPage(page + 1);
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  };
  const deleteCategories = async (value, e) => {
    if (user == null) {
      alert('Bạn cần đăng nhập');
      navigate('/auth/login');
      return;
    } else {
      const dataSend = {
        id:user._id
      };
      const response =await axios.post('/api/post/delete/' + value,dataSend);
      alert(response.data);
      navigate('/');
    }
  };
  const handleReply = async (event) => {
    event.preventDefault();
    if (!replyContent) return;
    const data = {
      userId: user._id,
      threadId: thread._id,
      content: replyContent,
    };
    const response = await axios.post('/api/post/create', data);
    var datares = response.data;
    if (response.data == 'spam') {
      datares = { content: 'you are spam' };
      alert('Bạn đang spam');
    }

    setPosts([...posts, datares]);
  };
  return (
    <div style={{ padding: '2rem' }} class="body">
      <div class="header">
        {thread && (
          <div class="header">
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
              <Grid item xs={11} md={11}>
                {'Cập nhật gần nhất:  ' + thread.createdAt}
              </Grid>
            </Grid>
          </div>
        )}
      </div>
      {thread && <p class="title">{thread.content}</p>}
      <List class="content">
        {posts.map((post, number) => (
          <ListItem key={number}>
            <img src={post.image} width="60" height="60"></img>

            <ListItemText primary={post.content} secondary={post.createdAt} />
            <button
              value={post._id}
              onClick={(e) => deleteCategories(post._id, e)}
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
      <Button
        variant="contained"
        color="primary"
        disabled={!hasMore}
        style={{ narginRight: 'lreq' }}
        onClick={getPosts}
      >
        Load More Posts
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setisReply(true)}
      >
        Reply
      </Button>
      {isReply && (
        <form onSubmit={handleReply}>
          <TextField
            fullWidth
            label="content"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <Button type="submit" onClick={() => alert('Bạn chưa đăng nhập')}>
            Reply
          </Button>
        </form>
      )}
    </div>
  );
}
