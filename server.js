"use strict";

const app = require("./app");
const PORT  = 5000;

app.listen(PORT, () => console.log(`Started on http://localhost:${PORT}`));