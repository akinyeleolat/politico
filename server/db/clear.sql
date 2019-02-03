DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS party CASCADE;
DROP TABLE IF EXISTS office CASCADE;
DROP TABLE IF EXISTS candidates CASCADE;
DROP TABLE IF EXISTS vote CASCADE;
DROP TABLE IF EXISTS petitions CASCADE;
CREATE TABLE IF NOT EXISTS party (
   id  SERIAL PRIMARY KEY,
   partyname  VARCHAR(255) NOT NULL,
   hqaddress VARCHAR(255) NOT NULL,
   logoUrl  VARCHAR(225) NOT NULL,
   created_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
   updated_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS office (
   id  SERIAL PRIMARY KEY,
   officename  VARCHAR(255) NOT NULL,
   officetype VARCHAR(255) NOT NULL,
   created_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
   updated_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
   id  SERIAL PRIMARY KEY,
   firstname  VARCHAR(255) NOT NULL,
   lastname  VARCHAR(255) NOT NULL,
   othername VARCHAR(255) NULL,
   email  VARCHAR(255) NOT NULL UNIQUE,
   phoneNumber  VARCHAR(255) NOT NULL UNIQUE,
   password  VARCHAR(255) NOT NULL,
   passportUrl  VARCHAR(225) NOT NULL,
   isAdmin BOOLEAN NOT NULL,
   created_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
   updated_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS candidates (
   id  SERIAL,
   office  INT NOT NULL,
   party  INT NOT NULL,
   candidate  INT NOT NULL UNIQUE,
   CONSTRAINT ID_PKEY PRIMARY KEY (office,candidate),
   created_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
   updated_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        --Relationship-- 
  FOREIGN KEY( office ) REFERENCES office( id ) ON DELETE CASCADE,
  FOREIGN KEY( party ) REFERENCES party( id ) ON DELETE CASCADE,
  FOREIGN KEY( candidate ) REFERENCES users( id ) ON DELETE CASCADE
);



CREATE TABLE IF NOT EXISTS vote (
   id  SERIAL,
   createdOn DATE NOT NULL,
   createdBy INT NOT NULL,
   office INT NOT NULL,
   candidate INT NOT NULL,
  CONSTRAINT ID_VKEY PRIMARY KEY (office,createdBy),
   created_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
   updated_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        --Relationship-- 
  FOREIGN KEY( createdBy ) REFERENCES users( id ) ON DELETE CASCADE,
  FOREIGN KEY( office ) REFERENCES office( id ) ON DELETE CASCADE,
  FOREIGN KEY( candidate ) REFERENCES users( id ) ON DELETE CASCADE
); 

CREATE TABLE IF NOT EXISTS petitions (
  id SERIAL PRIMARY KEY,
  createdBy INT NOT NULL,
  office INT NOT NULL,
  petition TEXT NOT NULL,
  evidence VARCHAR(255) NOT NULL,
  created_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
          --Relationship-- 
  FOREIGN KEY( createdBy ) REFERENCES users( id ) ON DELETE CASCADE,
  FOREIGN KEY( office ) REFERENCES office( id ) ON DELETE CASCADE
);