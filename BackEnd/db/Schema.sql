

use UsersData;

CREATE TABLE IF NOT EXISTS users(
user_id INT AUTO_INCREMENT NOT NULL,
username VARCHAR(255) UNIQUE,
email VARCHAR(255),
password VARCHAR(255),
is_deleted TINYINT DEFAULT 0,
PRIMARY KEY (user_id)
);

