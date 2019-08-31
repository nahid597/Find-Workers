//Find data from a database
function findInf(model, query, callback) {
    model.find(query)
        .exec(function(err, data) {
            callback(err, data);
        });
}

//Insert into a database
function insertData(model, callback) {
    model.save(function(err) {
        callback(err);
    });
}

//Delete data from database
function deleteData(model, query, callback) {
    model.remove(query, function(err) {
        callback(data);
    });
}

function updateData(model, query, newData, callback) {
    model.findOneAndUpdate(query, newData, { upsert: true }, function(err) {
        callback(err);
    });
}

module.exports = { findInf, insertData, deleteData, updateData };