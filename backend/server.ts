import express from "express";

const PORT = 5000;

const app = express();

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
