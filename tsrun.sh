#!/user/bin/bash

npm run build
node swagautogen.js && pm2 ./dist/app.js -i 0
