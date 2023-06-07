import https from 'https';

export async function handler(event, context) {
  // Rest of the code remains the same...
  // Set up OpenAI API configuration, make HTTP request, process response, etc.
  // ...

  try {
    // Prepare the request data
    const requestData = JSON.stringify({
      messages: JSON.parse(event.body),
      model: 'gpt-3.5-turbo',
      max_tokens: 1000,
      temperature: 0.7
    });

    // Prepare the request options
    const options = {
      hostname: "api.openai.com",
      path: "/v1/chat/completions",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    };

    // Make the HTTP request to OpenAI API
    const response = await sendRequest(options, requestData);
    const parsed = JSON.parse(response);
    
    if (parsed.error && parsed.error.message) {
      throw new Error(parsed.error.message);
    }
    
    // Extract the generated text from the response
    const generatedText = JSON.parse(response).choices[0].message;

    // Process the generated text or perform any other desired actions
    // ...

    // Return the processed result
    return {
      statusCode: 200,
      body: JSON.stringify({"response":generatedText}),
    };
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: 'An error occurred: ' + error.message,
    };
  }
}

// Helper function to send HTTP request
function sendRequest(options, requestData) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseBody = '';

      res.on('data', (chunk) => {
        responseBody += chunk;
      });

      res.on('end', () => {
        resolve(responseBody);
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(requestData);
    req.end();
  });
}
