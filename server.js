const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log("El servidor se inicio en el puerto 3000")
});


const nombres = {
    "usuarios": [
        "Juan",
        "Jocelyn",
        "Astrid",
        "Maria",
        "Ignacia",
        "Javier",
        "Brian"]
};


app.get('/abracadabra/usuarios', (req, res) => {
    res.send(nombres)
});

app.use(express.static("assets"));

app.use('/abracadabra/juego/:usuario', (req, res, next) => {
    const usuarioReq = req.params.usuario

    if (nombres.usuarios.find(data => data == usuarioReq)) {
        next()
    } else {
        res.sendFile(__dirname + "/assets/who.jpeg")
    }
});

app.get('/abracadabra/juego/:usuario', (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

app.get('/abracadabra/conejo/:n', (req, res) => {
    const numeroUsuario = req.params.n
    const numeroConejo = Math.floor(Math.random() * 4) + 1;

    if (numeroConejo == numeroUsuario) {
        res.sendFile(__dirname + "/assets/conejito.jpg")
    } else {
        res.sendFile(__dirname + "/assets/voldemort.jpg")
    }
});

app.get("*", (req, res) => {
    res.send("Esta pagina no existe")
});

