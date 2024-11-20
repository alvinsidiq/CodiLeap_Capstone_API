import {
  date,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

// string == text, string == varchar
// klobisa pake **text** aja
// number == integer
// boolean == boolean

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title"),
  body: text("body"),
});

// UserLearn Table Schema
export const UserLearn = pgTable("user_learn", {
  id: serial("id").primaryKey(),
  email: varchar("email").unique().notNull(),
  hashedPassword: varchar("hashed_password").notNull(),
  name: varchar("name"),
  telephone: varchar("telephone"),
  address: text("address"),
  dob: date("dob"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(), //.onUpdateNow(),
  studyHour: integer("study_hour").default(0),
});

// auth 
export const Auth = pgTable("auth", {
  id : serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  hashedPassword: text("hashed_password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})



// units -> fk lessonId

// badge table schema
export const Badge = pgTable("badge", {
  badge_id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  image: text("image").notNull(),
  createdat: timestamp("createdat").defaultNow(),
  updatedat: timestamp("updatedat").defaultNow(),
});

// badge user table
export const UserBadge = pgTable("user_badge", {
  user_badge_id: serial("id").primaryKey(),
  user_id: integer("user_badge"),
  createdat: timestamp("createdat").defaultNow(),
  updatedat: timestamp("updatedat").defaultNow(),
});

// user modul progres table
export const UserModulProgres = pgTable("user_modul_progres", {
  user_modul_progres_id: serial("id").primaryKey(),
  user_id: integer("user_id"),
  module_id: integer("modul_id"),
  current_lesson: integer("current_lesson").notNull(),
  completion_status: timestamp("completion_status").defaultNow(),
  completion_date: timestamp("completion_date").defaultNow(),
});

//user progress table
export const UserProgres = pgTable("user_progres", {
  user_progres_id: serial("user_progress_id").primaryKey(),
  user_id: integer("user_id"),
  lesson_id: integer("lesson_id"),
  completion_status: timestamp("completion_status").defaultNow(),
  startedat: timestamp("startedat").defaultNow(),
  finishedat: timestamp("finishedat").defaultNow(),
});

//virtual_asistent_chat
export const VirtualAsistentChat = pgTable("virtual_asistent_chat", {
  virtual_asistent_chat_id: serial("virtual_asistent_chat_id").primaryKey(),
  user_id: integer("user_id"),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  time: timestamp("time").defaultNow(),
});

//analytics
export const Analytics = pgTable("analytics", {
  analytics_id: serial("analytics_id").primaryKey(),
  user_id: integer("user_id"),
  avg_daily_time_spending: integer("avg_daily_time_spending"),
  createdat: timestamp("createdat").defaultNow(),
  updatedat: timestamp("updatedat").defaultNow(),
});

// quiz
export const Quiz = pgTable("quiz", {
  quiz_id: serial("quiz_id").primaryKey(),
  modul_id: integer("modul_id"),
  user_id: integer("user_id"),
  selected_answer_id: integer("selected_answer_id"),
  correct_answer_id: integer("correct_answer_id"),
  quiz_title: text("quiz_title").notNull(),
  createdat: timestamp("createdat").defaultNow(),
  updatedat: timestamp("updatedat").defaultNow(),
});

// user screaning resource
export const UserScreaningResource = pgTable("user_screaning_resource", {
  user_screaning_resource_id: serial("user_screaning_resource_id").primaryKey(),
  user_id: integer("user_id"),
  quiz_id: integer("quiz_id"),
  learning_path_id: integer("learning_path_id"),
  createdat: timestamp("createdat").defaultNow(),
  updatedat: timestamp("updatedat").defaultNow(),
});

//quiz answer _choices
export const QuizAnswerChoices = pgTable("quiz_answer_choices", {
  quiz_answer_choices_id: serial("quiz_answer_choices_id").primaryKey(),
  quiz_id: integer("quiz_id"),
  content: text("content").notNull(),
  order: integer("order"),
});

// modules
export const Modules = pgTable("modules", {
  module_id: serial("module_id").primaryKey(),
  name: text("name").notNull(),
  total_lesson: integer("total_lesson"),
  createdat: timestamp("createdat").defaultNow(),
  updatedat: timestamp("updatedat").defaultNow(),
});

// lesson
export const Lesson = pgTable("lesson", {
  lesson_id: serial("lesson_id").primaryKey(),
  module_id: integer("module_id"),
  name: text("name").notNull(),
  createdat: timestamp("createdat").defaultNow(),
  updatedat: timestamp("updatedat").defaultNow(),
});

// learning path
export const LearningPath = pgTable("learning_path", {
  learning_path_id: serial("learning_path_id").primaryKey(),
  name: text("name").notNull(),
  level: text("level").notNull(),
  createdat: timestamp("createdat").defaultNow(),
  updatedat: timestamp("updatedat").defaultNow(),
});

// units
export const Units = pgTable("units", {
  unit_id: serial("unit_id").primaryKey(),
  lesson_id: integer("lesson_id"),
  order: integer("order"),
  content: text("content").notNull(),
  createdat: timestamp("createdat").defaultNow(),
  updatedat: timestamp("updatedat").defaultNow(),
});
