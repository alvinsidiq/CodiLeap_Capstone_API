CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"hashed_password" varchar NOT NULL,
	"name" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"study_hour" integer DEFAULT 0,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "user" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "user" CASCADE;--> statement-breakpoint
ALTER TABLE "user_badge" DROP CONSTRAINT "user_badge_user_id_user_user_id_fk";
--> statement-breakpoint
ALTER TABLE "user_badge" ADD COLUMN "id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "user_badge" ADD COLUMN "user_badge" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_badge" ADD CONSTRAINT "user_badge_user_badge_users_id_fk" FOREIGN KEY ("user_badge") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user_badge" DROP COLUMN IF EXISTS "user_badge_id";--> statement-breakpoint
ALTER TABLE "user_badge" DROP COLUMN IF EXISTS "user_id";