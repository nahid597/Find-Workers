//Find data from a database
function findInf(model, query, callback) {
    console.log("id: ", query);
    model.findOne(query)
        .exec(function(err, data) {
            console.log(data);
            if (err){
                console.log(err);
                return callback(err);
            }
            return callback(data);
        });
}

//Insert into a database
function insertData(model, callback) {
    model.save(function(err) {
        console.log(err);
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
    console.log(newData);
    ob = {
        Name: newData.Name,
        Phone: newData.Phone,
        Category: newData.Category
    };
    model.findOneAndUpdate(query, ob, { upsert: true }, function(err) {
        if (err)
            return callback(err);
        return callback(ob);
    });
}

module.exports = { findInf, insertData, deleteData, updateData };