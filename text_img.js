// Combined script for generating text and images

// Customized GPT function
function customizedGPT(inputText) {
  
  // Retrieve API key from the "Config" sheet
  const GPT_API_KEY = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("Config")
    .getRange("A1")
    .getValue();

  // Base URL for OpenAI GPT API
  const BASE_URL = "https://api.openai.com/v1/chat/completions";

  // Headers required for API request
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${GPT_API_KEY}`
  };

  // Options for the API request
  const options = {
    method: "POST",
    headers: headers,
    muteHttpExceptions: true,
    payload: JSON.stringify({
      "model": "gpt-4",
      "messages": [{
        "role": "system",
        "content": ""
      },
      {
        "role": "user",
        "content": inputText
      }],
      "temperature": 0.5
    })
  };

  try {
    // Make the API request
    const response = JSON.parse(UrlFetchApp.fetch(BASE_URL, options));

    // Extract the generated response
    const generatedText = response.choices[0].message.content;

    // Log the generated text (optional)
    console.log("Generated Text:", generatedText);

    // Return the generated text
    return generatedText;
  } catch (error) {
    // Handle errors gracefully
    console.error("Error:", error.message);
    return "Error: Failed to generate text";
  }
}

// Function to generate image
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

// Example usage of the combined functions
function exampleUsage() {
  // Example usage to generate text
  const inputText = "What should I write next?";
  const generatedText = customizedGPT(inputText);
  console.log("Generated Text:", generatedText);

  // Example usage to generate image
  const prompt = "A beautiful landscape with mountains";
  const dimension = 512;
  const imageUrl = generateImage(prompt, dimension);
  console.log("Generated Image URL:", imageUrl);
}

// Uncomment the line below to test the example usage
// exampleUsage();
