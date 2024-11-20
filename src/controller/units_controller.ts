import { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import {
  AddUnits,
  GetAllUnits,
  GetUnitsById,
  UpdateUnits,
  DeleteLearningPath, // Pastikan nama ini sesuai dengan nama fungsi yang benar
} from "@/service/units_service"; // Mengimpor layer service
import { AddUnitsType } from "@/core/models/units_model"; // Mengimpor tipe data

// Controller untuk menambahkan Unit
const postUnitController = async (c: Context) => {
  try {
    const data: AddUnitsType = await c.req.json(); // Mendapatkan data dari body request
    const response = await AddUnits(data); // Menambahkan Unit menggunakan service
    return c.json(
      {
        message: "Successfully added unit",
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

// Controller untuk mengambil semua Unit
const getAllUnitsController = async (c: Context) => {
  try {
    const units = await GetAllUnits(); // Mengambil semua Unit menggunakan service
    return c.json(
      {
        message: "Successfully retrieved all units",
        httpStatus: StatusCodes.OK,
        data: units,
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

// Controller untuk mengambil Unit berdasarkan ID
const getUnitByIdController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id")); // Mendapatkan id dari parameter URL
    const unit = await GetUnitsById(id); // Mengambil Unit berdasarkan ID menggunakan service
    if (!unit) {
      return c.json(
        {
          message: "Unit not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully retrieved unit",
        httpStatus: StatusCodes.OK,
        data: unit,
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

// Controller untuk memperbarui Unit
const updateUnitController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id")); // Mendapatkan id dari parameter URL
    const data = await c.req.json(); // Mendapatkan data terbaru dari body request
    const updatedUnit = await UpdateUnits(id, data); // Memperbarui Unit menggunakan service
    if (!updatedUnit) {
      return c.json(
        {
          message: "Unit not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully updated unit",
        httpStatus: StatusCodes.OK,
        data: updatedUnit,
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

// Controller untuk menghapus Unit
const deleteUnitController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id")); // Mendapatkan id dari parameter URL
    const deletedUnit = await DeleteLearningPath(id); // Menghapus Unit berdasarkan ID menggunakan service
    if (!deletedUnit) {
      return c.json(
        {
          message: "Unit not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully deleted unit",
        httpStatus: StatusCodes.OK,
        data: deletedUnit,
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
  postUnitController,
  getAllUnitsController,
  getUnitByIdController,
  updateUnitController,
  deleteUnitController,
};
