import { Group } from "app/models";
import { errors } from "lib";

const _assignGiftReceipients = platform => async identifier => {
  try {
    const group = await Group.findOne({ identifier });
    console.log(group);
    group.receipients = nonConflictShuffle(group.users);
    await group.save();
    return group.receipients;
  } catch (error) {
    throw error;
  }
};

const nonConflictShuffle = array => {
  const currentIndex = array.length;
  const receipients = array.reduce((acc, user) => {
    console.log(acc);
    const receipient = getRandomUser(acc, user);
    return acc.splice(acc.indexOf(receipient), 0);
  }, array);
  return receipients;
};

const getRandomUser = (bucket, userToAvoid) => {
  const cleanBucket = bucket.filter(user => user !== userToAvoid);
  if (cleanBucket.length <= 0) {
    throw new Error("conflict la cb");
  }
  const index = getRandomInt(0, cleanBucket.length - 1);
  return cleanBucket[index];
};

// source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomInt = (min, max) => {
  const minFloor = Math.ceil(min);
  const maxFloor = Math.floor(max);
  return Math.floor(Math.random() * (maxFloor - minFloor)) + minFloor;
};

export default _assignGiftReceipients;
