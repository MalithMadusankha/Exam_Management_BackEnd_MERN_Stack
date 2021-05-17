const router =  require("express").Router();
let Student = require("../models/student");

router.route("/add").post((req,res) => {
    // body
    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;

    const newStudent = new Student({
        name,
        age,
        gender
    })

    newStudent.save().then(() => {
        // sending a msg to front end in json Format
        res.json("Student added ")
    }).catch((err) => {
        // Display the error
        console.log(err);
    })

})
// To get data from data base
router.route("/").get((req, res) => {
    Student.find().then((student) => {
        res.json(student)
    }).catch((err) => {
        console.log(err);
    })
})
// Update
router.route("/update/:id").put(async (req,res) => {
    let userId = req.params.id;
    const {name, age, gender} = req.body;

    const updateStudent = {
        name,
        age,
        gender
    }
    const update = await Student.findByIdAndUpdate(userId, updateStudent).then(() => {
        res.status(200).send({status: "User updated"})

    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with update data ", error: err.message});
    })   
})

router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await Student.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: " User deleted "});
    }).catch((err) => {
        res.status(500).send({ status: " Error with deleted  user", error: err.massage});
    })
})

router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const user = await Student.findById(userId).then((student) => {
        res.status(200).send({status: "User fetched ", student})
    }).catch((err) => {
        console.log(err.massage);
        res.status(500).send({status: " error with get User ", error: err});
    })


})



module.exports = router;

