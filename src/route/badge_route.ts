import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { Badge } from "@/core/models/badge_model";
import * as BadgeService from "@/service/badge_service";


const badge = new Hono();
// Create new badge
badge.post("/", zValidator("json", Badge), async (c) => {
  try {
      const data = await c.req.json();
      const response = await BadgeService.AddBadge(data);
      return c.json({
          message: "Badge created successfully",
          status: "success",
          data: response
      }, 201);
  } catch (error: any) {
      return c.json({
          message: error.message,
          status: "error",
          data: null
      }, 500);
  }
});

// Get all badges
badge.get("/", async (c) => {
  try {
      const response = await BadgeService.GetAllBadge();
      return c.json({
          message: "Badges retrieved successfully",
          status: "success",
          data: response
      });
  } catch (error: any) {
      return c.json({
          message: error.message,
          status: "error",
          data: null
      }, 500);
  }
});

// Get user's badges
badge.get("/user/:userId", async (c) => {
    try {
      const userId = parseInt(c.param("userId"));
  
      // Retrieve earned and available badges
      const { earnedBadges, availableBadges } = await BadgeService.GetUserBadges(userId);
  
      return c.json({
        message: "User badges retrieved successfully",
        status: "OK",
        data: {
          earnedBadges,
          availableBadges,
        },
      });
    } catch (error: any) {
      return c.json({
        message: error.message,
        status: "error",
        data: null,
      }, 500);
    }
  });

// Get specific badge
badge.get("/:id", async (c) => {
  try {
      const id = parseInt(c.param('id'));
      const response = await BadgeService.GetBadgeById(id);
      return c.json({
          message: "Badge retrieved successfully",
          status: "success",
          data: response
      });
  } catch (error: any) {
      return c.json({
          message: error.message,
          status: "error",
          data: null
      }, 500);
  }
});

// Update badge
badge.put("/:id", async (c) => {
  try {
      const id = parseInt(c.param('id'));
      const data = await c.req.json();
      const response = await BadgeService.UpdateBadge(id, data);
      return c.json({
          message: "Badge updated successfully",
          status: "success",
          data: response
      });
  } catch (error: any) {
      return c.json({
          message: error.message,
          status: "error",
          data: null
      }, 500);
  }
});

// Delete badge
badge.delete("/:id", async (c) => {
  try {
      const id = parseInt(c.param('id'));
      const response = await BadgeService.DeleteBadge(id);
      return c.json({
          message: "Badge deleted successfully",
          status: "success",
          data: response
      });
  } catch (error: any) {
      return c.json({
          message: error.message,
          status: "error",
          data: null
      }, 500);
  }
});

export default badge;



// const badge = new Hono();

// // Route POST untuk menambahkan Badge
// badge.post(
//   "/",
//   zValidator("json", Badge), // Validasi input menggunakan skema Zod
//   async (c: Context) => {
//     try {
//       const data = await c.req.json(); // Ambil data dari request body
//       const response = await AddBadge(data); // Panggil service untuk menambah data

//       return c.json(
//         {
//           message: "Successfully created new badge", // Pesan sukses
//           status: "CREATED",
//           data: response, // Data yang baru ditambahkan
//         },
//         StatusCodes.CREATED
//       );
//     } catch (error: any) {
//       return c.json(
//         {
//           message: error.message, // Pesan error
//           status: "INTERNAL_SERVER_ERROR",
//           data: null,
//         },
//         StatusCodes.INTERNAL_SERVER_ERROR
//       );
//     }
//   }
// );

// // Route GET untuk mengambil semua Badge
// badge.get("/", async (c: Context) => {
//   try {
//     const response = await GetAllBadge(); // Panggil service untuk mengambil semua data
//     return c.json(
//       {
//         message: "Successfully retrieved all badges", // Pesan sukses
//         status: "OK",
//         data: response, // Data Badge
//       },
//       StatusCodes.OK
//     );
//   } catch (error: any) {
//     return c.json(
//       {
//         message: error.message, // Pesan error
//         status: "INTERNAL_SERVER_ERROR",
//         data: null,
//       },
//       StatusCodes.INTERNAL_SERVER_ERROR
//     );
//   }
// });

// // Route GET untuk mengambil Badge berdasarkan ID
// badge.get("/:id", async (c: Context) => {
//   try {
//     const id = parseInt(c.req.param("id")); // Ambil ID dari parameter URL
//     const response = await GetBadgetById(id); // Panggil service untuk mengambil data berdasarkan ID

//     if (!response) {
//       return c.json(
//         {
//           message: "Badge not found", // Pesan jika data tidak ditemukan
//           status: "NOT_FOUND",
//           data: null,
//         },
//         StatusCodes.NOT_FOUND
//       );
//     }

//     return c.json(
//       {
//         message: "Successfully retrieved badge", // Pesan sukses
//         status: "OK",
//         data: response, // Data Badge
//       },
//       StatusCodes.OK
//     );
//   } catch (error: any) {
//     return c.json(
//       {
//         message: error.message, // Pesan error
//         status: "INTERNAL_SERVER_ERROR",
//         data: null,
//       },
//       StatusCodes.INTERNAL_SERVER_ERROR
//     );
//   }
// });

// // Route PUT untuk memperbarui Badge berdasarkan ID
// badge.put("/:id", async (c: Context) => {
//   try {
//     const id = parseInt(c.req.param("id")); // Ambil ID dari parameter URL
//     const data = await c.req.json(); // Ambil data dari request body

//     const response = await UpdateBadge(id, data); // Panggil service untuk memperbarui data

//     if (!response) {
//       return c.json(
//         {
//           message: "Badge not found", // Pesan jika data tidak ditemukan
//           status: "NOT_FOUND",
//           data: null,
//         },
//         StatusCodes.NOT_FOUND
//       );
//     }

//     return c.json(
//       {
//         message: "Successfully updated badge", // Pesan sukses
//         status: "OK",
//         data: response, // Data Badge yang diperbarui
//       },
//       StatusCodes.OK
//     );
//   } catch (error: any) {
//     return c.json(
//       {
//         message: error.message, // Pesan error
//         status: "INTERNAL_SERVER_ERROR",
//         data: null,
//       },
//       StatusCodes.INTERNAL_SERVER_ERROR
//     );
//   }
// });

// // Route DELETE untuk menghapus Badge berdasarkan ID
// badge.delete("/:id", async (c: Context) => {
//   try {
//     const id = parseInt(c.req.param("id")); // Ambil ID dari parameter URL
//     const response = await DeleteBadge(id); // Panggil service untuk menghapus data

//     if (!response) {
//       return c.json(
//         {
//           message: "Badge not found", // Pesan jika data tidak ditemukan
//           status: "NOT_FOUND",
//           data: null,
//         },
//         StatusCodes.NOT_FOUND
//       );
//     }

//     return c.json(
//       {
//         message: "Successfully deleted badge", // Pesan sukses
//         status: "OK",
//         data: null,
//       },
//       StatusCodes.OK
//     );
//   } catch (error: any) {
//     return c.json(
//       {
//         message: error.message, // Pesan error
//         status: "INTERNAL_SERVER_ERROR",
//         data: null,
//       },
//       StatusCodes.INTERNAL_SERVER_ERROR
//     );
//   }
// });

// export default badge;
