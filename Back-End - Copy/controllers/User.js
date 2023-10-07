const MongosConnect  = require("../database/Mongo.connect");

class User {
  async getUser(body) {
    const connect = new MongosConnect();
    const data = await connect.queryData(body ? body : {});
    return {
      data: data,
      devMessage: "Success",
    };
  }
}

module.exports = User;
