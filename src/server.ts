import app from "./app";

const PORT = process.env.PORT || 4000;

// server start
app.listen(PORT, () => console.log(`Start Server http://localhost:${PORT}/`));
