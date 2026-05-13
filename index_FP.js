const express = require('express');
const supabaseClient = require('@supabase/supabase-js');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
  res.sendFile('public/Home_Page_FP.html', { root: __dirname });
});

app.get('/cities', async (req, res) => {
  const { data, error } = await supabase.from('cities').select();

  if (error) {
    return res.status(500).send(error);
  }

  res.json(data);
});

app.post('/cities', async (req, res) => {
  const { city, lat, lon } = req.body;

  const { data, error } = await supabase
    .from('cities')
    .insert([{ city, lat, lon }])
    .select();

  if (error) {
    return res.status(500).send(error);
  }

  res.json(data);
});

app.get('/weather', async (req, res) => {
  const { lat, lon } = req.query;

  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,apparent_temperature&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
    );

    const data = await response.json();

    res.json({
      current_weather: data.current_weather,
      hourly: {
        time: data.hourly.time,
        temperature_2m: data.hourly.temperature_2m,
        apparent_temperature: data.hourly.apparent_temperature
      },
      daily: {
        time: data.daily.time,
        temperature_2m_max: data.daily.temperature_2m_max,
        temperature_2m_min: data.daily.temperature_2m_min,
        weathercode: data.daily.weathercode
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Weather fetch failed" });
  }
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});