CREATE TABLE IF NOT EXISTS "learning_path_screening" (
	"screening_id" serial PRIMARY KEY NOT NULL,
	"question_id" integer,
	"selected_answer_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "answers" (
	"id" serial PRIMARY KEY NOT NULL,
	"question_id" integer,
	"answer_text" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updatedat" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "screening_results" (
	"screeningResults_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"path_id" integer,
	"score" integer NOT NULL,
	"strengths" json NOT NULL,
	"quiz_id" integer,
	"learning_path_id" integer,
	"answers" json NOT NULL,
	"createdat" timestamp DEFAULT now(),
	"updatedat" timestamp DEFAULT now()
);
--> statement-breakpoint
DROP TABLE "user_screaning_resource" CASCADE;--> statement-breakpoint
ALTER TABLE "learning_path" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "learning_path" ADD COLUMN "total_modules" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "learning_path" ADD COLUMN "estimated_duration" text NOT NULL;--> statement-breakpoint
ALTER TABLE "quiz" ADD COLUMN "question" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "answers" ADD CONSTRAINT "answers_question_id_quiz_quiz_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."quiz"("quiz_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "screening_results" ADD CONSTRAINT "screening_results_path_id_learning_path_learning_path_id_fk" FOREIGN KEY ("path_id") REFERENCES "public"."learning_path"("learning_path_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "quiz" DROP COLUMN IF EXISTS "modul_id";--> statement-breakpoint
ALTER TABLE "quiz" DROP COLUMN IF EXISTS "user_id";--> statement-breakpoint
ALTER TABLE "quiz" DROP COLUMN IF EXISTS "selected_answer_id";--> statement-breakpoint
ALTER TABLE "quiz" DROP COLUMN IF EXISTS "correct_answer_id";--> statement-breakpoint
ALTER TABLE "quiz" DROP COLUMN IF EXISTS "quiz_title";