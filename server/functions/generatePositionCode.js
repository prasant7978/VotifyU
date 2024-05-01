module.exports = (name) => {
    const nameArr = name.split(' ');
    const code = nameArr.reduce((accmCode, word) => {
        return accmCode + (word === "PG" || word === "UG" ? word : word.charAt(0).toUpperCase())
    }, "");

    // console.log('position code: ', code);
    
    return code;
}