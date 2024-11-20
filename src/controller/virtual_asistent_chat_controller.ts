import { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import {
  AddVirtualAsistent,
  GetAllVirtualAsistent,
  GetVirtualAsistentById,
  UpdateVirtualAsistent,
  DeleteVirtualAsistent,
} from "@/service/virtual_asistent_chat_service";
import { AddVirtualAsistentType } from "@/core/models/virtual_asistent_chat_model";

// Post Virtual Assistant Chat
const postVirtualAsistentChatController = async (c: Context) => {
  try {
    const data: AddVirtualAsistentType = await c.req.json();
    const response = await AddVirtualAsistent(data);
    return c.json(
      {
        message: "Successfully created virtual assistant chat",
        httpStatus: StatusCodes.CREATED,
        data: response,
      },
      StatusCodes.CREATED
    );
  } catch (error: any) {
    return c.json(
      {
        message: error.message,
        httpStatus: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// Get All Virtual Assistant Chats
const getAllVirtualAsistentChatController = async (c: Context) => {
  try {
    const chats = await GetAllVirtualAsistent();
    return c.json(
      {
        message: "Successfully retrieved virtual assistant chats",
        httpStatus: StatusCodes.OK,
        data: chats,
      },
      StatusCodes.OK
    );
  } catch (error: any) {
    return c.json(
      {
        message: error.message,
        httpStatus: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// Get Virtual Assistant Chat by ID
const getVirtualAsistentChatByIdController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const chat = await GetVirtualAsistentById(id);
    if (!chat) {
      return c.json(
        {
          message: "Virtual assistant chat not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully retrieved virtual assistant chat",
        httpStatus: StatusCodes.OK,
        data: chat,
      },
      StatusCodes.OK
    );
  } catch (error: any) {
    return c.json(
      {
        message: error.message,
        httpStatus: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// Update Virtual Assistant Chat
const updateVirtualAsistentChatController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const data: AddVirtualAsistentType = await c.req.json();
    const chat = await UpdateVirtualAsistent(id, data);
    if (!chat) {
      return c.json(
        {
          message: "Virtual assistant chat not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully updated virtual assistant chat",
        httpStatus: StatusCodes.OK,
        data: chat,
      },
      StatusCodes.OK
    );
  } catch (error: any) {
    return c.json(
      {
        message: error.message,
        httpStatus: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// Delete Virtual Assistant Chat
const deleteVirtualAsistentChatController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const chat = await DeleteVirtualAsistent(id);
    if (!chat) {
      return c.json(
        {
          message: "Virtual assistant chat not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully deleted virtual assistant chat",
        httpStatus: StatusCodes.OK,
        data: chat,
      },
      StatusCodes.OK
    );
  } catch (error: any) {
    return c.json(
      {
        message: error.message,
        httpStatus: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export {
  postVirtualAsistentChatController,
  getAllVirtualAsistentChatController,
  getVirtualAsistentChatByIdController,
  updateVirtualAsistentChatController,
  deleteVirtualAsistentChatController,
};
