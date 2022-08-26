const user_name = "rahul"
const pass_word = "1992"
var PORT = "5506"
var express=require('express')
var cookieParser=require('cookie-parser')
var session = require('express-session')

var app = express()


app.set('view engine', 'ejs')

app.use(express.static("views"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
    resave: false,
    saveUninitialized: false,   
    secret: "secret"

}))

app.use((req,res,next) => {
    res.set('Cache-Control', 'no-Cache, private , no-store,must-revalidate, max-stale=0, post-check=0, pre-check=0')
    next()
})

app.post("/home", (req, res) => {
    req.session.username = req.body.username
    req.session.password = req.body.password
    


if (req.session.username == user_name && req.session.password == pass_word) {
    res.render('home', { name: req.session.username })
}
else {
    res.send("<h1> You entered invalid username or password</h1>")
}
})

app.get('/home',(req,res) => {
    if(req.session.username == user_name && req.session.password == pass_word)
    res.render('home',{name:req.session.username})
    else
    res.render('login')
})
 app.get("/",(req,res) => {
    console.log("inside")
    if(req.session.username == user_name && req.session.password == pass_word)
    res.redirect('home')
    else
    res.redirect('login')

 })
  
 app.get("/logout", (req,res) => {
   
        req.session.destroy()
        res.redirect('/')

   
 })

 app.get("/login", (req,res) =>{
    if(req.session.username == user_name && req.session.password == pass_word)
    res.render('home' , {name:req.session.username})
    else
    res.render("login")
 })

 app.get("*" , (req,res) => {
    console.log("404")
    res.status(404)
    res.send("404")
 })

 app.listen(PORT,() => {
    console.log("running server at "  +PORT)
   
 })