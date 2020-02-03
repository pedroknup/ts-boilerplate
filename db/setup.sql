-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema ts-boilerplate
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ts-boilerplate
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ts-boilerplate` DEFAULT CHARACTER SET utf8mb4 ;
USE `ts-boilerplate` ;

-- -----------------------------------------------------
-- Table `ts-boilerplate`.`user_status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ts-boilerplate`.`user_status` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ts-boilerplate`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ts-boilerplate`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

INSERT INTO `ts-boilerplate`.`role` (`name`) VALUES ('user');
INSERT INTO `ts-boilerplate`.`role` (`name`) VALUES ('admin');

INSERT INTO `ts-boilerplate`.`user_status` (`id`, `name`) VALUES (NULL, 'activated');
INSERT INTO `ts-boilerplate`.`user_status` (`id`, `name`) VALUES (NULL, 'pendent');
INSERT INTO `ts-boilerplate`.`user_status` (`id`, `name`) VALUES (NULL, 'deactivated');
INSERT INTO `ts-boilerplate`.`user_status` (`id`, `name`) VALUES (NULL, 'banned');
-- -----------------------------------------------------
-- Table `ts-boilerplate`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ts-boilerplate`.`user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(96) NULL DEFAULT NULL,
  `email` VARCHAR(96) NULL DEFAULT NULL,
  `password` VARCHAR(196) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT NOW(),
  `profilePic` VARCHAR(96) NULL,
  `statusId` INT NOT NULL DEFAULT 2,
  `roleId` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `status-id_idx` (`statusId` ASC),
  INDEX `user-role-id_idx` (`roleId` ASC),
  CONSTRAINT `user-status-id`
    FOREIGN KEY (`statusId`)
    REFERENCES `ts-boilerplate`.`user_status` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user-role-id`
    FOREIGN KEY (`roleId`)
    REFERENCES `ts-boilerplate`.`role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ts-boilerplate`.`login_provider`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ts-boilerplate`.`login_provider` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `appId` VARCHAR(156) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ts-boilerplate`.`user_external_login`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ts-boilerplate`.`user_external_login` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userAccountId` VARCHAR(96) NULL,
  `userId` INT NULL,
  `firstName` VARCHAR(45) NULL,
  `lastName` VARCHAR(45) NULL,
  `email` VARCHAR(96) NULL,
  `loginProviderId` INT NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`id`),
  INDEX `user-external-login-id_idx` (`userId` ASC),
  INDEX `login-provider-id_idx` (`loginProviderId` ASC),
  CONSTRAINT `provider-user-external-login-id`
    FOREIGN KEY (`userId`)
    REFERENCES `ts-boilerplate`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `login-provider-id`
    FOREIGN KEY (`loginProviderId`)
    REFERENCES `ts-boilerplate`.`login_provider` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ts-boilerplate`.`todo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ts-boilerplate`.`todo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NULL,
  `isDone` TINYINT(1) NOT NULL DEFAULT 0,
  `createdAt` DATETIME NULL DEFAULT NOW(),
  `userId` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `todo-user-id_idx` (`userId` ASC),
  CONSTRAINT `todo-user-id`
    FOREIGN KEY (`userId`)
    REFERENCES `ts-boilerplate`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ts-boilerplate`.`forgot_password`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ts-boilerplate`.`forgot_password` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `token` VARCHAR(96) NOT NULL,
  `userId` INT NOT NULL,
  `createdAt` DATETIME NULL DEFAULT NOW(),
  `expiresAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `forgot-user-id_idx` (`userId` ASC),
  CONSTRAINT `forgot-user-id`
    FOREIGN KEY (`userId`)
    REFERENCES `ts-boilerplate`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



INSERT INTO `ts-boilerplate`.`login_provider` (`id`, `name`, `appId`) VALUES (NULL, 'facebook', '418130689072157');
INSERT INTO `ts-boilerplate`.`login_provider` (`id`, `name`, `appId`) VALUES (NULL, 'linkedin', '');
INSERT INTO `ts-boilerplate`.`login_provider` (`id`, `name`, `appId`) VALUES (NULL, 'google', '923738134391-1fvtviaiprlche13vepf2cdb7ht6hagq.apps.googleusercontent.com');

INSERT INTO `ts-boilerplate`.`user` (`id`, `firstName`, `lastName`, `email`, `password`, `createdAt`, `statusId`, `roleId`) VALUES ('1', 'Admin', 'Admin', 'admin@admin.com', '$2a$08$qFvXV8hTfEdaI3smfJRqse21bxmxWXM1u/cBBhziLXSRSejfJKMKW', '2019-11-28 19:50:40', '1', '2');
