import { app } from './app.js';
import './database.js';
const port = process.env.PORT || 3000;

(async () => {
  await app.listen(port, () => {
    console.log(`listening on port ` + port);
  });
})();