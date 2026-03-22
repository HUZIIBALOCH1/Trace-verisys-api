// api/index.js

export default async function handler(req, res) {
  // 1. Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 2. Query Get Karna (Ab yahan 'number' use hoga)
  const { number } = req.query;

  // Custom Branding Variables
  const DEVELOPER_NAME = "HUZII BALOCH OWNER OF BLACK WORLD 03058190234";
  const PREMIUM_MSG = "premium data ke price 100 hey contact owner = HUZII X HACKER 03058190234";

  if (!number) {
    return res.status(400).json({ 
      status: "error", 
      message: "Number parameter is required (e.g. ?number=03xxxx)",
      developed_by: DEVELOPER_NAME 
    });
  }

  try {
    // 3. External API Call
    // External API shayad abhi bhi 'num' mangti ho, isliye humara 'number' wahan 'num' ban kar jayega
    const API_TOKEN = 'fcca676bd5a8c852a4bd7ad9916e5c91445783b359aaeefc64fc58089a210580';
    const API_URL = `https://shadowdatabase.site/api.php?token=${API_TOKEN}&num=${number}`;

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();

    // 4. Agar Data Mila (Success Case)
    if (data && (Array.isArray(data) || data.data || data.status === 'success')) {
       
       if (typeof data === 'object') {
           data.developed_by = DEVELOPER_NAME;
       }
       return res.status(200).json(data);

    } else {
       throw new Error("No data found");
    }

  } catch (error) {
    // 5. Fallback / Error Case (Premium Message)
    return res.status(200).json({
      status: "error",
      message: PREMIUM_MSG, 
      developed_by: DEVELOPER_NAME,
      data: [] 
    });
  }
}

