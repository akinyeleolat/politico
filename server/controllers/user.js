import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
import db from '../db';


/** user controller class */

class UserController {
  /**
 * @function signup
 * @memberof UserController
 * @static
 */
  static signup(req, res) {
    const isAdmin = process.env.USER_DEFAULT;
    let {
      firstname, lastname, othername, email, phonenumber, passporturl,
    } = req.body;
    const { password } = req.body;
    firstname = firstname ? firstname.toString().replace(/\s+/g, '') : firstname;
    lastname = lastname ? lastname.toString().replace(/\s+/g, '') : lastname;
    othername = othername ? othername.toString().replace(/\s+/g, '') : othername;
    email = email ? email.toString().replace(/\s+/g, '') : email;
    phonenumber = phonenumber ? phonenumber.toString().replace(/\s+/g, '') : phonenumber;
    passporturl = passporturl ? passporturl.toString().replace(/\s+/g, '') : passporturl;

    return db.task('signup', db => db.users.findByEmail(email)
      .then((result) => {
        if (result) {
          return res.status(409).json({
            status: 409,
            error: 'user with this email already exist',
          });
        }
        return db.users.findByPhoneNumber(phonenumber)
          .then((found) => {
            if (found) {
              return res.status(409).json({
                status: 409,
                error: 'user with this phonenumber number already exist',
              });
            }
            return db.users.create({firstname, lastname, othername, email, phonenumber, password, passporturl, isAdmin })
              .then((user) => {
                const token = jwt.sign(
                  {
                    id: user.id, firstname: user.firstname, lastname: user.lastname, othername: user.othername, email: user.email, phonenumber: user.phonenumber, user_image: user.passporturl,
                  }, process.env.SECRET_KEY, { expiresIn: '1h' },
                );
                const userProfile = {
                  id: user.id,
                  firstname,
                  lastname,
                  othername,
                  email,
                  phonenumber,
                  passporturl,
                };
                const data = [
                  {
                    token,
                    user: userProfile,
                  },
                ];
                return res.status(201).json({
                  status: 201,
                  data,
                  message: 'Account created successfully',
                });
              });
          });
      })
      .catch((err) => {
        return res.status(500).json({
          status: 500,
          error: 'unable to create user account',
          err: err.message,
        });
      }));
  }
  /**
* @function login
* @memberof UserController
*
* @param {Object} req - this is a request object that contains whatever is requested for
* @param {Object} res - this is a response object to be sent after attending to a request
*
* @static
*/

  static login(req, res) {
    let { email } = req.body;
    const { password } = req.body;
    email = email && email.toString().trim();

    return db.task('signin', data => data.users.findByEmail(email)
      .then((user) => {
        if (!user) {
          return res.status(401).json({
            status: 401,
            error: 'You have entered an invalid email or password',
          });
        }
        const allowEntry = bcrypt.compareSync(password, user.password);
        if (!allowEntry) {
          return res.status(401).json({
            status: 401,
            error: 'You have entered an invalid email or password',
          });
        }
        const token = jwt.sign(
          {
            id: user.id, firstname: user.firstname, lastname: user.lastname, othername: user.othername, email: user.email, phonenumber: user.phonenumber, user_image: user.passporturl,
          }, process.env.SECRET_KEY, { expiresIn: '1h' },
        );
        const userProfile = {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          othername: user.othername,
          email: user.email,
          phonenumber: user.phonenumber,
          passport: user.passporturl,
        };
        const data = [
          {
            token,
            user: userProfile,
          },
        ];
        return res.status(201).json({
          status: 200,
          data,
          message: 'Login successfully',
        });
      }))
      .catch((err) => {
        return res.status(500).json({
          status: 500,
          error: 'unable to login, try again!',
          err: err.message,
        });
      });
  }
}
export default UserController;
