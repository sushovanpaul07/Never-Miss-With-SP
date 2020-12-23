const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const event = require('./models/events')
const User = require('./models/user')
const passport = require("passport");
const LocalStrategy = require('passport-local');
const ejsMate = require('ejs-mate');
const flash = require('connect-flash');
const session = require('express-session');
const { findById } = require('./models/events');


const eventTags=['GFG','Code Chef','Code Forces','HackerRank','HackerEarth','Leetcode','SPOJ','Top Coder','Coder Byte','CodeWars','Others']

mongoose.connect('mongodb://localhost:27017/eventDb',{ useNewUrlParser: true ,useUnifiedTopology: true})
        .then(()=>{
            console.log("---CONNECTION TO MONGODB ESTABLISHED--- ");
        })
        .catch(error =>{
            console.log("---CONNECTION FAILED---");
        });

app.engine('ejs',ejsMate)
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')))

const sessionConfig= {
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly: true,
        expires: Date.now()+1000*60*60*24*7,
        maxAge: 1000*60*60*24*7 
    }
}
app.use(session(sessionConfig));
app.use(flash())

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//---------------------Test---------------------//



//---------------------Test---------------------//


//---------------------Admin routes---------------------//



app.get('/adminpanel',async(req,res)=>{
    const events= await event.find({});
    res.render('admin/adminpanel',{events: events , eventTags: eventTags});
})


app.get('/admin/unApprovedList',async (req,res)=>{
    const events= await event.find({allowed: false});
    res.render('admin/admin_UnApprovedList',{events: events , eventTags: eventTags});
})


app.get('/admin/UserProfiles',async (req,res)=>{
    const UserProfiles = await User.find({});
    res.render('admin/user_profiles',{users: UserProfiles , eventTags: eventTags});
})

app.post('/admin/unApprovedList',async (req,res)=>
{
    var updateEvent= req.body;
    updateEvent.contributor=req.user.username;
    console.log(updateEvent);
    const userDetails = req.user;
    userDetails.contris=userDetails.contris+1;
    console.log(userDetails);
    const UserUpdate = await User.findByIdAndUpdate(req.user._id,userDetails)
    const newEvent = new event(req.body);
    newEvent.allowed=false;
    await newEvent.save();
    console.log(req.body);
    const events= await event.find({});
    res.redirect('/home');
})
app.delete('/admin/unApprovedList/:id',async(req,res)=>{
    await event.findByIdAndDelete(req.params.id);
    res.redirect('/adminpanel');
})
app.put('/admin/unApprovedList/:id',async(req,res)=>{
    var toUpdate = await event.findById(req.params.id);
    toUpdate.allowed = true;
    console.log(toUpdate)
    await event.findByIdAndUpdate(req.params.id,toUpdate);
    res.redirect('/adminpanel');
    // await event.findByIdAndDelete(req.params.id);
    // res.redirect('/admin/list');
})

app.get('/adminpanel/:id',async(req,res)=>{
    const eventDetails = await event.findById(req.params.id);
    res.render('admin/admin_details',{event: eventDetails , eventTags: eventTags})
})
app.delete('/adminpanel/:id' , async(req,res)=>{
    await event.findByIdAndDelete(req.params.id);
    res.redirect('/adminpanel');
})

//-----------------------------------------------------------------//

//---------------------Registered Routes---------------------//

app.get('/Rhome',async(req,res)=>{
    if(req.isAuthenticated())
    {
        const Events = await event.find({});
        const userdetails = req.user.name;
        // console.log(req.user);
        res.render('loggedIn/Rhome',{Events: Events , eventTags: eventTags , userDetail : userdetails})
    }
    else
    {
        res.redirect('/home');
    }
})
app.get('/addevent',async (req,res)=>{
    if(req.isAuthenticated())
    {
        req.flash('success','Thank you for posting event, Happy browsing')
        res.render('loggedIn/addevent',{eventTags});
    }
    else
    {
        req.flash('error','Your need to be logged in in order to post an event')
        res.redirect('/home');
    }
})
app.get('/mycontributions',async (req,res)=>{
    if(req.isAuthenticated())
    {
    const Events= await event.find({contributor: req.user.username});
    const userdetails = req.user.name;
    res.render('loggedIn/Rcontributions',{Events: Events , eventTags: eventTags , userDetail : userdetails})
    }
    else
    {
        req.flash('error','Please Log in Or sign up to create a new account')
        res.redirect('/home');
    }
})

app.get('/Rhome/:id',async(req,res)=>{
    const showEvents = await event.findById(req.params.id);
    const userdetails = req.user.name;
    res.render('loggedIn/Rdetails',{event: showEvents , eventTags: eventTags , userDetail : userdetails});
})

app.post('/signout',(req,res)=>{
    req.logout();
    res.redirect('/home');
})
//-----------------------------------------------------------------//




//---------------------General Non user Routes---------------------//
app.get('/details',async(req,res)=>{
    const Events = await event.find({});
    res.render('General/home',{Events: Events , eventTags: eventTags});
})


app.get('/home',async(req,res)=>{
    if(!req.isAuthenticated())
    {
        const Events = await event.find({});
        res.render('General/home',{Events: Events , eventTags: eventTags});
    }
    else
    {
        res.redirect('/Rhome')
    }
})
app.get('/home/:id',async(req,res)=>{
    const showEvents = await event.findById(req.params.id);
    res.render('General/details',{event: showEvents , eventTags: eventTags});
})

app.post('/register',async(req,res)=>{
    try{
        const {name, username, password} = req.body;
        const user = new User({name,username});
        const registeredUser = await User.register(user,password);
        // console.log(registeredUser);
        req.flash('success','Welcome '+name);
        res.redirect('/Rhome');
    }catch(e){
        req.flash('error',e.message);
        res.redirect('/register');
    }
})

app.post('/login',passport.authenticate('local',{failureFlash:true,failureRedirect:'/home'}),(req,res)=>{
    req.flash('success','Welcome Back ')
    res.redirect('/Rhome');
})

app.all('*',(req,res)=>{
    res.send('App is running');
})


//-----------------------------------------------------------------//








































//---------------------Listening---------------------//
app.listen(3000,()=>{
    console.log("Server up and running on port 3000");
})

//-----------------------------------------------------------------//
