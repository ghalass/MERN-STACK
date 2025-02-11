/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Workout` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Workout_title_key` ON `Workout`(`title`);
