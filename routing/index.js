module.exports = function loadModules(server) {
    /* ------------------ INSTANCES ------------------ */
    const config = require('config');
    const logger = require('../logger');
    const path = require('path');
    /* ------------------ LOADING ENDPOINTS ------------------ */

    let modulesRootPath = path.dirname(require.main.filename) + "/" + config.get("modulesFolderName");
    logger.info("Loading modules :");            
    config.get("modules").forEach(moduleName => {
        logger.info("---- "+moduleName);
        let modulePath = modulesRootPath + "/" + moduleName;
        require(modulePath)(server);     
    })
    logger.info("Modules loaded !");            
}