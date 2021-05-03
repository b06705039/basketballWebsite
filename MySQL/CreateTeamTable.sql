CREATE TABLE teamInfo (
	team_id INT NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    department VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT "未報名"
);

CREATE TABLE teamRecord (
	match_id INT NOT NULL UNIQUE,
    team_id INT NOT NULL,
    match_team_id INT NOT NULL,
    time DATE NOT NULL,
    score INT NOT NULL,
    twoshot INT NOT NULL,
    twomade INT NOT NULL,
    threeshot INT NOT NULL,
    threemade INT NOT NULL,
    freeshot INT NOT NULL,
    freemade INT NOT NULL,
    rebound INT NOT NULL,
    assit INT NOT NULL,
    turnover INT NOT NULL,
    steal INT NOT NULL,
    foul INT NOT NULL
);