import Group from "app/models/Group";
// import User from "app/models/User";
import ERROR from "lib/errors";

const _createGroup = platform => async identifier => {
  try {
    const existingGroup = await Group.findOne({ platform, identifier });
    if (existingGroup) {
      throw ERROR.GROUP_ALREADY_EXISTS;
    }
    const newGroup = new Group({ platform, identifier });
    await newGroup.save();
  } catch (error) {
    throw error;
  }
};

export default _createGroup;
