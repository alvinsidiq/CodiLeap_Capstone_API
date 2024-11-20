CREATE TABLE IF NOT EXISTS "analytics" (
	"analytics_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"avg_daily_time_spending" integer,
	"createdat" timestamp DEFAULT now(),
	"updatedat" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "badge" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"image" text NOT NULL,
	"createdat" timestamp DEFAULT now(),
	"updatedat" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "learning_path" (
	"learning_path_id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"level" text NOT NULL,
	"createdat" timestamp DEFAULT now(),
	"updatedat" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lesson" (
	"lesson_id" serial PRIMARY KEY NOT NULL,
	"module_id" integer,
	"name" text NOT NULL,
	"createdat" timestamp DEFAULT now(),
	"updatedat" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "modules" (
	"module_id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"total_lesson" integer,
	"createdat" timestamp DEFAULT now(),
	"updatedat" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quiz" (
	"quiz_id" serial PRIMARY KEY NOT NULL,
	"modul_id" integer,
	"user_id" integer,
	"selected_answer_id" integer,
	"correct_answer_id" integer,
	"quiz_title" text NOT NULL,
	"createdat" timestamp DEFAULT now(),
	"updatedat" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quiz_answer_choices" (
	"quiz_answer_choices_id" serial PRIMARY KEY NOT NULL,
	"quiz_id" integer,
	"content" text NOT NULL,
	"order" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "units" (
	"unit_id" serial PRIMARY KEY NOT NULL,
	"lesson_id" integer,
	"order" integer,
	"content" text NOT NULL,
	"createdat" timestamp DEFAULT now(),
	"updatedat" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_badge" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_badge" integer,
	"createdat" timestamp DEFAULT now(),
	"updatedat" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_modul_progres" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"modul_id" integer,
	"current_lesson" integer NOT NULL,
	"completion_status" timestamp DEFAULT now(),
	"completion_date" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_progres" (
	"user_progress_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"lesson_id" integer,
	"completion_status" timestamp DEFAULT now(),
	"startedat" timestamp DEFAULT now(),
	"finishedat" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_screaning_resource" (
	"user_screaning_resource_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"quiz_id" integer,
	"learning_path_id" integer,
	"createdat" timestamp DEFAULT now(),
	"updatedat" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "virtual_asistent_chat" (
	"virtual_asistent_chat_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"question" text NOT NULL,
	"answer" text NOT NULL,
	"time" timestamp DEFAULT now()
);
