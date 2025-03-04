export default async function handler(req, res) {
  // Ensure request is POST and has a prompt
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;
  
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }
  
  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        prompt,
        max_tokens: 200,
        temperature: 0.7,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      return res.status(response.status).json({ 
        error: 'Error from OpenAI API', 
        details: errorData 
      });
    }
    
    const data = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      return res.status(500).json({ error: 'No response from OpenAI' });
    }
    
    res.status(200).json({ story: data.choices[0].text.trim() });
  } catch (error) {
    console.error('Error generating story:', error);
    res.status(500).json({ error: 'Failed to generate story' });
  }
}
