export default (value) => {
    var date = new Date(value);

    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.getDate(),
    }
}