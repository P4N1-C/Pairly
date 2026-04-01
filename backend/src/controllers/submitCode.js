import axios from "axios";
export default async function submitCode(req, res) {
  try {
    const response = await axios.post(
      "https://api.onlinecompiler.io/api/run-code-sync",
      {
        compiler: req.body.compiler,
        code: req.body.code,
      },
      {
        headers: {
          Authorization: "75b0377ca90f89588fc3e390c2ad37e8",
          "Content-Type": "application/json",
        },
      },
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
