import { Group } from "app/models";
import { errors } from "lib";
import { generateRandomInteger } from "lib/utils";

const _assignGiftReceipients = platform => async identifier => {
  try {
    const group = await Group.findOne({ platform, identifier, ended: false });
    // TODO: remove comment for production
    // if (group.users.length < 4) {
    //   throw errors.NOT_ENOUGH_PARTICIPANTS;
    // }
    group.receipients = nonConflictShuffle(group.users);
    await group.save();
    return group.receipients;
  } catch (error) {
    throw error;
  }
};

const nonConflictShuffle = array => {
  const receipients = array.reduce((acc, giver) => {
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
  return receipients.length > 0 ? receipients : nonConflictShuffle(array);
};

export default _assignGiftReceipients;
