CREATE TYPE "public"."type" AS ENUM('demo', 'production', 'training', 'NDA');--> statement-breakpoint
CREATE TABLE "contacts" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"url" varchar(255) NOT NULL,
	"profile_id" integer NOT NULL,
	CONSTRAINT "contacts_name_unique" UNIQUE("name"),
	CONSTRAINT "contacts_url_unique" UNIQUE("url")
);
--> statement-breakpoint
CREATE TABLE "owner" (
	"id" integer PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "owner_email_unique" UNIQUE("email"),
	CONSTRAINT "owner_id_check" CHECK ("owner"."id" = 1)
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" integer PRIMARY KEY NOT NULL,
	"photo_url" varchar(255) NOT NULL,
	"first_name_ua" varchar(255) NOT NULL,
	"first_name_en" varchar(255) NOT NULL,
	"last_name_ua" varchar(255) NOT NULL,
	"last_name_en" varchar(255) NOT NULL,
	"bio_ua" text NOT NULL,
	"bio_en" text NOT NULL,
	"positions" varchar[],
	"location_ua" varchar(255) NOT NULL,
	"location_en" varchar(255) NOT NULL,
	"birthday" date NOT NULL,
	"softskills_ua" text[] NOT NULL,
	"softskills_en" text[] NOT NULL,
	"hard_skills" varchar(255)[],
	"work_status_ua" varchar(255) NOT NULL,
	"work_status_en" varchar(255) NOT NULL,
	CONSTRAINT "owner_id_check" CHECK ("profiles"."id" = 1)
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"name_ua" varchar(255) NOT NULL,
	"name_en" varchar(255) NOT NULL,
	"desc_ua" text NOT NULL,
	"desc_en" text NOT NULL,
	"features_ua" text[] NOT NULL,
	"features_en" text[] NOT NULL,
	"stack" text[] NOT NULL,
	"type" "type" NOT NULL,
	"live" varchar(255),
	"code" varchar(255),
	"sort_order" integer NOT NULL,
	CONSTRAINT "projects_live_unique" UNIQUE("live"),
	CONSTRAINT "projects_code_unique" UNIQUE("code"),
	CONSTRAINT "projects_sort_order_unique" UNIQUE("sort_order")
);
--> statement-breakpoint
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;