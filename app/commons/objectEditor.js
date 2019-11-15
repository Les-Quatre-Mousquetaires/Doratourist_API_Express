module.exports = {
    customFilter: (permission, dataObject) => {
        return { resData: permission.filter(JSON.parse(JSON.stringify(dataObject))) };
    }
}