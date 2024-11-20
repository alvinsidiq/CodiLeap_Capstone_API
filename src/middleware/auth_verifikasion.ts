import { Context, Next } from "hono";
import { verifyToken } from "@/core/utils/utilis_jwt";

export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization");

  // Cek apakah header Authorization ada
  if (!authHeader) {
    return c.json({ error: "Authorization header is missing" }, 401);
  }

  // Split token dari header dan validasi formatnya
  const token = authHeader.split(" ")[1];
  if (!token) {
    return c.json({ error: "No token provided" }, 401);
  }

  try {
    // Verifikasi token menggunakan fungsi verifyToken
    const decoded = verifyToken(token);

    // Tambahkan informasi pengguna ke context untuk digunakan di rute
    c.set("user", decoded);

    // Panggil middleware berikutnya
    await next();
  } catch (error:any) {
    // Tangani berbagai jenis error JWT
    if (error.name === "TokenExpiredError") {
      return c.json({ error: "Token has expired" }, 401);
    } else if (error.name === "JsonWebTokenError") {
      return c.json({ error: "Invalid token" }, 403);
    } else {
      return c.json({ error: "Failed to authenticate token" }, 500);
    }
  }
};
