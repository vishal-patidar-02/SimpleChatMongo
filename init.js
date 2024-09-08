const mongoose = require("mongoose");
const Chat = require("./models/chat");

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

let data = [
  {
    from: "Anand",
    to: "Shreya",
    msg: "Are you going with me or not",
    created_at: new Date(),
  },
  {
    from: "Vivek",
    to: "Yash",
    msg: "I will gonna top this exam",
    created_at: new Date(),
  },
  {
    from: "Aadi",
    to: "Priya",
    msg: "Khana kha kar jana hnn",
    created_at: new Date(),
  },
  {
    from: "Vishal",
    to: "Vivek",
    msg: "I finaaly get my first intership",
    created_at: new Date(),
  },
  {
    from: "Yashraj",
    to: "Vishal",
    msg: "How is this project of mine",
    created_at: new Date(),
  },
];

Chat.insertMany(data);
