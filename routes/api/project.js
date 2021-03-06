const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const sponsorGuard = require('../../middlewares/sponsorGuard');
const professorGuard = require('../../middlewares/professorGuard');
//const upload = require('../../middlewares/fileUpload');
const multer = require('multer');
const Project = require('../../models/Project');



//Validation
const validateProjectInput = require('../../validation/project');

//@route GET api/project/test
//@desc tests post routes
//@access public

router.get('/test', (req, res) => res.json({msg: "posts works"}));


//@route GET api/project/sponsor
//@desc Sponsor can view all its current Proejcts
//@access Private

router.get('/sponsor', passport.authenticate('jwt', {session: false}), sponsorGuard, (req, res) => {
    Project.find({user: req.user.id})
        .select('-file')
        .then(project => {
          res.json(project);                
        })
        .catch(err => res.status(404).json({postnotfound: 'no project found'}));
});

//@route GET api/project/sponsor/:id
//@desc GET post/:id
//@access private

router.get('/sponsor/edit-project/:id', passport.authenticate('jwt', {session:false}), sponsorGuard,(req, res) => {
    Project.findById(req.params.id)
      .select('-file')
      .then(project => res.json(project))
      .catch(err => res.status(400).json({noprojectfound: 'No project find'}))
  });


  const upload = multer({
    limits: {
        fileSize: 10000000 //set file size to 10 mb
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx|pdf)$/)) {
            return cb(new Error('Please upload an doc or docx or pdf file')) //validate the file type to pdf, dox, docx
        }

        cb(undefined, true)
    }
})


//@route POST api/project/sponsor/create
//@desc Create Project
//@access Private

router.post('/sponsor/create',passport.authenticate('jwt', {session:false}), upload.single('file'),sponsorGuard, async (req, res) => {
    const {errors, isValid} = validateProjectInput(req.body);
  //validation

  if(!isValid){
    //if is not valid, return 400 with errors
    return res.status(400).json(errors);
  }

    
    req.body.file = req.file.buffer;
    const projectFields = await new Project({
        email: req.body.email,
        projectName: req.body.projectName,
        phone: req.body.phone,
        address: req.body.address,
        duration: req.body.duration,
        budget: req.body.budget,
        size: req.body.size,
        description: req.body.description,
        user: req.user.id,
        status: req.body.status,
        technologies : req.body.technologies.split(','),
        file: req.body.file
    });
    
    /*if(!req.file) {
      projectFields.file = null;
      projectFields
      .save()
      .then(project => res.json(project))
      .catch(err => res.status(400).json({'project':'failed'}));
    } else { */
     // projectFields.file = req.file.filename;
      await projectFields
        .save()
        .then(project => res.json(project))
        .catch(err => res.status(400).json({'project':'failed'}));
   // }
   
});

//@route POST api/project/sponsor/update/:id
//@desc Edit Project
//@access Private

router.post('/sponsor/edit-project/:id',passport.authenticate('jwt', {session:false}),upload.single('file'), sponsorGuard,  async (req, res) => {
    const {errors, isValid} = validateProjectInput(req.body);
  //validation

  if(!isValid){
    //if is not valid, return 400 with errors
    return res.status(400).json(errors);
  }

    //get the project fields first if the project already exists
    
    req.body.file = req.file.buffer;
    const projectFields = {
        email: req.body.email,
        projectName: req.body.projectName,
        phone: req.body.phone,
        address: req.body.address,
        duration: req.body.duration,
        budget: req.body.budget,
        size: req.body.size,
        description: req.body.description,
        user: req.user.id,
        status: req.body.status,
        technologies : req.body.technologies.split(','),
        file: req.body.file

    };

    //if in the updating process, no file choosed, then do nothing to the file
    //if there is a file updating, then update the file

    projectFields.user = req.user.id;
    if(req.body.email) projectFields.email = req.body.email;
    if(req.body.projectName) projectFields.projectName = req.body.projectName;
    if(req.body.phone) projectFields.phone = req.body.phone;
    if(req.body.address) projectFields.address = req.body.address;
    if(req.body.duration) projectFields.duration = req.body.duration;
    if(req.body.budget) projectFields.budget = req.body.budget;
    if(req.body.size) projectFields.size = req.body.size;
    if(req.body.description) projectFields.description= req.body.description;
    if(req.body.status) projectFields.status = req.body.status;
    if(req.body.technologies) projectFields.technologies = req.body.technologies.split(',');
    
  
   Project.findById(req.params.id)
    .then(project => {
        //if project exist, then update
        if(project){
            Project.findByIdAndUpdate(
                req.params.id,
                { $set: projectFields },
                { new: true }
            )
            .then(project => res.json(project))
            .catch(err => res.status(400).json({project: 'Faile Create'}));
        } 
    });
});



//@route DELETE api/project/sponsor/:id
//@desc Sponsor can delete the project they don't want 
//@access Private

router.delete('/sponsor/:id', passport.authenticate('jwt',{session:false}), sponsorGuard, (req, res) => {
  
         
        Project.findById(req.params.id)
          .then(project => {

           //Delete
          project.remove().then(() => res.json({success: true}));
              
           
        })
        .catch(err => res.status(404).json({projectnotfound: 'no project found'}));
});

//@route GET api/project/professor
//@desc Professors can view all current Proejcts posted by all the sponsors
//@access Private

router.get('/professor', passport.authenticate('jwt', {session: false}), professorGuard,(req, res) => {
    Project.find()
        .select('-file')
        .sort({date: -1})
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json({noprojectfound: 'no project found'}))
});

//@route GET api/project/professor/:id
//@desc GET api/project/professor/:id
//@access private

router.get('/professor/:id', passport.authenticate('jwt', {session:false}), professorGuard,  (req, res) => {
 
   Project.findById(req.params.id)
      .select('-file')
      .then(project => res.json(project))
      .catch(err => res.status(400).json({noprojectfound: 'No project find'}))
});


router.get('/professor/:id/file', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.set('Content-Type', 'application/pdf');
    res.set('Content-Disposition', 'attachment; filename =' + req.params.id + '.pdf');
    res.send(project.file);
  } catch (e) {
    res.status(404).send();
  }
})




module.exports = router;