const { MongoClient } = require("mongodb");
require("dotenv").config();

class MongosConnect {
  async queryData(option) {
    // get all user
    const client = new MongoClient(process.env.DATABASE_ENV || "");
    try {
      await client.connect();
      const selectDB = client.db("project");
      const data = await selectDB
        .collection("database")
        .find(option)
        .project({ activity: 0 })
        .toArray();
      return data;
    } catch (err) {
      console.log(err);
      return null;
    } finally {
      client.close();
    }
  }
  async insertOneData(option) {
    const client = new MongoClient(process.env.DATABASE_ENV || "");
    try {
      await client.connect();
      const selectDB = client.db("project");
      const data = await selectDB.collection("database").insertOne(option);
      return data;
    } catch (err) {
      console.log(err);
      return null;
    } finally {
      client.close();
    }
  }
  async queryActivity(option) {
    const client = new MongoClient(process.env.DATABASE_ENV || "");
    try {
      await client.connect();
      const selectDB = client.db("project");
      const data = await selectDB
        .collection("database")
        .find(option)
        .project({ activity: 1, _id: 0 })
        .toArray();
      return data;
    } catch (err) {
      console.log(err);
      return null;
    } finally {
      client.close();
    }
  }
  async updateOne(filter, option) {
    // email selec user add activity and delete
    const client = new MongoClient(process.env.DATABASE_ENV || "");
    try {
      await client.connect();
      const selectDB = client.db("project");
      const data = await selectDB
        .collection("database")
        .updateOne(filter, option);
      return data;
    } catch (err) {
      console.log(err);
      return null;
    } finally {
      client.close();
    }
  }
  async editActivity(filter, options) {
    const client = new MongoClient(process.env.DATABASE_ENV || "");
    try {
      await client.connect();
      const selectDB = client.db("project");
      const data = await selectDB
        .collection("database")
        .updateMany(filter, options);
      return data;
    } catch (err) {
      console.log(err);
      return null;
    } finally {
      client.close();
    }
  }
  async groupBy(option) {
    const client = new MongoClient(process.env.DATABASE_ENV || "");
    try {
      await client.connect();
      const selectDB = client.db("project");
      const data = selectDB.collection("database").aggregate(option);
      const response = [];
      await data.forEach((result) => {
        response.push(result);
      });
      return response;
    } catch (err) {
      console.log(err);
      return null;
    } finally {
      client.close();
    }
  }
}

module.exports = MongosConnect;
