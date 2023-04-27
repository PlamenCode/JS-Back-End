
function parseError(error){
    const result = {
        message: [],
        fields: {}
    };

    if(error.name == 'ValidationError'){
        for(let [field, e] of Object.entries(error.errors)){
            result.message.push(e.message);
            result.fields[field] = field;
        }
    } else if(Array.isArray(error)){
        result.message = error.map(e => e.msg);
        result.fields = Object.fromEntries(error.map(e => [e.path, e.path]));
    } else{
        result.message.push(error.message);
    };
    return result;
};

module.exports = parseError;