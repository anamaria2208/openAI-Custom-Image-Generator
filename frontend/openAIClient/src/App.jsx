import { TextField, Button, Container, CircularProgress } from "@mui/material";
import { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    setLoading(true);
    if (prompt == "") return;
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api",
        [{ text: prompt }],
        {
          "Content-Type": "application/json",
        }
      );
      setImageUrl(response.data);
      setPrompt("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="sm">
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <TextField
            id="outlined-basic"
            label="Image Description"
            variant="outlined"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained">
            Generate Image
          </Button>
        </form>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading && (
            <CircularProgress size="2rem" color="secondary" sx={{ mt: 2 }} />
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Generated Image"
              style={{
                width: "400px",
                height: "auto",
                marginTop: "20px",
                borderRadius: "5px",
                objectFit: "contain",
              }}
            />
          )}
        </div>
      </Container>
    </div>
  );
}

export default App;
