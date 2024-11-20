CREATE TABLE IF NOT EXISTS "user_learn" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"hashed_password" varchar NOT NULL,
	"name" varchar NOT NULL,
	"telephone" varchar,
	"address" text,
	"dob" date,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"study_hour" integer DEFAULT 0
);
