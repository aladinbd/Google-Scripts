// Customized GPT function written by Alauddin
function customizedGPT(inputText) {
  
  // Insert your OpenAI API key here
  const GPT_API_KEY = "INSERT_API_KEY";

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

// Example usage of the customized GPT function
function exampleUsage() {
  const inputText = "What should I write next?";
  const generatedText = customizedGPT(inputText);
  console.log("Generated Text:", generatedText);
}

// Uncomment the line below to test the example usage
// exampleUsage();
