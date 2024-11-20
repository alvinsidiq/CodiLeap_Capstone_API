ALTER TABLE "user_learn" ALTER COLUMN "name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user_learn" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user_learn" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user_learn" ADD CONSTRAINT "user_learn_email_unique" UNIQUE("email");