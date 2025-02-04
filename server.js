require("dotenv").config(); 

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

const PORT = process.env.PORT || 3000;

const genAI = new GoogleGenerativeAI(process.env.GENAI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/search", async (req, res) => {
  const { imageData, medicineName } = req.body;

  try {
    console.log("Received imageData:", imageData);

    if (!imageData || !imageData.startsWith("data:image")) {
      throw new Error("Invalid image data. Please ensure you upload a valid image.");
    }

    const base64Data = imageData.split(",")[1];
    let prompt = `describe the uses and composition of the medicine by scanning the name of medicine in this image in short. Detect only the main name of medicine which is written in large size by the ocr. Images will be blurry so make the best guess of the medicine by looking at the wrapper or box of medicine in image, and then give it's uses and composition based on your guess. result of Uses and composition must be in separate lines. don't give any suggestion just tell what is asked {BASE64:${base64Data}}`;

    if (medicineName) {
      prompt = `describe the uses and composition of the medicine named "${medicineName}" by scanning the name of medicine in this image in short. Detect only the main name of medicine which is written in large size by the ocr. Images will be blurry so make the best guess of the medicine by looking at the wrapper or box of medicine in image, and then give it's uses and composition based on your guess. result of Uses and composition must be in separate lines. don't give any suggestion just tell what is asked {BASE64:${base64Data}}`;
    }

    const result = await model.generateContent(prompt);

    res.json({ response: result.response.text() });
  } catch (error) {
    console.error("Error processing the image:", error);
    res.status(500).json({
      error: error.message || "An error occurred while processing the request.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
//working