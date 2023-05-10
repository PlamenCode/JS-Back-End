
function parseError(error){
    if(error.name == 'ValidationError'){
        return Object.values(error.errors).map(e => e.message);
    } else if(Array.isArray(error)){
        return error.map(e => e.msg);
    } else{
        return error.message.split('\n');
    }
};

module.exports = {
    parseError
}