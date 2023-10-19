const { Long } = require("mongodb");
const MongosConnect = require("../database/Mongo.connect");
const { v4: uuidv4 } = require("uuid");

class Activity {
  async getActivity(userId) {
    const connect = new MongosConnect();
    const data = await connect.queryActivity(userId);
    return {
      data: data,
      statusCode: 200,
      devMessage: "Success",
    };
  }

  async addActivity(userId, body) {
    const connect = new MongosConnect();
    if (
      !/^(Training|KitaMuaythai|Run|Yoga|Aerobics)$/.test(body.act_type) ||
      !body.act_name ||
      !body.duration ||
      !body.cal_burn ||
      !body.kg_burn ||
      !body.cur_weight ||
      !body
    ) {
      return {
        data: {},
        statusCode: 400,
        devMessage: "Request is incomplete",
      };
    }
    const newActivity = {
      act_id: uuidv4(),
      act_type: body.act_type,
      act_name: body.act_name || undefined,
      act_desc: body.act_desc || undefined,
      duration: parseInt(body.duration) || undefined,
      cal_burn: parseFloat(body.cal_burn) || undefined,
      kg_burn: parseFloat(body.kg_burn) || undefined,
      cur_weight: parseFloat(body.cur_weight) || undefined,
      created_at: new Date(Date.now()).toISOString(),
      updated_at: new Date(Date.now()).toISOString(),
    };

    const data = await connect.updateOne(
      { email: userId },
      {
        $push: { activity: newActivity },
      }
    );

    return {
      data: data,
      statusCode: 200,
      devMessage: "Success",
    };
  }

  async editActivity(userId, body) {
    const connect = new MongosConnect();
    if (
      !/^(Training|KitaMuaythai|Run|Yoga|Aerobics)$/.test(body.act_type) ||
      !body ||
      !body.act_id
    ) {
      return {
        data: {},
        statusCode: 400,
        devMessage: "Request is incomplete",
      };
    }
    const updateField = {};
    if (body.act_type) updateField["activity.$.act_type"] = body.act_type;
    if (body.act_name) updateField["activity.$.act_name"] = body.act_name;
    if (body.act_desc) updateField["activity.$.act_desc"] = body.act_desc;
    if (body.duration) updateField["activity.$.duration"] = body.duration;
    if (body.cal_burn) updateField["activity.$.cal_burn"] = body.cal_burn;
    if (body.kg_burn) updateField["activity.$.kg_burn"] = body.kg_burn;
    if (body.cur_weight) updateField["activity.$.cur_weight"] = body.cur_weight;
    updateField["activity.$.updated_at"] = new Date(Date.now()).toISOString();

    const data = await connect.editActivity(
      {
        email: userId,
        "activity.act_id": body.act_id,
      },
      {
        $set: updateField,
      }
    );

    return {
      data: data,
      statusCode: 200,
      devMessage: "Success",
    };
  }

  async delActivity(userId, body) {
    const connect = new MongosConnect();
    if (!body || !body.act_id) {
      return {
        data: {},
        statusCode: 400,
        devMessage: "Request is incomplete",
      };
    }
    // find if on database
    const data = await connect.queryActivity(
      {
        email: userId,
      },
      {
        act_id: body.act_id,
      }
    );
    const existingID = data.map((e) => e.activity[0]);
    for (const id of existingID) {
      if (body.act_id !== id.act_id) {
        return {
          devMessage: "ID not available in database system",
          statusCode: 409,
        };
      }
    }
    await connect.updateOne(
      {
        email: userId,
      },
      {
        $pull: {
          activity: { act_id: body.act_id },
        },
      }
    );
    return {
      data: {},
      statusCode: 200,
      devMessage: "Success",
    };
  }

  async groupActivity(userId) {
    const connect = new MongosConnect();
    const pipeline = [
      {
        $match: userId,
      },
      {
        $unwind: "$activity",
      },
      {
        $match: {
          "activity.act_type": {
            $in: ["Run", "Yoga", "Training", "KitaMuaythai", "Aerobics"],
          },
        },
      },
      {
        $group: {
          _id: "$activity.act_type",
          value: {
            $sum: "$activity.cal_burn",
          },
        },
      },
    ];

    const data = await connect.groupBy(pipeline);
    return {
      data: data,
      statusCode: 200,
      devMessage: "Success",
    };
  }

  async showKgcal(userId) {
    const connect = new MongosConnect();
    const pipeline = [
      {
        $match: userId,
      },
      {
        $unwind: "$activity",
      },
      {
        $match: {
          "activity.act_type": {
            $in: ["Run", "Yoga", "Training", "KitaMuaythai", "Aerobics"],
          },
        },
      },
      {
        $group: {
          _id: "$activity.act_type",
          kgBurned: {
            $sum: "$activity.kg_burn",
          },
          Time: {
            $sum: "$activity.duration",
          },
        },
      },
    ];

    const data = await connect.groupBy(pipeline);
    return {
      data: data,
      statusCode: 200,
      devMessage: "Success",
    };
  }
}

module.exports = Activity;
