const TALK_TO_BOT =
  "Hey $0, please send me a private message at @HohohohoBot so that I can reveal your gift recipient to you later!";
const RECEIPIENT_REVEAL = "Your secret santa gift receipient from $0 is $1.";
const NO_PARTICIPANTS =
  "No one has joined the secret santa game yet! Type /join to participate.";
const LIST_PARTICIPANTS = "Secret santa game participants: $0";
const CREATE_GROUP_SUCCESS =
  "Ho ho ho! A secret santa game has been started! Type /join to participate.";
const JOIN_GROUP_SUCCESS = "$0 has joined the secret santa game.";
const REVEAL_PROMPT =
  "I will message you your gift recipient here in private once you have been assigned one.";
const LEAVE_GROUP_SUCCESS = "$0 has left the secret santa game.";
const LIST_PARTICIPANTS_AND_SANTAS = "Ho ho ho! Here are your pairings:\n$0";
const END_GROUP_SUCCESS =
  "$0 has ended the secret santa game. Type /start to start another secret santa game!";
const HELP_INFO_GROUP = `<b>How to play:</b>
1. To create a secret santa game, type /start.
2. Then, users can type /join to participate.
3. When all participants have joined, type /assign to be assigned a random gift recipient.
4. Finally, you can reveal all secret santas and their gift recipients by typing /reveal.

<b>Available commands:</b>
/start - starts a secret santa game
/join - adds you to the secret santa game
/leave - remove you from the secret santa game
/list - list all the participants of the secret santa game
/assign - assign a random gift recipient to all participants
/reveal - reveals all the secret santas and their gift recipients
/end - ends the secret santa game
/info - gives information about the bot
/help - lists all the available commands`;
const BOT_INFO =
  "Secret Santa Bot (secretsantajs) is an open-sourced, multi-platform chat bot for facilitating secret santa games by Liau Jian Jie, Nathaniel Alcedo and Jasper Teo from Singapore.\n\nWebsite: https://example.com\nGitHub: https://github.com/ndaljr/secretsantajs";

export default {
  TALK_TO_BOT,
  RECEIPIENT_REVEAL,
  NO_PARTICIPANTS,
  LIST_PARTICIPANTS,
  CREATE_GROUP_SUCCESS,
  JOIN_GROUP_SUCCESS,
  REVEAL_PROMPT,
  LEAVE_GROUP_SUCCESS,
  LIST_PARTICIPANTS_AND_SANTAS,
  END_GROUP_SUCCESS,
  HELP_INFO_GROUP,
  BOT_INFO,
};
