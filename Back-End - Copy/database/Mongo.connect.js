const { MongoClient } = require("mongodb");
require("dotenv").config();

class MongosConnect {
  async queryData(option) { // get all user if 
    const client = new MongoClient(process.env.DATABASE_ENV || "");
    try {
      await client.connect();
      const selectDB = client.db("project");
      const data = await selectDB.collection("database").find(option).limit(10).toArray();
      console.log(data.map((item)=>{
        return item.activity
      }))  
      return data;
    } catch (err) {
      console.log(err);
      return null;
    } finally {
      client.close();
    }
  }
  async queryActivity(option){
    const client = new MongoClient(process.env.DATABASE_ENV || "");
    try {
      await client.connect();
      const selectDB = client.db("project");
      const data = await selectDB.collection("database").find(option).project({ activity: 1, _id: 0 }).limit(10).toArray();
      return data;
    } catch (err) {
      console.log(err);
      return null;
    } finally {
      client.close();
    }
  }
  async updateOne(email,option){ // email selec user add activity
    const client = new MongoClient(process.env.DATABASE_ENV || "");
    try {
      await client.connect();
      const selectDB = client.db("project");
      const data = await selectDB.collection("database").updateOne(email,option)
      return data;
    } catch (err) {
      console.log(err);
      return null;
    } finally {
      client.close();
    }
  }
}

module.exports = MongosConnect;
