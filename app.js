const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [
  { id: 1, nombre: "Ryu", edad: 32, lugarProcedencia: "Japón" },
  { id: 2, nombre: "Chun-Li", edad: 29, lugarProcedencia: "China" },
  { id: 3, nombre: "Guile", edad: 35, lugarProcedencia: "Estados Unidos" },
  { id: 4, nombre: "Dhalsim", edad: 45, lugarProcedencia: "India" },
  { id: 5, nombre: "Blanka", edad: 32, lugarProcedencia: "Brasil" },
];

//READ

app.get("/", (res, req) => {
  res.send(`
  <h1>Lista de usuarios</h1>)
  <ul>
    ${usuario
      .map(
        (usuario) => `<li>ID: ${usuario.id} | nombre: ${usuario.nombre}</li>`
      )
      .join("")}
    </ul>
    `);
});

app.post(`/usuario`, (res, req) => {
  const nuevoUsuario = {
    id: usuario.length + 1,
    nombre: req.body.nombre,
  };
  usuarios.push(nuevoUsuario);
  res.redirect(`/`);
});

app.put("/usuarios/:nombre", (req, res) => {
  const nombreUsuario = req.params.nombre;
  const index = usuarios.findIndex(
    (usuario) => usuario.nombre === nombreUsuario
  );
  if (index !== -1) {
    usuarios[index] = { ...usuarios[index], ...req.body };
    res.json({
      mensaje: `Usuario ${nombreUsuario} actualizado`,
      usuario: usuarios[index],
    });
  } else {
    res.status(404).json({ mensaje: `Usuario ${nombreUsuario} no encontrado` });
  }
});

app.delete("/usuarios/:nombre", (req, res) => {
  const nombreUsuario = req.params.nombre;
  usuarios = usuarios.filter((usuario) => usuario.nombre !== nombreUsuario);
  res.json({ mensaje: `Usuario ${nombreUsuario} eliminado` });
});

app.listen(3000, () => {
  console.log("express esta escuchando en el puerto 3000");
});
