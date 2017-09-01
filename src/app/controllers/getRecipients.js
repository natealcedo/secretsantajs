import { Group } from "app/models";
import { errors } from "lib";

const _getRecipients = platform => async user => {
  try {
    const allRecipients = await Group.find({
      ended: false,
      users: { $in: [user] },
    });
    const allRecipientObjects = allRecipients.map(group => {
      const index = group.users.indexOf(user);
      const recipient = group.recipients[index];
      return {
        group: group.identifier,
        recipient,
      };
    });
    return allRecipientObjects;
  } catch (error) {
    throw error;
  }
};

export default _getRecipients;
