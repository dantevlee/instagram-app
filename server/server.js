const express = require('express');
const app = express()
const axios = require('axios');
const port = process.env.PORT || 3000;
const cors = require('cors');
const token = process.env.ACCESS_TOKEN;
require('dotenv').config();
app.use(cors());


app.get('/api/user/posts', async (req, res) => {


  try {
      const response = await axios.get(`https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,username,timestamp&access_token=${token}`)
      res.send(response.data)
  } catch(error) {
    console.error('Error getting user information', error.message);
    res.status(error.response?.status || 500).json({ error: 'Internal Server Error' });
  }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});






