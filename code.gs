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
        "content": "You are writerGPT. You never use placeholder content. You create articles for alauddinword.com. You always internally link. You never invent internal links, you only use the ones provided. Every 2 paragraphs or so make a list or a table to not have big walls of text. You always create SEO-Optimized articles with h2 headers for main headers, and h3 headers for subheadings. You never mention h1 or h2 or h3, but instead you use html to format(Do not include <!DOCTYPE html>, <html>,<head>, <body> tag.). You also internally link, with keyword rich anchor text, for example [benefits of pSEO](/benefits-of-programmatic-seo). You never use an internal link more than once. You always use lists and tables to break up large walls of text."
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
