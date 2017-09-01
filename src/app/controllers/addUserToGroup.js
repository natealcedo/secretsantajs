import { Group } from "app/models";
import errors from "lib/errors";

const _addUserToGroup = platform => async (userId, groupId) => {
  try {
    const group = await Group.findOne({
      platform,
      identifier: groupId,
      ended: false,
    });
    if (!group) {
      throw errors.GROUP_DOES_NOT_EXIST;
    }
    const index = group.users.indexOf(userId);
    if (index >= 0) {
      throw errors.USER_ALREADY_IN_GROUP;
    }
    group.users = group.users.concat([userId]);
    console.log("ssaving");
    await group.save();
  } catch (error) {
    throw error;
  }
};

export default _addUserToGroup;
