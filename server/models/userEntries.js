const firstname = 'oluwatosin';
const lastname = 'oluwatosin';
const othername = 'oluwatosin';
const email = process.env.TEST_USER;
const phonenumber = '+2348032679327';
const password = process.env.TEST_PASSWORD;
const passporturl = 'www.image.com/tosin.jpg';

/**
* This is a valid user data
* @exports signUpData
* */
export const signUpData = {
  firstname,
  lastname,
  othername,
  email,
  phonenumber,
  password,
  passporturl,
};
/**
* This is a valid user data
* @exports signUpData1
* */
export const signUpData1 = {
  firstname,
  lastname,
  othername,
  email: 'akinyeleolat@gmail.com',
  phonenumber: '+2348043435656',
  password,
  passporturl,
};

/**
* This is field  Name missing
* @exports signUpData2
* */
export const signUpData2 = {
  lastname,
  othername,
  email,
  phonenumber,
  password,
  passporturl,
};
/**
* This is empty field name
* @exports signUpData3
* */
export const signUpData3 = {
  firstname: '',
  lastname,
  othername,
  email,
  phonenumber,
  password,
  passporturl,
};
/**
* This is field name with space
* @exports signUpData4
* */
export const signUpData4 = {
  firstname: ' ',
  lastname,
  othername,
  email,
  phonenumber,
  password,
  passporturl,
};
/**
* This is name with number
* @exports signUpData5
* */
export const signUpData5 = {
  firstname: 123,
  lastname: 123,
  othername,
  email,
  phonenumber,
  password,
  passporturl,
};
/**
* This is invalid email
* @exports signUpData6
* */
export const signUpData6 = {
  firstname,
  lastname,
  othername,
  email: 'akinyele',
  phonenumber,
  password,
  passporturl,
};
/**
* This is invalid passport url
* @exports signUpData7
* */
export const signUpData7 = {
  firstname,
  lastname,
  othername,
  email,
  phonenumber,
  password,
  passporturl: 'www.logo',
};
/**
* This is invalid phone number
* @exports signUpData8
* */
export const signUpData8 = {
  firstname,
  lastname,
  othername,
  email,
  phonenumber: '0703453',
  password,
  passporturl,
};
/**
* This is invalid password
* @exports signUpData9
* */
export const signUpData9 = {
  firstname,
  lastname,
  othername,
  email,
  phonenumber,
  password: 'asdf',
  passporturl,
};
/**
* This is duplicate email
* @exports signUpData10
* */
export const signUpData10 = {
  firstname,
  lastname,
  othername,
  email,
  phonenumber: '+2348099343434',
  password,
  passporturl,
};
/**
* This is duplicate phonenumber
* @exports signUpData11
* */
export const signUpData11 = {
  firstname,
  lastname,
  othername,
  email: 'tosin@politico.com',
  phonenumber,
  password,
  passporturl,
};
