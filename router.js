var express = require("express");
var router = express.Router();

const  credential = {
    users: [
    {
    name : "admin",    
    email : "admin@gmail.com",
    password : "admin123",
    tel : "123",
    city: "kan",
    company : "abc",
    project : "q",
    desc : "hello",
    link : "h.com"
   },
 ]
}

//signin user
router.post('/signup',(req,res)=>{
    const {name,email,password,tel,city,company,project,desc,link}=req.body;
    credential.users.push({
        name : name,
        email : email,
        password : password,
        tel : tel,
        city : city,
        company : company,
        project : project,
        desc : desc,
        link : link

    })
    req.session.user = req.body;
    res.redirect('/route/dashboard');
})



// login user
router.post('/login', (req, res)=>{
    const user = credential.users.find(user => user.email === req.body.email)
    if (user == null) {
        res.end("Invalid Username")
      }
      else{
          if(user.password===req.body.password)
          {
            req.session.user = user;
            res.redirect('/route/dashboard');
          }
          else{
            res.end("Invalid password")
        }
      }


});

// route for dashboard
router.get('/dashboard', (req, res) => {
    if(req.session.user){
        res.render('dashboard', {user : req.session.user})
    }else{
        res.send("Unauthorize User")
    }
})

// route for logout
router.get('/logout', (req ,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('base', { title: "Express", logout : "logout Successfully...!"})
        }
    })
})

module.exports = router;