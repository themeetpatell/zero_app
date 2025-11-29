CREATE TABLE `user_credits` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`credits` integer DEFAULT 111 NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_credits_user_id_unique` ON `user_credits` (`user_id`);--> statement-breakpoint
CREATE TABLE `user_videos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`prompt` text NOT NULL,
	`video_url` text,
	`thumbnail_url` text,
	`settings` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
