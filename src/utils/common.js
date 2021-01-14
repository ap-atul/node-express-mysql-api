exports.placeholder = (object) => {
    if(typeof object !== 'object'){
        throw new Error('invalid input');
    }

    const keys = Object.keys(object);
    const values = Object.values(object);

    ret_val = keys.map(key => `${key} = ?`).join(', ');

    return {
        ret_val,
        values
    }
}