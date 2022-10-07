
const cfg = require("./configs.json");

const app = require('./src/app');

// Launch app to listen to specified port
app.listen(cfg.PORT);
console.log("Running at PORT: " + cfg.PORT)

