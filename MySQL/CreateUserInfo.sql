DROP TABLE userInfo;
CREATE TABLE userInfo (
    user_id INT NOT NULL UNIQUE,
    account VARCHAR(50) NOT NULL UNIQUE,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(100) NOT NULL,
	adim VARCHAR(20) NOT NULL,
    createtime DATETIME,
    active BOOLEAN DEFAULT false,
    email VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL
);

SELECT COUNT(1) FROM userInfo WHERE 1 = 1 AND account = "thomson861106";

select * from userInfo;

INSERT INTO userInfo (user_id, account, username, password, 
	adim, createtime, active, email, department)
    VALUE (1, "r09522624", "chungct", "qqqq1234", 
    "recorder", NOW(), false, "chungct@solab.me.ntu.edu.tw", "ME");
