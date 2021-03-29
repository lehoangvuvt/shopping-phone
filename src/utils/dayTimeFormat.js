export const dayTimeFormat = (date) => {
    let currdateString = date;
    let dateArr = currdateString.split('-');
    let dayAndTimeArr = dateArr[2].split(' ');
    let day = dayAndTimeArr[0];
    let timeArr = dayAndTimeArr[1].split(':');
    let hourAndMinute = timeArr[0] + ':' + timeArr[1];
    let month = dateArr[1];
    let year = dateArr[0];
    let dateFormat = hourAndMinute + ' ' + day + '/' + month + '/' + year + ' ';
    return dateFormat;
}