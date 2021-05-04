const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const { connect } = require("http2");
const publicPath = path.join(__dirname, "build");

app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const connection = require("./config/connection");

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.get("/get-all", (req, res) => {
  connection.query("SELECT * FROM abtestreal;", (err, data) => {
    if (!err) {
      res.status(200).send(data);
    } else {
      console.log(err);
    }
  });
});

app.get("/calculate", (req, res) => {
  let query = `
                select count(*) as params from  abtestreal where DateLastActivity >= DATE(DateRegistration + interval + 7 DAY)
                union
                select count(*) as params from abtestreal where DateRegistration <= Date(now() + interval - 7 day) 
              `;
  connection.query(query, (err, data) => {
    if (!err) {
      res.status(200).send(data);
    }
  });
});

app.delete("/clear-data", (req, res) => {
  connection.query(`TRUNCATE TABLE abtestreal; `, (err, data) => {
    if (!err) {
      res.status(200).send({ message: `Таблица успешно очищена` });
    }
  });
});

app.post("/add-data", (req, res) => {
  const data = req.body;
  let dataValues = data.reduce((o, a) => {
    let ini = [];
    ini.push(a.UserID);
    ini.push(a.DateRegistration);
    ini.push(a.DateLastActivity);
    o.push(ini);
    return o;
  }, []);

  let query =
    "INSERT INTO abtestreal(UserID, DateRegistration, DateLastActivity) VALUES ?";
  connection.query(query, [dataValues], (err, data) => {
    if (!err) {
      res.status(200).send({ message: "Данные добавлены" });
    } else {
      res
        .status(400)
        .send({ message: `Введите данные для отправки на сервер` });
    }
  });
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Server is running");
});

connection.connect((err) => {
  if (!err) {
    console.log("work!");
  }
});
