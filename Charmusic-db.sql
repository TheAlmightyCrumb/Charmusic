DROP DATABASE IF EXISTS charmusic;
CREATE DATABASE charmusic;
USE charmusic;

CREATE TABLE `Songs`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `Title` VARCHAR(255) NOT NULL,
    `Artist_id` INT NOT NULL,
    `Album_id` INT NOT NULL,
    `Length` TIME NOT NULL,
    `Track_number` INT NOT NULL,
    `Lyrics` VARCHAR(255) NOT NULL,
    `Released_at` DATE NOT NULL,
    `Uploaded_at` DATE NOT NULL,
    `Youtube` VARCHAR(255) NOT NULL,
    `Library_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Albums`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(255) NOT NULL,
    `Artist_id` INT NOT NULL,
    `Cover_img` VARCHAR(255) NOT NULL,
    `Released_at` DATE NOT NULL,
    `Uploaded_at` DATE NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `Artists`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(255) NOT NULL,
    `Cover_img` VARCHAR(255) NOT NULL,
    `Uploaded_at` DATE NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Playlists`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(255) NOT NULL,
    `Cover_img` VARCHAR(255) NOT NULL,
    `Uploaded_at` DATE NOT NULL,
    `Library_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Libraries`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `User_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Users`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `Username` VARCHAR(255) UNIQUE NOT NULL,
    `Email` VARCHAR(255) UNIQUE NOT NULL,
    `Password` CHAR(255) NOT NULL,
    `Created_at` DATE NOT NULL,
    `Is_admin` TINYINT(1) NOT NULL,
    `Preferences` JSON NOT NULL,
    `Remember_token` TINYINT(1) NOT NULL,
	PRIMARY KEY (`id`) 
);

CREATE TABLE `Interactions`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `Song_id` INT NOT NULL,
    `User_id` INT NOT NULL,
    `Is_liked` TINYINT(1) NOT NULL,
    `Play_count` INT NOT NULL,
    `Created_at` DATE NOT NULL,
    PRIMARY KEY (`id`)
);

ALTER TABLE `Songs`
ADD CONSTRAINT `FK_Artist_id_songs` FOREIGN KEY (`Artist_id`) REFERENCES `Artists`(`id`)  ON DELETE CASCADE,
ADD CONSTRAINT `FK_Album_id_songs` FOREIGN KEY (`Album_id`) REFERENCES `Albums`(`id`) ON DELETE CASCADE,
ADD CONSTRAINT `FK_Library_id_songs` FOREIGN KEY(`Library_id`) REFERENCES `Libraries`(`id`) ON DELETE CASCADE;
   
ALTER TABLE `Albums`
ADD CONSTRAINT `FK_Artist_id_albums` FOREIGN KEY(`Artist_id`) REFERENCES `Artists`(`id`) ON DELETE CASCADE;

ALTER TABLE `Playlists`
ADD CONSTRAINT `FK_Library_id_playlists` FOREIGN KEY(`Library_id`) REFERENCES `Libraries`(`id`) ON DELETE CASCADE;

ALTER TABLE `Libraries`
ADD CONSTRAINT `FK_User_id_libraries` FOREIGN KEY(`User_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE;

ALTER TABLE `Interactions`
ADD CONSTRAINT `FK_Song_id_interactions` FOREIGN KEY(`Song_id`) REFERENCES `Songs`(`id`),
ADD CONSTRAINT `FK_User_id_interactions` FOREIGN KEY(`User_id`) REFERENCES `Users`(`id`);
