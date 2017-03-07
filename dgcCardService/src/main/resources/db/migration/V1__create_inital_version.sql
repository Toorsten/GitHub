
CREATE TABLE activation_link
(
	activation_link_id BIGINT IDENTITY NOT NULL,
	activation_link_url VARCHAR(255) UNIQUE NOT NULL,
	PRIMARY KEY(activation_link_id)
);

CREATE TABLE card
(
	
	card_id BIGINT IDENTITY NOT NULL,
	domain_id BIGINT NOT NULL,
	card_number BIGINT UNIQUE NOT NULL,
	card_dedication VARCHAR(600),
	-- card_balance DECIMAL(18, 2) NOT NULL,
	-- card_pin INTEGER NOT NULL,
	-- card_state_id INTEGER NOT NULL,
	activation_link_id BIGINT,
	profile_id BIGINT NOT NULL,
	PRIMARY KEY(card_id),
	CONSTRAINT FK_activation_link_card FOREIGN KEY (activation_link_id) REFERENCES activation_link (activation_link_id)
);

-- CREATE TABLE card_state
-- (
--	card_state_id INTEGER IDENTITY NOT NULL,
--	card_state_name VARCHAR(20) UNIQUE NOT NULL
-- );

-- Insert initial data
-- INSERT INTO card_state (card_state_name) VALUES ('READY');
-- INSERT INTO card_state (card_state_name) VALUES ('ACTIVE');
-- INSERT INTO card_state (card_state_name) VALUES ('BLOCKED');
-- INSERT INTO card_state (card_state_name) VALUES ('EXPIRED');
-- INSERT INTO card_state (card_state_name) VALUES ('DEACTIVATED');