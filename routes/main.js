const router = require('express').Router()
const modal = require('../models/user')

router.get('/', async (req, res) => {
    try {

        const pageNumber = parseInt(req.query.pageNo) || 0;
        const limit = 8;
        const result = {};
        const totalPosts = await modal.countDocuments().exec();
        // console.log(totalPosts);
        let startIndex = (pageNumber) ? (pageNumber-1) * limit : 0;
        const endIndex = (pageNumber) ? (pageNumber + 1) * limit : 1* limit;
        result.totalPosts = totalPosts;
        if (startIndex > 0) {
            result.previous = {
                pageNumber: pageNumber - 1,
                limit: limit,
            };
        }
        if (endIndex < (await modal.countDocuments().exec())) {
            result.next = {
                pageNumber: pageNumber + 1,
                limit: limit,
            };
        }
        result.data = await modal.find()
            .skip(startIndex)
            .limit(limit)
            .exec();
        result.rowsPerPage = limit;
        return res.render('home', { allData: result.data, total : totalPosts})
    }
    catch (err) {
        console.log(err)
    }
})


router.get('/add-student', (req, res) => {
    res.render('add-student', { allData: '' })
})


router.post('/add-student', async (req, res) => {

    let { student_name, father_name, dob, address, city, state, pin, phone_number, email, class_opted, marks } = req.body;
    const data = {
        student_name,
        father_name,
        dob,
        address,
        city,
        state,
        pin,
        phone_number,
        class_opted,
        marks,
    }
    if (req.body._id) {
        modal.updateOne({ _id: req.body._id }, { $set: data }, (err, data) => {
            if (err) {
                console.log("error", err);
            } else {
                console.log(req.body._id + ' is updated');
            }
            res.redirect('/')
        })
    } else {
        let current_time = new Date().toLocaleString();
        data.email = email;
        data.date_enrolled = current_time;
        console.log(data);
        let studentDetail = new modal(data);
        await studentDetail.save((err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data._id + ' is inserted');
            }
        });
        res.redirect('/');
    }
})


router.get('/delete/:id', (req, res) => {
    modal.deleteOne({ _id: req.params.id }, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log(req.params._id + ' Deleted');
        }
        res.redirect('back')
    });
})


router.get('/edit/:id', async (req, res) => {
    try {
        let data = await modal.findOne({ _id: req.params.id });
        console.log(data);
        res.render('add-student', { allData: data });
    } catch (err) {
        console.log(err);
    }

})

module.exports = router