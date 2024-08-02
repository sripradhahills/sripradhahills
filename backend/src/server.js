const express = require('express');
const bodyParser = require('body-parser');
const jsforce = require('jsforce');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5003;

app.use(bodyParser.json());

// Endpoint to get Salesforce access token and instance URL
app.post('/api/authenticate', async (req, res) => {
  try {
    const { username, password, securityToken } = req.body;

    const conn = new jsforce.Connection({
      oauth2: {
        clientId: process.env.SALESFORCE_CONSUMER_KEY,
        clientSecret: process.env.SALESFORCE_CONSUMER_SECRET,
        redirectUri: 'http://localhost:5003/oauth2/callback' // Update if needed
      }
    });

    const loginResponse = await conn.login(
      username || process.env.SALESFORCE_USERNAME,
      `${password || process.env.SALESFORCE_PASSWORD}${securityToken || process.env.SALESFORCE_SECURITY_TOKEN}`
    );

    res.json({
      access_token: conn.accessToken,
      instance_url: conn.instanceUrl,
    });
  } catch (error) {
    console.error('Error fetching Salesforce token:', error);
    res.status(500).send('Failed to authenticate');
  }
});

// Example route to fetch data from Salesforce (e.g., Flats)
app.get('/api/flats', async (req, res) => {
  try {
    const { accessToken, instanceUrl } = req.query;

    const conn = new jsforce.Connection({
      accessToken,
      instanceUrl,
    });

    const result = await conn.query('SELECT Id, Name, Floor__c ,Status__c ,Tenant__c ,Owner__c , Available_for_Sell__c FROM Flat__c'); // Adjust SOQL query as needed
    res.json(result.records);
  } catch (error) {
    console.error('Error fetching flats:', error);
    res.status(500).send('Failed to fetch flats');
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
