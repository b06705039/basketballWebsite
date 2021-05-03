CREATE TABLE playerInfo(
	player_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    studentID VARCHAR(20) NOT NULL,
    team_id INT NOT NULL
);

CREATE TABLE playerRecord(
	player_id INT NOT NULL,
    games INT NOT NULL,
    twohot INT NOT NULL,
    twomade INT NOT NULL,
    threeshot INT NOT NULL,
    threemade INT NOT NULL,
    freeshot INT NOT NULL,
    freemade INT NOT NULL,
    offrebound INT NOT NULL,
    deffrebound INT NOT NULL,
    assist INT NOT NULL,
    steal INT NOT NULL,
    block INT NOT NULL,
    foul INT NOT NULL
);