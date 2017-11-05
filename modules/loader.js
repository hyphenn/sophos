module.exports = function loader(server, db, cache, socket) {
    const subRoot = "/" + this.moduleName;
    const fs = require('fs');
    const path = require('path');
    const config = require('config');
    const filesList = fs.readdirSync(this.dirName);
    const logger = require('../logger');

    filesList.forEach(file => {
        let regex = new RegExp(/^v[0-9]$/)
        if (regex.exec(file)) {
            let absolutePath = this.dirName + "/" + file;
            let stat = fs.statSync(absolutePath);
            if (stat.isDirectory) {
                logger.info(config.get("REST") + subRoot + "/" + file);
                //preloading services, 
                if(fs.existsSync(absolutePath + "/service/index.js")){
                    require(absolutePath + "/service").call(null,db, cache, socket);
                };
                server.use(config.get("REST") + subRoot + "/" + file, require(absolutePath))
            }
        }
    });
}