import { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import {
  AddAnalytics,
  GetAllAnalytics,
  GetAnalyticsById,
  UpdateAnalytics,
  DeleteAnalytics,
} from "@/service/analytics_service";
import { AddAnalyticsType } from "@/core/models/analytics_model";

// Post Analytics
const postAnalyticsController = async (c: Context) => {
  try {
    const data: AddAnalyticsType = await c.req.json();
    const response = await AddAnalytics(data);
    return c.json(
      {
        message: "Successfully created analytics entry",
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

// Get All Analytics
const getAllAnalyticsController = async (c: Context) => {
  try {
    const analytics = await GetAllAnalytics();
    return c.json(
      {
        message: "Successfully retrieved analytics entries",
        httpStatus: StatusCodes.OK,
        data: analytics,
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

// Get Analytics by ID
const getAnalyticsByIdController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const analytics = await GetAnalyticsById(id);
    if (!analytics) {
      return c.json(
        {
          message: "Analytics entry not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully retrieved analytics entry",
        httpStatus: StatusCodes.OK,
        data: analytics,
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

// Update Analytics
const updateAnalyticsController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const data: AddAnalyticsType = await c.req.json();
    const analytics = await UpdateAnalytics(id, data);
    if (!analytics) {
      return c.json(
        {
          message: "Analytics entry not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully updated analytics entry",
        httpStatus: StatusCodes.OK,
        data: analytics,
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

// Delete Analytics
const deleteAnalyticsController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const analytics = await DeleteAnalytics(id);
    if (!analytics) {
      return c.json(
        {
          message: "Analytics entry not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully deleted analytics entry",
        httpStatus: StatusCodes.OK,
        data: analytics,
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
  postAnalyticsController,
  getAllAnalyticsController,
  getAnalyticsByIdController,
  updateAnalyticsController,
  deleteAnalyticsController,
};
