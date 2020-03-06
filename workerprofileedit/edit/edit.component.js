function onFormSubmit() {

    var formData = readFormData();
    var obj = JSON.stringify(formData);
    console.log("form dara " + obj);
}

function readFormData() {
    var formData = {};

    formData["exampleInputName"] = document.getElementById("exampleInputName").value;
    formData["exampleInputPhone"] = document.getElementById("exampleInputPhone").value;
    formData["exampleFormControlCategory"] = document.getElementById("exampleFormControlCategory").value;
    formData["exampleInputHouse"] = document.getElementById("exampleInputHouse").value;
    formData["exampleInputRoad"] = document.getElementById("exampleInputRoad").value;
    formData["exampleInputSubDistrict"] = document.getElementById("exampleInputSubDistrict").value;
    formData["exampleInputDistrict"] = document.getElementById("exampleInputDistrict").value;
    formData["exampleInputDivision"] = document.getElementById("exampleInputDivision").value;

    return formData;
}