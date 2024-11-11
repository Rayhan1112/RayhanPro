// Import required modules
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

// Initialize the app and port
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend
app.use(cors());

// Load environment variables
dotenv.config();
app.use(express.json());

// MongoDB URI (use your local MongoDB URI or MongoDB Atlas URI)
const mongoURI = process.env.MONGO_URI; // Change this if you're using a remote DB

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
    fetchAndLogProjects(); // Fetch and log projects after successful connection
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Define a schema and model for your collection
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  technologies: [String],
  link: String,
  image: String,
});

const Project = mongoose.model("Project", projectSchema);

// Define a schema for the contact form submission
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);

// API route for form submission
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    // Validate the input (example validation)
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Save form data to MongoDB
    const newContact = new Contact({
      name,
      email,
      phone,
      message,
    });

    await newContact.save();

    res.status(200).json({ message: "Form submitted and data saved to database!" });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ error: "Could not save data. Please try again later." });
  }
});

// API route to fetch projects
app.get("/api/projects", async (req, res) => {
  console.log("Received GET request to /api/projects");
  try {
    const projects = await Project.find(); // Fetch projects from MongoDB
    if (projects.length === 0) {
      console.log("No projects found");
    }
    res.json(projects); // Send the data as JSON to the frontend
  } catch (err) {
    console.error("Error fetching:", err);
    res.status(500).json({ error: "Could not fetch projects" });
  }
});

// Function to fetch and log all projects from the database
const fetchAndLogProjects = async () => {
  try {
    const projects = await Project.find(); // Fetch projects from MongoDB
    console.log("Projects count:", projects.length);
  } catch (err) {
    console.error("Error fetching:", err);
  }
};

// Serve API routes first, then static files
const __dirname = path.resolve();

// Middleware to serve static files from the React build folder in production
if (process.env.NODE_ENV === "production") {
  // Serve static files from the 'frontend/build' directory
  app.use(express.static(path.join(__dirname, "frontend", "build")));

  // Catch-all route to serve React's index.html for all non-API routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
  });
} else {
  // In development, you might want to proxy to React dev server (if needed)
  app.get("/", (req, res) => {
    res.send("Hello from Express!");
  });
}

// Example API route (you can add more of these as needed)
app.get("/api/example", (req, res) => {
  res.json({ message: "Hello from the API!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
