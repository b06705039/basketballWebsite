CREATE TABLE matches (
	match_id INT NOT NULL UNIQUE,
    home INT,
    away INT NOT NULL,
    startDate DATE,
    endDate DATE,
    field INT,
    recorder VARCHAR(20),
    winner INT,
    stage VARCHAR(20)
);