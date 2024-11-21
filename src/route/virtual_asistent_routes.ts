import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { StatusCodes } from "http-status-codes";
import { VirtualAsistentChat } from "@/core/models/virtual_asistent_chat_model";
import {
  AddVirtualAsistent,
  GetAllVirtualAsistent,
  GetVirtualAsistentById,
  UpdateVirtualAsistent,
  DeleteVirtualAsistent,
} from "@/service/virtual_asistent_chat_service";

// Inisialisasi aplikasi Hono
const virtualAsistent = new Hono();

// Route to create a new Virtual Assistant Chat
virtualAsistent.post(
  "/",
  zValidator("json", VirtualAsistentChat), // Validate input data using Zod schema
  async (c) => {
    try {
      const data = c.req.valid("json"); // Validate and parse input data
      const response = await AddVirtualAsistent(data); // Add new Virtual Assistant chat
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
  }
);

// Route to get all Virtual Assistant Chats
virtualAsistent.get("/", async (c) => {
  try {
    const chats = await GetAllVirtualAsistent(); // Fetch all virtual assistant chats
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
});

// Route to get a Virtual Assistant Chat by ID
virtualAsistent.get("/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id")); // Extract ID from the URL parameters
    const chat = await GetVirtualAsistentById(id); // Fetch chat by ID
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
});

// Route to update a Virtual Assistant Chat by ID
virtualAsistent.put("/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id")); // Extract ID from the URL parameters
    const data = await c.req.json(); // Get the updated data from the request body
    const chat = await UpdateVirtualAsistent(id, data); // Update the chat by ID
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
});

// Route to delete a Virtual Assistant Chat by ID
virtualAsistent.delete("/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id")); // Extract ID from the URL parameters
    const chat = await DeleteVirtualAsistent(id); // Delete the chat by ID
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
});

export default virtualAsistent;
