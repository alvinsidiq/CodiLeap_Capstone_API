import { Hono } from "hono";
import {
  postVirtualAsistentChatController,
  getAllVirtualAsistentChatController,
  getVirtualAsistentChatByIdController,
  updateVirtualAsistentChatController,
  deleteVirtualAsistentChatController,
} from "@/controller/virtual_asistent_chat_controller";
import { zValidator } from "@hono/zod-validator";
import { VirtualAsistentChat } from "@/core/models/virtual_asistent_chat_model";

const virtualAsistent = new Hono();

// Route for creating a new Virtual Assistant Chat
virtualAsistent.post(
  "/",
  zValidator("json", VirtualAsistentChat), // Validate input data using Zod schema
  postVirtualAsistentChatController
);

// Route for retrieving all Virtual Assistant Chats
virtualAsistent.get("/", getAllVirtualAsistentChatController);

// Route for retrieving a Virtual Assistant Chat by ID
virtualAsistent.get("/:id", getVirtualAsistentChatByIdController);

// Route for updating a Virtual Assistant Chat by ID
virtualAsistent.put("/:id", updateVirtualAsistentChatController);

// Route for deleting a Virtual Assistant Chat by ID
virtualAsistent.delete("/:id", deleteVirtualAsistentChatController);

export default virtualAsistent;
