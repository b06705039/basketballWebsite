CREATE TABLE teamRecord (
	teamRecord_id INT NOT NULL AUTO_INCREMENT UNIQUE ,
    team_id INT NOT NULL,
    match_id INT NOT NULL,
    score_1 INT,
    score_2 INT,
    score_3 INT,
    score_4 INT,
    ball_1 BOOLEAN,
    ball_2 BOOLEAN,
    ball_3 BOOLEAN,
    ball_4 BOOLEAN,
    foul_1 INT,
    foul_2 INT,
    foul_3 INT,
    foul_4 INT,
    timeout_1 BOOLEAN,
    timeout_2 BOOLEAN,
    timeout_3 BOOLEAN,
    timeout_4 BOOLEAN,
    timeout_5 BOOLEAN,
    time DATE NOT NULL
);

DROP TABLE teamRecord;