export const makeRequest = async (message: string) => {
  const response = await fetch('https://openai-assistant-csvx.onrender.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  const data = await response.json();

  return data;
};
