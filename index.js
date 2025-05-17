require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const { API_KEY, SITE_ID, STAFF_TOKEN } = process.env;

app.post('/schedule', async (req, res) => {
  try {
    const { StartDateTime, EndDateTime } = req.body;
    const response = await axios.get(
      'https://api.mindbodyonline.com/public/v6/class/classschedules',
      {
        headers: {
          'Api-Key': API_KEY,
          'SiteId': SITE_ID,
          'Authorization': `Bearer ${STAFF_TOKEN}`,
          'Content-Type': 'application/json'
        },
        data: { StartDateTime, EndDateTime, SiteIDs: [parseInt(SITE_ID)] }
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
