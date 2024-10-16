/*
  Warnings:

  - You are about to drop the `chats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `followers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `medias` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `messages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notifications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wallets` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `cpf` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `birthdate` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "chats" DROP CONSTRAINT "chats_userId_fkey";

-- DropForeignKey
ALTER TABLE "followers" DROP CONSTRAINT "followers_userId_fkey";

-- DropForeignKey
ALTER TABLE "medias" DROP CONSTRAINT "medias_postId_fkey";

-- DropForeignKey
ALTER TABLE "medias" DROP CONSTRAINT "medias_userId_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_chatId_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_sendUserId_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_receiveUserId_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_sendUserId_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_userId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_userId_fkey";

-- DropForeignKey
ALTER TABLE "wallets" DROP CONSTRAINT "wallets_userId_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "cpf" SET NOT NULL,
ALTER COLUMN "birthdate" SET NOT NULL,
ALTER COLUMN "birthdate" DROP DEFAULT,
ALTER COLUMN "birthdate" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "chats";

-- DropTable
DROP TABLE "followers";

-- DropTable
DROP TABLE "medias";

-- DropTable
DROP TABLE "messages";

-- DropTable
DROP TABLE "notifications";

-- DropTable
DROP TABLE "posts";

-- DropTable
DROP TABLE "products";

-- DropTable
DROP TABLE "wallets";
