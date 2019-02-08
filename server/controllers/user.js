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
    let { password } = req.body;
    firstname = firstname ? firstname.toString().replace(/\s+/g, '') : firstname;
    lastname = lastname ? lastname.toString().replace(/\s+/g, '') : lastname;
    othername = othername ? othername.toString().replace(/\s+/g, '') : othername;
    email = email ? email.toString().replace(/\s+/g, '') : email;
    phonenumber = phonenumber ? phonenumber.toString().replace(/\s+/g, '') : phonenumber;
    passporturl = passporturl ? passporturl.toString().replace(/\s+/g, '') : passporturl;

    const salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);

    db.query('SELECT * FROM users WHERE email = $1', [email])
      .then((result) => {
        if (result.rows[0]) {
          return res.status(400).json({
            status: 400,
            error: 'user with this email already exist',
          });
        }
        db.query('SELECT * FROM users WHERE phoneNumber = $1', [phonenumber])
          .then((found) => {
            if (found.rows[0]) {
              return res.status(400).json({
                status: 400,
                error: 'user with this phonenumber number already exist',
              });
            }
            db.query('INSERT INTO users (firstname, lastname, othername, email, phoneNumber, password, passportUrl,isAdmin) VAlUES( $1,$2,$3,$4,$5,$6,$7,$8) RETURNING id, firstname, lastname, othername, email, phoneNumber, passportUrl,isAdmin', [firstname, lastname, othername, email, phonenumber, password, passporturl, isAdmin ])
              .then((user) => {
                const userProfile = user.rows[0];
                const token = jwt.sign(
                  {
                    id: userProfile.id, firstname: userProfile.firstname, lastname: userProfile.lastname, othername: userProfile.othername, email: userProfile.email, phonenumber: userProfile.phonenumber, user_image: userProfile.passporturl, isAdmin: userProfile.isAdmin,
                  }, process.env.SECRET_KEY, { expiresIn: '1h' },
                );
                const data = {
                  token,
                  user: userProfile,
                };
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
      });
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

    db.query('SELECT * FROM users WHERE email = $1', [email])
      .then((user) => {
        if (!user.rows[0]) {
          return res.status(400).json({
            status: 400,
            error: 'You have entered an invalid email or password',
          });
        }
        const allowEntry = bcrypt.compareSync(password, user.rows[0].password);
        if (!allowEntry) {
          return res.status(400).json({
            status: 400,
            error: 'You have entered an invalid email or password',
          });
        }
        const userProfile = user.rows[0];
        const token = jwt.sign(
          {
            id: userProfile.id, firstname: userProfile.firstname, lastname: userProfile.lastname, othername: userProfile.othername, email: userProfile.email, phonenumber: userProfile.phonenumber, user_image: userProfile.passporturl, isAdmin: userProfile.isAdmin,
          }, process.env.SECRET_KEY, { expiresIn: '1h' },
        );
        const authUser = {
          id: userProfile.id, firstname: userProfile.firstname, lastname: userProfile.lastname, othername: userProfile.othername, email: userProfile.email, phonenumber: userProfile.phonenumber, user_image: userProfile.passporturl, isAdmin: userProfile.isAdmin,
        };
        const data = [
          {
            token,
            user: authUser,
          },
        ];
        return res.status(200).json({
          status: 200,
          data,
          message: 'Login successfully',
        });
      })
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
