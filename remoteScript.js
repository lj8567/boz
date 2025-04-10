// remoteScript.js
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initExtension);
} else {
  initExtension();
}

function initExtension() {
  modifyPage();
}

function getChatbotResponse() {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  const API_URL = 'https://api.openai.com/v1/chat/completions';
  const prompt = `
Generate a short, random compliment for Bozzle in the second person, including fun emojis, given that Bozzle is clever, beautiful, lovely, smart, wonderful, gorgeous, loving, and pretty. The complimenter is in love with Bozzle.
Examples:
You are such a clever Bozzle!
Bozzle, you are so lovely!
What a beautiful Bozzle!
  `;
  const requestData = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.9
  };

  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify(requestData)
  })
    .then(response => response.json())
    .then(data => {
      if (data.choices && data.choices[0] && data.choices[0].message) {
        return data.choices[0].message.content.trim();
      }
      throw new Error('Invalid response from API');
    })
    .catch(error => {
      console.error('Error:', error);
      return 'What a clever Bozzle!';
    });
}

// Include getChatbotPoem and modifyPage functions here
// They can be similar to getChatbotResponse above, 
// using process.env.OPENAI_API_KEY as needed.
