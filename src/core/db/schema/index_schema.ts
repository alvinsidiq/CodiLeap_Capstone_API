import {
  date,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  json,
  
} from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';


// string == text, string == varchar
// klobisa pake **text** aja
// number == integer
// boolean == boolean

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title"),
  body: text("body"),
});

// User Table
export const User = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email").unique().notNull(),
  hashedPassword: varchar("hashed_password").notNull(),
  name: varchar("name"),
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
});



// units -> fk lessonId

// badge table 
export const Badge = pgTable("badge", {
 badgeid: serial("badge_id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  imageUrl: text("image_url").notNull(),
  requirements: json("requirements").default([]),
  createdat: timestamp("createdat").defaultNow(),
  updatedat: timestamp("updatedat").defaultNow(),
});

// badge user 
export const UserBadge = pgTable("user_badge", {
  id: serial("id").primaryKey(),
  userId: integer("user_badge").references(()=>User.id),
  badgeId: integer("badge_id").references(()=>Badge.badgeid),
  earnedAt: timestamp("earned_at").defaultNow(),
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
export const questions = pgTable("quiz", {
  questionId: serial("quiz_id").primaryKey(),
  question: text('question').notNull(),
  createdat: timestamp("createdat").defaultNow(),
  updatedat: timestamp("updatedat").defaultNow(),
  // modul_id: integer("modul_id"),
  // user_id: integer("user_id"),
  // selected_answer_id: integer("selected_answer_id"),
  // correct_answer_id: integer("correct_answer_id"),
  // quiz_title: text("quiz_title").notNull(),
  
});

export const answers = pgTable('answers', {
  id: serial('id').primaryKey(),
  questionId: integer('question_id').references(() => questions.questionId),
  answerText: text('answer_text').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedat: timestamp("updatedat").defaultNow(),
});

// learning path
export const LearningPath = pgTable("learning_path", {
  learningPathId: serial("learning_path_id").primaryKey(), 
  name: text("name").notNull(), 
  description: text("description"),
  level: text("level").notNull(), 
  totalModules: integer("total_modules").notNull(), 
  estimatedDuration: text("estimated_duration").notNull(), 
  createdAt: timestamp("createdat").defaultNow(), 
  updatedAt: timestamp("updatedat").defaultNow(), 
});

// user screaning resource
export const screeningResults = pgTable("screening_results", {
  screeningResultsId: serial("screeningResults_id").primaryKey(),
  userId: integer("user_id"),
  pathId: integer('path_id').references(() => LearningPath.learningPathId),
  score: integer('score').notNull(),
  strengths: json('strengths').notNull(),
  quiz_id: integer("quiz_id"),
  learningPathId: integer("learning_path_id"),
  answers: json('answers').notNull(),
  createdat: timestamp("createdat").defaultNow(),
  updatedat: timestamp("updatedat").defaultNow(),
});

// Define relations
export const questionsRelations = relations(questions, ({ many }) => ({
  answers: many(answers),
}));

export const answersRelations = relations(answers, ({ one }) => ({
  question: one(questions, {
    fields: [answers.questionId],
    references: [questions.questionId],
  }),
}));


//Export All Tables and Relations
export const dbSchema = {
  questions,
  answers,
  LearningPath,
  screeningResults,
  questionsRelations,
  answersRelations,
};


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
  description: varchar('description', { length: 1000 }),
  total_lesson: integer("total_lesson"),
  completed_lessons: integer('completed_lessons').default(0),
  learning_path_id: integer('learning_path_id').notNull(),
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



//learning_path screaning
export const LearningPathScreaning = pgTable("learning_path_screening",{
  screening_id : serial("screening_id").primaryKey(),
   questionId : integer("question_id"),
   selectedAnswerId : integer("selected_answer_id"),
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
