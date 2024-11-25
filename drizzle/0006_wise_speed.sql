ALTER TABLE "badge" ADD COLUMN "image_url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "badge" ADD COLUMN "requirements" json DEFAULT '[]'::json;--> statement-breakpoint
ALTER TABLE "modules" ADD COLUMN "description" varchar(1000);--> statement-breakpoint
ALTER TABLE "modules" ADD COLUMN "completed_lessons" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "modules" ADD COLUMN "learning_path_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "user_badge" ADD COLUMN "badge_id" integer;--> statement-breakpoint
ALTER TABLE "user_badge" ADD COLUMN "earned_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "badge" DROP COLUMN IF EXISTS "image";