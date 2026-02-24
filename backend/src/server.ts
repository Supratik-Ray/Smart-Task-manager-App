import env from "./config/env.ts";
import app from "./app.ts";

const port = env.PORT;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
