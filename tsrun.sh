#!/user/bin/bash

if [[ "$ENABLE_OVERCOMMIT_MEMORY" == 'true' ]]; then
	echo "vm.overcommit_memory=1" | sudo tee -a /etc/sysctl.conf
        sudo sysctl -p
	echo "__"
fi
npm-run-all build swaggergen 

#node ./dist/grpc-reflect.js
npm-run-all --parallel redis start
#node dist/app.js
