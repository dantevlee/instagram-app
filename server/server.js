const express = require('express');
const app = express();
const axios = require('axios');
const port = process.env.PORT || 3000;
const cors = require('cors');
require('dotenv').config();

app.use(cors());

let accessToken = process.env.ACCESS_TOKEN;
let expirationTime;

const refreshAccessToken = async () => {
  try {
    const refreshResponse = await axios.get(`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${accessToken}`);
    accessToken = refreshResponse.data.access_token;
    expirationTime = Math.floor(Date.now() / 1000) + refreshResponse.data.expires_in; 
  } catch (error) {
    console.error('Error refreshing access token', error.message);
    throw new Error('Unable to refresh access token');
  }
};

const getInstagramData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error getting data from Instagram API', error.message);
    throw new Error('Unable to get data from Instagram API');
  }
};

const checkAndRefreshToken = async () => {
  const currentTime = Math.floor(Date.now() / 1000);
  if (!expirationTime || expirationTime < currentTime) {
    await refreshAccessToken();
  }
};

app.get('/api/refresh-token', async (req, res) => {
  try {
    await refreshAccessToken();
    res.status(200).json({ success: true, message: 'Token refreshed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.get('/api/user/posts', async (req, res) => {
  try {
    await checkAndRefreshToken();
    const response = await getInstagramData(`https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,username,timestamp&access_token=${accessToken}`);
    res.send(response);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/carousel/posts', async (req, res) => {
  const { id } = req.query;

  try {
    await checkAndRefreshToken();
    const response = await getInstagramData(`https://graph.instagram.com/${id}/children?fields=media_url&access_token=${accessToken}`);
    res.send(response);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
