const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Chat = require("./models/chat");
const path = require("path");
const methodOverride = require("method-override");

app.set("view engin", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("method"));

main()
  .then((res) => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log("err while connected to DB");
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/miniWhatsApp");
}

const port = 8080;

app.listen(port, () => {
  console.log("The port is listening to port: ", port);
});

//index route
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("index.ejs", { chats });
});

//Create route Create FORM
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

//Create route
app.post("/chats", (req, res) => {
  let { from, msg, to } = req.body;
  let chatData = {
    from: from,
    msg: msg,
    to: to,
    created_at: new Date(),
    updated_at: null,
  };
  const newChat = new Chat(chatData);
  newChat
    .save()
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      Console.log(err);
    });
  res.redirect("/chats");
});

//Update route edit FORM
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

//update route 
app.patch("/chats/:id", async (req, res) => {
  let { newMsg } = req.body;
  let { id } = req.params;
  let updateDate = new Date();
  await Chat.findByIdAndUpdate(
    id,
    {
      $set: {
        msg: newMsg,
        updated_at: updateDate,
      },
    },
    { new: true }
  );
  res.redirect("/chats");
});

//delete route
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let delChat = await Chat.findByIdAndDelete(id);
  res.redirect("/chats");
});
