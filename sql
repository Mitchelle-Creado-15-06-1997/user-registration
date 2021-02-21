CREATE TABLE `user`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `employee_id` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));


CREATE TABLE `user`.`employees` (
  `id` VARCHAR(45) NOT NULL,
  `org_name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));


ALTER TABLE `user`.`users` 
ADD CONSTRAINT `unique_employee`
  FOREIGN KEY (`employee_id`)
  REFERENCES `user`.`employees` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

