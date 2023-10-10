const MongosConnect = require("../database/Mongo.connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class User {
  async getUser(body) {
    const connect = new MongosConnect();
    const userActive = {};
    if (body.email) userActive.email = body.email;
    userActive.is_active = true;
    console.log(userActive);
    const data = await connect.queryData(userActive);
    if (!data || data.length === 0) {
      return {
        data: {},
        statusCode: 404,
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
    const userActive = {};
    if (body.email) userActive.email = body.email;
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
    const { email } = body.email;
    // console.log(email)
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
    const connect = new MongosConnect();
    const existingUser = await connect.queryData({ email: body.email });
    for (const user of existingUser) {
      if (user.email === body.email) {
        return {
          devMessage: "Email is already in use",
          statusCode: 409,
        };
      }
    }

    const saltRounds = 12;
    const hashedPassword = bcrypt.hashSync(body.password, saltRounds);

    const newUser = {
      email: body.email,
      name: body.name,
      password: hashedPassword,
      age: parseInt(body.age) || undefined,
      image: {
        profile_img: body.profile_img,
        cover_img: body.profile_img,
      },
      description: body.description || undefined,
      activity: [],
      is_active: true,
      created_at: new Date(Date.now()).toISOString(),
      updated_at: new Date(Date.now()).toISOString(),
    };
    // console.log(newUser);
    const data = await connect.insertOneData(newUser);
    return {
      data: data,
      statusCode: 200,
      devMessage: "Success",
    };
  }

  async updateUser(body) {
    const connect = new MongosConnect();

    // const hashedPassword = bcrypt.hashSync(body.password, saltRounds);
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
        email: body.email,
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

  async disableUser(body) {
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
        email: body.email,
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
}

module.exports = User;
