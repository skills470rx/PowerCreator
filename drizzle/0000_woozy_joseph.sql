CREATE TABLE `creators` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`avatar` varchar(500),
	`bio` text,
	`skills` text,
	`hourlyRate` decimal(10,2),
	`projectRate` decimal(10,2),
	`isOnline` boolean,
	`responseTime` int,
	`totalRating` decimal(3,2),
	`totalReviews` int,
	`totalEarnings` decimal(15,2),
	`completedOrders` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `creators_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`orderId` int,
	`senderId` int NOT NULL,
	`receiverId` int NOT NULL,
	`content` text NOT NULL,
	`isRead` boolean,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientId` int NOT NULL,
	`creatorId` int NOT NULL,
	`serviceId` int,
	`title` varchar(255) NOT NULL,
	`description` text,
	`price` decimal(10,2) NOT NULL,
	`status` enum('pending','in-progress','completed','cancelled') DEFAULT 'pending',
	`deliveryDate` timestamp,
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `payments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`orderId` int NOT NULL,
	`amount` decimal(10,2) NOT NULL,
	`status` enum('pending','completed','failed','refunded') DEFAULT 'pending',
	`stripePaymentId` varchar(255),
	`paymentMethod` varchar(100),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `payments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `portfolioItems` (
	`id` int AUTO_INCREMENT NOT NULL,
	`creatorId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`imageUrl` varchar(500),
	`projectUrl` varchar(500),
	`category` varchar(100),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `portfolioItems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ratings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`orderId` int NOT NULL,
	`clientId` int NOT NULL,
	`creatorId` int NOT NULL,
	`rating` int NOT NULL,
	`review` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ratings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` int AUTO_INCREMENT NOT NULL,
	`creatorId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`price` decimal(10,2) NOT NULL,
	`deliveryTime` int,
	`scope` text,
	`isActive` boolean,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `services_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
--> statement-breakpoint
CREATE INDEX `creators_userId_idx` ON `creators` (`userId`);--> statement-breakpoint
CREATE INDEX `messages_orderId_idx` ON `messages` (`orderId`);--> statement-breakpoint
CREATE INDEX `messages_senderId_idx` ON `messages` (`senderId`);--> statement-breakpoint
CREATE INDEX `messages_receiverId_idx` ON `messages` (`receiverId`);--> statement-breakpoint
CREATE INDEX `orders_clientId_idx` ON `orders` (`clientId`);--> statement-breakpoint
CREATE INDEX `orders_creatorId_idx` ON `orders` (`creatorId`);--> statement-breakpoint
CREATE INDEX `orders_status_idx` ON `orders` (`status`);--> statement-breakpoint
CREATE INDEX `payments_orderId_idx` ON `payments` (`orderId`);--> statement-breakpoint
CREATE INDEX `payments_status_idx` ON `payments` (`status`);--> statement-breakpoint
CREATE INDEX `portfolioItems_creatorId_idx` ON `portfolioItems` (`creatorId`);--> statement-breakpoint
CREATE INDEX `ratings_creatorId_idx` ON `ratings` (`creatorId`);--> statement-breakpoint
CREATE INDEX `ratings_clientId_idx` ON `ratings` (`clientId`);--> statement-breakpoint
CREATE INDEX `services_creatorId_idx` ON `services` (`creatorId`);