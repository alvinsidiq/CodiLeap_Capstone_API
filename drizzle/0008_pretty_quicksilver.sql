CREATE TABLE IF NOT EXISTS "user" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "users" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "users" CASCADE;--> statement-breakpoint
ALTER TABLE "user_badge" DROP CONSTRAINT "user_badge_user_badge_users_id_fk";
--> statement-breakpoint
ALTER TABLE "user_badge" ADD COLUMN "user_badge_id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "user_badge" ADD COLUMN "user_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_badge" ADD CONSTRAINT "user_badge_user_id_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user_badge" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "user_badge" DROP COLUMN IF EXISTS "user_badge";