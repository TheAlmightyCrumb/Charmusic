const lengthToTime = (length) => {
    const minutes = Math.floor(length / 60);
    const seconds = length % 60;
    let lengthString = '';
    minutes < 10 ? lengthString += `0${minutes}` : lengthString += minutes ;
    seconds < 10 ? lengthString += `:0${seconds}` : lengthString += `:${seconds}` ;
    return lengthString;
}

export default lengthToTime;