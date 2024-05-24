#!/user/bin/bash

npm run build
node swagautogen.js && pm2-runtime start "./dist/app.js" -i 2
