import { Group } from "app/models";
import { errors } from "lib";

const _getReceipients = platform => async user => {
  try {
    const allReceipients = await Group.find({ users: { $in: [user] } });
    const allReceipientObjects = allReceipients.map(group => {
      const index = group.users.indexOf(user);
      const receipient = group.receipients[index];
      return {
        group: group.identifier,
        receipient,
      };
    });
    return allReceipientObjects;
  } catch (error) {
    throw error;
  }
};

export default _getReceipients;
