function makeResult(message, data, error, success){
    message = message || "";
    data = data || {};
    error = error || "";
    success = success || false;
    return {
        message,
        data,
        error,
        success
    }
}

module.exports = {
    makeResult
}