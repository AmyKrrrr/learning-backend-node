function add(a, b){
    return a+b;
}

function sub(a, b){
    return a-b;
}

module.exports = {
    addFunc: add, 
    subFunc: sub,
};

// exports.add = (a, b) => a+b;
// exports.sub = (a, b) => a-b;