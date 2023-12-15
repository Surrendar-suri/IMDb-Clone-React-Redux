import axios from "axios";

export function formatNum(number) {
    if (number >= 1000000000) {
        return (number / 1000000000).toFixed(1) + 'B';
    } else if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'k';
    } else {
        return number.toString();
    }
}

export function roundOff(number) {
    return Math.round(number * 10) / 10;
};

export function textCapitalize(data) {
    if (data !== undefined && data !== null && data !== '') {
        // Convert the entire string to lowercase and then capitalize the first letter
        const lowercasedData = data.toLowerCase();
        return lowercasedData.charAt(0).toUpperCase() + lowercasedData.slice(1);
    } else {
        return data;
    }
}

export function textUppercase(data) {
    if (data !== undefined && data !== null && data !== '') {
        return data.toUpperCase();
    } else {
        return data;
    }
}

export function createInstance(append, data, type) {
    let instance = axios.create({
        baseURL: 'https://api.themoviedb.org/3',
    });
    let url = 'https://api.themoviedb.org/3' + append;
    switch (type) {
        case 0:
            return instance.get(url);
        case 1:
            return instance.post(url, data);
        case 2:
            return instance.put(url, data);
        case 3:
            return instance.patch(url, data);
        case 4:
            return instance.delete(url, data);
        default:
            return instance.get(url);
    }
}

export function getApiCall(url, callback) {
    createInstance(url, null, 0)
        .then((result) => {
            callback(result.data);
        })
        .catch((error) => {
            return callback(error);
        });
}

export function postApiCall(url, data, callback) {
    createInstance(url, data, 1)
        .then((result) => {
            callback(result.data);
        })
        .catch((error) => {
            return callback(error);
        });
}

export function putApiCall(url, data, callback) {
    createInstance(url, data, 2)
        .then((result) => {
            callback(result.data);
        })
        .catch((error) => {
            return callback(error);
        });
}
export function patchApiCall(url, data, callback) {
    createInstance(url, data, 3)
        .then((result) => {
            callback(result.data);
        })
        .catch((error) => {
            return callback(error);
        });
}

export function deleteApiCall(url, data, callback) {
    createInstance(url, data, 4)
        .then((result) => {
            callback(result.data);
        })
        .catch((error) => {
            return callback(error);
        });
}