import * as Yup from 'yup';
const number = /^\d+$/;
const alphanumeric = /^[A-Za-z0-9.'’\s]+$/;
const maxNumber = /^10(\.0*)?$|^([1-9](\.\d*)?|\d(\.\d*)?)$/;
const yearRange = /^(19\d\d|20([0-1]\d|2[0-3]))$/;
const hoursMinsRegex = /^\d{1,2}$/;

export const validationSchema = Yup.object().shape({
    title: Yup.string()
        .max(40, 'Must be 40 characters or less')
        .required('Please enter movie name'),
    rating: Yup.string()
        .matches(maxNumber, 'Please use only numbers (0-9), dot (.) and do not exceed 10')
        .required('Please enter IMDd rating'),
    releaseYear: Yup.string()
        .matches(yearRange, 'Please use only 4-digit year from 1900 to 2023')
        .required('Please enter release year'),
    image: Yup.mixed().required('Movie Poster is required'),
    votes: Yup.string()
        .matches(number, 'Please use only numbers (0-9)')
        .required('Please enter Votes'),
    durationHours: Yup.string()
        .matches(hoursMinsRegex, 'Please use only numbers ')
        .required('Please enter movie hours'),
    durationMinutes: Yup.string()
        .matches(hoursMinsRegex, 'Please use only numbers')
        .required('Please enter movie minutes'),

});
