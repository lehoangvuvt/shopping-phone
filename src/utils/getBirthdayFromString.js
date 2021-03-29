export const getBirthdayFromString = (birthdayString) => {
    let birthdayObj = { day: null, month: null, year: null };
    const birthdayArr = birthdayString.split('/');
    birthdayObj.day = parseInt(birthdayArr[0]);
    birthdayObj.month = parseInt(birthdayArr[1]);
    birthdayObj.year = parseInt(birthdayArr[2]);
    return birthdayObj;
}