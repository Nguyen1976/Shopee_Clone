import moment from 'moment';

export const formater = (number) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(parseFloat(number));
};

export const formatTime = (timeString) => {
    var formattedTime = moment(timeString).format('DD/MM/YYYY HH:mm');
    return formattedTime;
};
