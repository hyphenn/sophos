//Singleton sample
const database = require('../database/mongodb');
const socket = require('../socketio');

function Singleton(){
    return this.getInstance();    
}

Singleton.prototype.getInstance = function getInstance(){
    if(instance){
        console.log("existing");
        return instance;
    }else{
        console.log("creating new one");
        instance = this;
        return instance;
    }
};

Object.defineProperty(instance, 'database', {
    value : database,
    enumerable: true,
    configurable: false,
    writable: false,
})

Object.defineProperty(instance, 'socket', {
    value : socket,
    enumerable: true,
    configurable: false,
    writable: false,    
})

module.exports = Singleton;