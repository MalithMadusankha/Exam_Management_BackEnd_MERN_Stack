const router =  require("express").Router();
let Exam = require("../models/exam");

router.route("/add").post((req,res) => {
    // body
    const examId = req.body.examId;
    const name = req.body.name;
    const grade = req.body.grade;
    const subject = req.body.subject;
    const date = Date.parse(req.body.date);
    const timeStart = req.body.timeStart;
    const timeEnd = req.body.timeEnd;
    const notice = req.body.notice;

    const newExam = new Exam({
        examId,
        name,
        grade,
        subject,
        date,
        timeStart,
        timeEnd,
        notice
    })

    newExam.save().then(() => {
        // sending a msg to front end in json Format
        res.json("Exam added ")
    }).catch((err) => {
        // Display the error
        console.log(err);
    })

})



// To get data from data base
router.route("/").get((req, res) => {
    Exam.find().then((exam) => {
        res.json(exam)
    }).catch((err) => {
        console.log(err);
    })
})




// Update by examID
router.route("/update/:id").put(async (req,res) => {
    let userId = req.params.id;
    const {
        examId,
        name,
        grade,
        subject,
        date,
        timeStart,
        timeEnd,
        notice} = req.body;

    const updateExam = {
        examId,
        name,
        grade,
        subject,
        date,
        timeStart,
        timeEnd,
        notice
    }
    const update = await Exam.updateOne({
        examId: userId,
    }, updateExam).then(() => {
        res.status(200).send({status: "Exam updated"})

    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with update data ", error: err.message});
    })   
})

//Update Mark to Exam Collection

router.route("/update/mark/:id").put(async (req,res) => {
    let userId = req.params.id;
    const {
        examId,
        name,
        grade,
        subject,
        date,
        timeStart,
        timeEnd,
        notice,
        } = req.body;
    
    const mark = req.body.mark;
    // const mark = [markArr]

    // Update Exam
    const updateExam = {
        examId,
        name,
        grade,
        subject,
        date,
        timeStart,
        timeEnd,
        notice,
        mark
    }
    const update = await Exam.updateOne({
        examId: userId,
    }, updateExam).then(() => {
        res.status(200).send({status: "Exam updated"})

    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with update data ", error: err.message});
    })   
})
// End of updatong Mark function

// delet by ExamID
router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await Exam.deleteOne({
        examId: userId,
    }).then(() => {
        res.status(200).send({status: " User deleted "});
    }).catch((err) => {
        res.status(500).send({ status: " Error with deleted  user", error: err.massage});
    })
})

router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const user = await Exam.findOne({
        examId: userId,
    }).then((exam) => {
        res.status(200).send({status: "User fetched ", exam})
    }).catch((err) => {
        console.log(err.massage);
        res.status(500).send({status: " error with get User ", error: err});
    })

})

module.exports = router;

