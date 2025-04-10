if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initExtension);
} else {
  initExtension();
}

function initExtension() {
  // Remove the popup entirely by not calling showPopup.
  modifyPage();
}

function getChatbotResponse() {
  const OPENAI_API_KEY = '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';
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

function getChatbotPoem() {
  const OPENAI_API_KEY = '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';
  const API_URL = 'https://api.openai.com/v1/chat/completions';
  const prompt = `
Generate a short poem [of 8-12 lines] about Bozzle, written in the second person, that highlights a few of Bozzle's traits – she is clever, beautiful, lovely, smart, wonderful, gorgeous, loving, and pretty. Include returns between each line and double returns between verses. Use fun emojis for emphasis. The author of the poem is in love with Bozzle.
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
      return 'Bozzle, your brilliance paints the sky in vibrant hues.';
    });
}

function modifyPage() {
  document.title = 'What a good Bozzle!';

  const leftButton = document.createElement('button');
  leftButton.style.cssText = `
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 10000;
    padding: 10px 20px;
    background-color: lightpink;
    color: red;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    white-space: pre-wrap;
    font-family: "Comic Sans MS", cursive, sans-serif;
  `;
  leftButton.textContent = 'I love you Bozzle!';
  leftButton.disabled = true;
  document.body.appendChild(leftButton);

  // Preload the compliment and the poem concurrently.
  Promise.all([getChatbotResponse(), getChatbotPoem()])
    .then(([compliment, poem]) => {
      leftButton.textContent = compliment;
      leftButton.disabled = false;

      // On first click, replace the compliment with the poem and add an embedded "I Love You!" button.
      function showPoem() {
        leftButton.innerHTML = `<div style="margin-bottom: 10px; font-family: 'Comic Sans MS', cursive, sans-serif;">${poem}</div>
          <button id="embeddedLoveBtn" style="padding: 5px 10px; background-color: #ff69b4; color: white; border: none; border-radius: 3px; cursor: pointer; font-family: 'Comic Sans MS', cursive, sans-serif;">I Love You!</button>`;
        leftButton.removeEventListener('click', showPoem);

        // Attach event listener to the embedded "I Love You!" button to remove the whole button.
        const embeddedLoveBtn = document.getElementById('embeddedLoveBtn');
        if (embeddedLoveBtn) {
          embeddedLoveBtn.addEventListener('click', function () {
            leftButton.remove();
          });
        }
      }
      leftButton.addEventListener('click', showPoem);
    })
    .catch(error => {
      console.error('Error loading responses:', error);
      leftButton.textContent = 'What a great Bozzle!';
      leftButton.disabled = false;
    });
}
