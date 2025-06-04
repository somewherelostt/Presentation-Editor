const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database configuration
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../database.sqlite"),
  logging: false,
});

// Import models
const Slide = require("./models/Slide")(sequelize);

// Sync database
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Database synced");

    // Create demo slides
    const demoSlides = [
      {
        content:
          "# Welcome to PPT Web\n\nCreate beautiful presentations with ease.",
        order: 1,
        layout: "default",
      },
      {
        content:
          "# Features\n\n- Real-time editing\n- Markdown support\n- Beautiful UI",
        order: 2,
        layout: "default",
      },
      {
        content:
          "# Get Started\n\n1. Create new slides\n2. Edit content\n3. Save changes",
        order: 3,
        layout: "default",
      },
    ];

    return Slide.bulkCreate(demoSlides);
  })
  .then(() => {
    console.log("Demo slides created");
  })
  .catch((error) => {
    console.error("Error setting up database:", error);
  });

// Routes
app.get("/api/slides", async (req, res) => {
  try {
    const slides = await Slide.findAll({
      order: [["order", "ASC"]],
    });
    res.json(slides);
  } catch (error) {
    console.error("Error fetching slides:", error);
    res.status(500).json({ error: "Failed to fetch slides" });
  }
});

app.post("/api/slides", async (req, res) => {
  try {
    const { content, order, layout } = req.body;
    const slide = await Slide.create({
      content: content || "# New Slide\n\nStart typing here...",
      order: order || 1,
      layout: layout || "default",
    });
    res.status(201).json(slide);
  } catch (error) {
    console.error("Error creating slide:", error);
    res.status(500).json({ error: "Failed to create slide" });
  }
});

app.put("/api/slides/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { content, order, layout } = req.body;

    const slide = await Slide.findByPk(id);
    if (!slide) {
      return res.status(404).json({ error: "Slide not found" });
    }

    await slide.update({
      content: content || slide.content,
      order: order || slide.order,
      layout: layout || slide.layout,
    });

    res.json(slide);
  } catch (error) {
    console.error("Error updating slide:", error);
    res.status(500).json({ error: "Failed to update slide" });
  }
});

app.delete("/api/slides/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const slide = await Slide.findByPk(id);

    if (!slide) {
      return res.status(404).json({ error: "Slide not found" });
    }

    await slide.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting slide:", error);
    res.status(500).json({ error: "Failed to delete slide" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
