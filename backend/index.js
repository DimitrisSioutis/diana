import express from 'express';
import { PORT, mongodbURL } from './config.js';
import mongoose from 'mongoose';
import articlesRoute from './routes/articlesRoute.js';
import fixturesRoute from './routes/fixturesRoute.js';
import usersRoute from './routes/usersRoute.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import puppeteer from 'puppeteer'

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser()); // Parse cookies from the request headers

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Adjust if necessary
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true // Enable cookies to be sent and received
}));

// Routes

app.use('/articles', articlesRoute);
app.use('/fixtures', fixturesRoute);
app.use('/user', usersRoute);

app.get('/table', async (req, res) => {
  const url = 'https://www.epsath.gr/results/display_ranking.php?league_id=1253';
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const tableData = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('table tr')); // Get all table rows
    const data = [];

    rows.forEach(row => {
      const cells = Array.from(row.querySelectorAll('td')); // Get all cells (td) in each row
      const rowData = cells.map(cell => cell.innerText.trim()); // Extract and clean text content from each cell
      if (rowData.length) {
        data.push(rowData); // Add the row data if it's not empty
      }
    });

    return data;
  });

  await browser.close();

  if (tableData.length) {
    res.status(200).send(tableData); // Send the array of objects back to the client
  } else {
    res.status(404).send('Table not found or empty');
  }
});

app.get('/schedule', async (req, res) => {
  const url = 'https://www.epsath.gr/results/display_schedule.php?league_id=1253';
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const tableData = await page.evaluate(() => {
    const tables = Array.from(document.querySelectorAll('table')); // Get all table rows
    tables.splice(0,1)
    const data = [];

    tables.forEach(table => {
      const cells = Array.from(table.querySelectorAll('tr')); // Get all cells (td) in each row
      const matchday = cells.map(cell => cell.innerText.split("\t")); // Extract and clean text content from each cell
      matchday.splice(0,1)

      let dianaMatchIndex;
      matchday.forEach((match,index)=>{
        if(match[0].split(" - ")[0] === 'ΔΙΑΝΑ ΗΛΙΟΥΠΟΛΗΣ' || match[0].split(" - ")[1] ===  'ΔΙΑΝΑ ΗΛΙΟΥΠΟΛΗΣ'){  //for every match at index 0 is the teams so we search for diana by splitting the two teams
          dianaMatchIndex = index;
        }
      })
      matchday[dianaMatchIndex].splice(5,1) //remove referees
      data.push(matchday[dianaMatchIndex]); 
    });

    return data;
  });

  await browser.close();

  res.status(200).send(tableData); // Send the array of objects back to the client

});

// Connect to MongoDB and start server
mongoose.connect(mongodbURL)
  .then(() => {
    console.log('Connected to database');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });


