//Find data from a database
function findInf(model, query, callback) {
    model.find(query)
        .exec(function(err, data) {
            if (err)
                return callback(err);
            return callback(data);
        });
}

//Insert into a database
function insertData(model, callback) {
    model.save(function(err) {
        if (err)
            return callback(err);
        return callback(true);
    });
}

//Delete data from database
function deleteData(model, query, callback) {
    model.remove(query, function(err) {
        if (err)
            return callback(err);
        return callback(true);
    });
}

function updateData(model, query, newData, callback) {
    model.findOneAndUpdate(query, newData, { upsert: true }, function(err) {
        if (err)
            return callback(err);
        return callback(true);
    });
}

module.exports = { findInf, insertData, deleteData, updateData };