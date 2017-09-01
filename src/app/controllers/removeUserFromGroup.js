import { Group } from "app/models";
import { errors } from "lib";

const _removeUserFromGroup = platform => async (userId, groupId) => {
  try {
    const group = await Group.findOne({ identifier: groupId, ended: false });
    if (!group) {
      throw errors.GROUP_DOES_NOT_EXIST;
    }
    if (group.users.indexOf(userId) < 0) {
      throw errors.USER_NOT_IN_GROUP;
    }

    group.users = group.users.filter(
      enumUser => enumUser !== userId.toString(),
    );
    await group.save();
  } catch (error) {
    throw error;
  }
};

export default _removeUserFromGroup;
