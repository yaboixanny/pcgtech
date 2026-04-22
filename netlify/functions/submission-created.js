const https = require('https');

exports.handler = async (event) => {
  const { payload } = JSON.parse(event.body);
  const { data } = payload;

  const GOOGLE_SHEET_URL = process.env.GOOGLE_SHEET_URL;

  if (!GOOGLE_SHEET_URL) {
    console.error("GOOGLE_SHEET_URL environment variable is not set.");
    return { statusCode: 500, body: "Config Error" };
  }

  return new Promise((resolve, reject) => {
    const url = new URL(GOOGLE_SHEET_URL);
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 400) {
          console.log("Successfully pushed to Google Sheets");
          resolve({ statusCode: 200, body: "Success" });
        } else {
          console.error("Failed to push to Google Sheets", res.statusCode, responseData);
          resolve({ statusCode: 500, body: "Failed to push" });
        }
      });
    });

    req.on('error', (e) => {
      console.error("Error pushing to Google Sheets:", e);
      resolve({ statusCode: 500, body: "Error" });
    });

    req.write(JSON.stringify(data));
    req.end();
  });
};
