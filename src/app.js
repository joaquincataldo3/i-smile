const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv')
dotenv.config()


app.set('view engine', 'ejs');
app.use(express.static('./public'));

//Para que render busque en src/views
app.set('views', path.resolve(__dirname, './views'));

// Para capturar el body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());
// Express-session
const session = require('express-session');
app.use(session({
    secret: "Conf middleware global session",
    resave: false,
    saveUninitialized: false
}));


// Cookie-parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Mehtod-override --> Para usar put y delete (?_method=...)
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Rutas
const mainRouter = require('./routes/mainRouter.js');
const productRouter = require('./routes/productRouter.js');
const userRouter = require('./routes/userRouter.js');
const paymentRouter = require('./routes/paymentRouter.js');
const blogRouter = require('./routes/blogRouter.js')
// Rutas API
// const mainRouter = require('./routes/mainRouter.js');
const apiProductRouter = require('./routes/api/apiProductRouter.js');
const apiUserRouter = require('./routes/api/apiUserRouter.js');

// Middlewares
const userLogged = require('./middlewares/userLogged.js');
const userIsIncomplete = require('./middlewares/userIsIncomplete');
const guestMiddleware = require('./middlewares/guestMiddleware')
// const getAllUsers = require('./utils/getAllUsers.js');
app.use(userLogged);
app.use(userIsIncomplete);


// Ruteo para api
app.use('/api/product', apiProductRouter);
app.use('/api/user', apiUserRouter);

// Ruteo
app.use('/', mainRouter);
app.use('/product', productRouter);

app.use('/user', userRouter)
app.use('/payment',paymentRouter)

app.use('/blog', blogRouter);


// Correr el servidor

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
    console.log(" 🚀 Se levanto proyecto en http://localhost:" + PORT)
});
// const scheduleMail = require('./mail-scheduler');
// scheduleMail.start(); TODO: Activarlo para activar mails