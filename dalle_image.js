function generateImage(prompt, dimension) {
  // Retrieve API key from the "Config" sheet
  const apiKey = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("Config")
    .getRange("A2")
    .getValue();

  // API endpoint for generating images
  const url = 'https://api.openai.com/v1/images/generations';

  // Construct payload for the API request
  const payload = {
    "prompt": prompt || 'test',
    "n": 1,
    "size": `${dimension || 256}x${dimension || 256}`
  };

  // Configure options for the API request
  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    headers: {
      'Authorization': "Bearer " + apiKey
    }
  };

  try {
    // Make the API request
    const response = UrlFetchApp.fetch(url, options);
    const res = JSON.parse(response.getContentText());
    
    // Extract the URL of the generated image
    const imageUrl = res.data[0].url;
    
    // Return the URL of the generated image
    return imageUrl;
  } catch (error) {
    // Handle errors gracefully
    console.error("Error:", error.message);
    return "Error: Failed to generate image";
  }
}
