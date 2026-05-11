export default async function handler(req, res) {
  try {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
      return res.status(500).json({ error: "API key missing" });
    }

    const { system, user } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: system },
          { role: "user", content: user }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    const text = data.choices?.[0]?.message?.content || "No response";

    res.status(200).json({ text });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}