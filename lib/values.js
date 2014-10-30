
function values(text) {
    var result = [];
    
    for (var k = 0; k < text.length; k++) {
        var ch = text[k];
        
        if (ch == '*')
            result.push(1);
        else if (ch == '.')
            result.push(0);
    }
    
    return result;
}

module.exports = values;