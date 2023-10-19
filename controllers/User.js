const MongosConnect = require("../database/Mongo.connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

class User {
  async getUser(userId) {
    const connect = new MongosConnect();
    const userActive = {};
    if (userId) userActive.email = userId;
    userActive.is_active = true;
    const data = await connect.queryData(userActive);
    if (!data || data.length === 0) {
      return {
        data: {},
        statusCode: 409,
        devMessage: "User not found or is not active",
      };
    }
    return {
      data: data,
      statusCode: 200,
      devMessage: "Success",
    };
  }

  async loginUser(body) {
    const connect = new MongosConnect();
    const email = body.email.toLowerCase();
    const userActive = {};
    if (email) userActive.email = email;
    if (body.password) userActive.is_active = true;
    const data = await connect.queryData(userActive);
    const password = data.map((pw) => pw.password);
    const validPassword = bcrypt.compareSync(
      body.password,
      password.toString()
    );
    if (!data || data.length === 0) {
      return {
        data: {},
        statusCode: 404,
        devMessage: "User not found or is not active",
      };
    }
    if (!validPassword) {
      return {
        data: {},
        statusCode: 400,
        devMessage: "Invalid email or password",
      };
    }
    function createJwt(email) {
      const jwtSecretKey = process.env.JWT_SECRET_KEY;
      const token = jwt.sign({ id: email }, jwtSecretKey, {
        expiresIn: "1h",
      });

      return token;
    }

    return {
      token: createJwt(email),
      statusCode: 200,
      devMessage: "Success",
    };
  }

  async registerUser(body) {
    const email = body.email.toLowerCase();
    const connect = new MongosConnect();
    const existingUser = await connect.queryData({ email: email });
    for (const user of existingUser) {
      if (user.email === email) {
        return {
          devMessage: "Email is already in use",
          statusCode: 409,
        };
      }
    }
    if (!body.name) {
      return {
        devMessage: "Incomplete information",
        statusCode: 409,
      };
    }

    const saltRounds = 12;
    const hashedPassword = bcrypt.hashSync(body.password, saltRounds);

    const newUser = {
      email: body.email.toLowerCase(),
      name: body.name,
      password: hashedPassword,
      age: parseInt(body.age) || undefined,
      image: {
        profile_img: body.profile_img,
        cover_img: body.cover_img,
      },
      description: body.description || undefined,
      activity: [],
      is_active: true,
      created_at: new Date(Date.now()).toISOString(),
      updated_at: new Date(Date.now()).toISOString(),
    };
    // console.log(newUser);
    await connect.insertOneData(newUser);
    return {
      data: {},
      statusCode: 200,
      devMessage: "Success",
    };
  }

  async updateUser(userId, body) {
    const connect = new MongosConnect();
    const updatedField = {};

    if (body.name) updatedField.name = body.name;
    if (body.password) {
      const saltRounds = 12;
      const hashedPassword = bcrypt.hashSync(body.password, saltRounds);
      updatedField.password = hashedPassword;
    }
    if (body.age) updatedField.age = parseInt(body.age) || undefined;
    if (body.profile_img) updatedField["image.profile_img"] = body.profile_img;
    if (body.cover_img) updatedField["image.cover_img"] = body.cover_img;
    if (body.description)
      updatedField.description = body.description || undefined;
    updatedField.updated_at = new Date(Date.now()).toISOString();

    console.log(updatedField);
    const data = await connect.updateOne(
      {
        email: userId,
      },
      {
        $set: updatedField,
      }
    );
    return {
      data: data,
      statusCode: 200,
      devMessage: "Success",
    };
  }

  async disableUser(userId, body) {
    const connect = new MongosConnect();
    if (!/^(true|false)$/.test(body.is_active) || !body) {
      return {
        data: {},
        statusCode: 400,
        devMessage: "Request is incomplete",
      };
    }

    console.log(body.is_active);
    const data = await connect.updateOne(
      {
        email: userId,
      },
      {
        $set: { is_active: body.is_active },
      }
    );
    return {
      data: data,
      statusCode: 200,
      devMessage: "Success",
    };
  }

  async forgotPassword(body) {
    const connect = new MongosConnect();
    if (!body || !body.email) {
      return {
        statusCode: 400,
        devMessage: "Request is imcomplete",
      };
    }
    const existingUser = await connect.queryData({
      email: body.email.toLowerCase(),
      is_active: true,
    });
    // if not user or not active get error 404
    if (existingUser.length === 0) {
      return {
        statusCode: 404,
        devMessage: "User not available",
      };
    }
    let infoSend;
    for (const user of existingUser) {
      if (user.email === body.email.toLowerCase()) {
        const token = jwt.sign(
          { id: body.email.toLowerCase() },
          "jwt_secret_key",
          {
            expiresIn: "1d",
          }
        );
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "thorexercisetracking@gmail.com",
            pass: "unsz sazy tzio tbfs",
          },
        });

        let mailOptions = {
          from: "thorexercisetracking@gmail.com",
          to: body.email,
          subject: "Reset Password Link",
          text: `http://localhost:5173/reset-password/${token}`,
        };
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.log(err);
          } else {
            console.log(info);
          }
        });
      }
    }
    return {
      data: {},
      statusCode: 200,
      devMessage: "Success",
    };
  }

  async resetPassword(token, password) {
    const connect = new MongosConnect();
    if (!password) {
      return {
        statusCode: 404,
        devMessage: "Request is incomplete",
      };
    }
    let email;
    if (token) {
      email = jwt.verify(token, "jwt_secret_key", (err, decoded) => {
        if (err) {
          return "Error";
        } else {
          return decoded.id;
        }
      });
    }
    if (email === "Error") {
      return {
        statusCode: 400,
        devMessage: "Invalid token.",
      };
    }

    const saltRounds = 12;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const data = await connect.updateOne(
      {
        email: email,
      },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );
    return {
      data: {},
      statusCode: 200,
      devMessage: "Success",
    };
  }
}
module.exports = User;
