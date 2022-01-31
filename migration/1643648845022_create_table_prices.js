module.exports = {
    "up": "CREATE TABLE prices ( \
        id INT NOT NULL AUTO_INCREMENT, \
        UNIQUE KEY id (id), \
        data TEXT, \
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, \
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  \
    )",
    "down": "DROP TABLE prices"
}