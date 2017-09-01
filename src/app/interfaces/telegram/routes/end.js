import { controllerForInterface } from "lib/utils";
import { responses } from "lib";
import { handleError, sendMessage } from "lib/utils/telegram";

const controller = controllerForInterface("telegram");
const end = async message => {
  try {
    const userIds = await controller.endGroup(message.chat.id);
    await sendMessage(message.chat.id, "Ended.");
  } catch (error) {
    handleError(error, message);
  }
};

export default end;
