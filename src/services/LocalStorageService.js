const setItem = (key, value) => localStorage.setItem(key, JSON.stringify(value))

const getItem = key => JSON.parse(localStorage.getItem(key))

const removeItem = key => localStorage.removeItem(key)

module.exports = {setItem, getItem, removeItem};