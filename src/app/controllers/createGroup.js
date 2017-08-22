import { Group } from "app/models";
import errors from "lib/errors";

const _createGroup = platform => async identifier => {
  try {
    let group = await Group.findOne({ platform, identifier });
    if (group) {
      throw errors.GROUP_ALREADY_EXISTS;
    }
    group = new Group({ platform, identifier });
    group.save();
  } catch (error) {
    throw error;
  }
};

export default _createGroup;
