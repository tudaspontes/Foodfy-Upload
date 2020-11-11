CREATE DATABASE foodfy

CREATE TABLE "recipes" (
  "id" SERIAL PRIMARY KEY,
  "chef_id" int,
  "title" text,
  "ingredients" text[],
  "preparation" text[],
  "information" text,
  "status" text,
  "created_at" timestamp DEFAULT (now())
 );

CREATE TABLE "chefs" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "created_at" timestamp DEFAULT (now())
);

-- foreign key 
ALTER TABLE "recipes" ADD FOREIGN KEY ("chef_id") REFERENCES "chefs" ("id");

CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text NOT NULL
);

-- foreign key 
ALTER TABLE "chefs" ADD "file_id" int REFERENCES "files" ("id")

CREATE TABLE "recipe_files" (
  "id" SERIAL PRIMARY KEY,
  "recipe_id" int REFERENCES recipes(id),
  "file_id" int REFERENCES files(id)
);