const MongosConnect = require("../database/Mongo.connect");
const { v4: uuidv4 } = require("uuid");

class Activity {
  async getActivity(body) {
    const connect = new MongosConnect();
    const data = await connect.queryActivity(body ? body : {});
    return {
      data: data,
      devMessage: "Success",
    };
  }
  async addActivity(body) {

    const connect = new MongosConnect();

    const newActivity = {
      act_id: uuidv4(),
      act_type: body.act_type,
      act_name: body.act_name,
      act_desc: body.act_desc,
      duration: parseInt(body.duration) || null,
      cal_burn: parseFloat(body.cal_burn) || '',
      kg_burn: parseFloat(body.kg_burn) || '',
      cur_weight: parseFloat(body.cur_weight) || '',
      created_at: new Date(Date.now()).toISOString(),
      updated_at: new Date(Date.now()).toISOString(),
    };

    const data = await connect.updateOne(
      { email: body.email },
      {
        $push: { activity: newActivity },
      }
    );
    
    return {
      data: data,
      devMessage: "Success",
    };
  }
}

module.exports = Activity;
