const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");
const path = require("path");
const Slide = require("./models/Slide");

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(bodyParser.json());

// Database setup
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../database.sqlite"),
  logging: console.log,
});

// Initialize models
const slideModel = Slide(sequelize);

// Demo slides content
const demoSlides = [
  {
    content: `# Welcome to PPT Web!
    
## Your Simple Presentation Tool

- Create beautiful slides
- Edit content easily
- Navigate with ease
- Save automatically`,
    order: 0,
    layout: "default",
  },
  {
    content: `# How to Use

1. Click "New Slide" to create slides
2. Use the editor to write content
3. Save your changes
4. Navigate with Previous/Next buttons

## Tips
- Use # for headings
- Use - for bullet points
- Use 1. for numbered lists`,
    order: 1,
    layout: "default",
  },
  {
    content: `# Example Slide

## Features
- Clean interface
- Markdown support
- Easy navigation
- Auto-save

## Try it out!
1. Edit this slide
2. Add your content
3. Save changes
4. Create more slides!`,
    order: 2,
    layout: "default",
  },
];

// Routes
app.get("/api/slides", async (req, res) => {
  try {
    const slides = await slideModel.findAll({
      order: [["order", "ASC"]],
    });
    console.log("Fetched slides:", slides);
    res.json(slides);
  } catch (error) {
    console.error("Error fetching slides:", error);
    res.status(500).json({ error: "Failed to fetch slides" });
  }
});

app.post("/api/slides", async (req, res) => {
  try {
    const newSlide = {
      content: req.body.content || "# New Slide\n\nStart typing here...",
      order: req.body.order || 0,
      layout: "default",
    };
    console.log("Creating new slide:", newSlide);
    const slide = await slideModel.create(newSlide);
    console.log("Created slide:", slide);
    res.status(201).json(slide);
  } catch (error) {
    console.error("Error creating slide:", error);
    res.status(400).json({ error: "Failed to create slide" });
  }
});

app.put("/api/slides/:id", async (req, res) => {
  try {
    const slideId = req.params.id;
    console.log("Updating slide:", slideId, req.body);

    if (!slideId) {
      throw new Error("Slide ID is required");
    }

    const slide = await slideModel.findByPk(slideId);
    if (!slide) {
      console.error("Slide not found:", slideId);
      return res.status(404).json({ error: "Slide not found" });
    }

    const updateData = {
      content: req.body.content,
      order: req.body.order,
    };

    console.log("Update data:", updateData);
    await slide.update(updateData);

    const updatedSlide = await slideModel.findByPk(slideId);
    console.log("Updated slide:", updatedSlide);

    res.json(updatedSlide);
  } catch (error) {
    console.error("Error updating slide:", error);
    res.status(400).json({
      error: "Failed to update slide",
      details: error.message,
    });
  }
});

app.delete("/api/slides/:id", async (req, res) => {
  try {
    console.log("Deleting slide:", req.params.id);
    const slide = await slideModel.findByPk(req.params.id);
    if (!slide) {
      return res.status(404).json({ error: "Slide not found" });
    }
    await slide.destroy();
    console.log("Deleted slide:", req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting slide:", error);
    res.status(400).json({ error: "Failed to delete slide" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    details: err.message,
  });
});

// Database sync and server start
sequelize
  .sync({ force: true }) // This will recreate the tables
  .then(async () => {
    console.log("Database synced successfully");

    // Create demo slides
    try {
      for (const slide of demoSlides) {
        await slideModel.create(slide);
      }
      console.log("Demo slides created successfully");
    } catch (error) {
      console.error("Error creating demo slides:", error);
    }

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to sync database:", error);
  });
