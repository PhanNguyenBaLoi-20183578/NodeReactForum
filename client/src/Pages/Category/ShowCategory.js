import React, { useState, useEffect, useContext } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import AuthContext from '../../Contexts/AuthContext';
import { useParams } from 'react-router-dom';
import './Category.css';

export default function ShowCategory() {
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [fora, setFora] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getCategory();
    getFora();
  }, []);

  const getCategory = async () => {
    const response = await axios.get(
      '/api/category/' + id,
    );
    setCategory(response.data);
  };
  const getFora = async () => {
    const response = await axios.get(
      '/api/forum/category/' + id,
    );
    setFora(response.data);
  };
  const { user } = useContext(AuthContext);
  const handleCreat = async (event) => {
    if (user == null) {
      navigate('/category/create');
      alert('Bạn cần đăng nhập');
    } else {
      navigate('/forum/create/' + id);
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
      const response =await axios.post('/api/forum/delete/' + value,dataSend);
      alert(response.data);
      navigate('/');
    }
  };

  return (
    <div class="body">
      <div style={{ padding: '2rem' }}>
        <div class="header">
          {category && (
            <h1 class="header">
              <img
                src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTEwL3JtNTM1LWJvb2stMDIucG5n.png"
                width="40"
                height="40"
              ></img>
              {category.title}
            </h1>
          )}
        </div>

        <Button variant="contained" color="success" onClick={handleCreat}>
          Tạo chủ đề
        </Button>
        <div class="content">
          <List>
            {fora.map((forum, number) => (
              <ListItem>
                <Button
                  onClick={() => navigate(`/forum/${forum._id}`)}
                  style={{
                    width: '95%',
                    height: '20%',
                    backgroundColor: 'skyblue',
                  }}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Icon-round-Question_mark.svg/2048px-Icon-round-Question_mark.svg.png"
                    width="50"
                    height="50"
                  ></img>
                  <ListItemText
                    primary={forum.title}
                    secondary={forum.createdAt}
                  />
                </Button>
                <button
                  value={forum._id}
                  onClick={(e) => deleteCategories(forum._id, e)}
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
