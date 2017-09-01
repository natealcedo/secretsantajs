import { controllerForInterface } from "lib/utils";
import { sendMessage, handleError } from "lib/utils/telegram";
import { responses } from "lib";
const controller = controllerForInterface("telegram");

const start = async message => {
  try {
    await controller.createGroup(message.chat.id);
    await sendMessage(message.chat.id, responses.CREATE_GROUP_SUCCESS);
  } catch (error) {
    handleError(error, message);
  }
};

export default start;
