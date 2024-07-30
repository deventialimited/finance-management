const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const connectDB = require("./libs/db");
const RevenueRoutes = require("./routes/Revenue");
const ProfileRoutes = require("./routes/Profile");
const ExpenseRoutes = require("./routes/Expense");
const DebtsRoutes = require("./routes/Debt");
const SavingsRoutes = require("./routes/Saving");

connectDB();

const app = express();
const corsOptions = {
  origin: [
    "https://kinglaf.com",
    "https://www.kinglaf.com",
    "http://localhost:5173",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/revenues", RevenueRoutes);
app.use("/api/profile", ProfileRoutes);
app.use("/api/expenses", ExpenseRoutes);
app.use("/api/debts", DebtsRoutes);
app.use("/api/savings", SavingsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
