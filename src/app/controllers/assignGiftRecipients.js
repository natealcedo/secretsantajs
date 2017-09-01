import { Group } from "app/models";
import { errors } from "lib";
import { generateRandomInteger } from "lib/utils";

const _assignGiftRecipients = platform => async identifier => {
  try {
    const group = await Group.findOne({ platform, identifier, ended: false });
    if (group.users.length < 3) {
      throw errors.NOT_ENOUGH_PARTICIPANTS;
    }
    group.recipients = nonConflictShuffle(group.users);
    await group.save();
    return group.recipients;
  } catch (error) {
    throw error;
  }
};

const nonConflictShuffle = array => {
  const recipients = array.reduce((acc, giver, index) => {
    const candidates = array.filter(
      user => acc.concat([giver]).indexOf(user) < 0,
    );
    if (candidates.length < 1) {
      // make array empty if there is end collision
      return [];
    }
    const randomIndex = generateRandomInteger(0, candidates.length - 1);
    const randomReceipient = candidates[randomIndex];
    array.splice(randomIndex, 1);
    return acc.concat([randomReceipient]);
  }, []);
  // recursively regenerate list if array is empty
  return recipients.length > 0 ? recipients : nonConflictShuffle(array);
};

export default _assignGiftRecipients;
