CREATE DATABASE aura_pazhamometer;

USE aura_pazhamometer;

CREATE TABLE leaderboard (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    score INT NOT NULL
);
