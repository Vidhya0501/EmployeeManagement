import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

//employee signup
router.post("/adminsignup", (req, res) => {
  const email = req.body.email;

  const search_sql = `SELECT email FROM admin WHERE email = ?`;

  con.query(search_sql, [email], (err, results) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });

    // Check if the email is already registered
    if (results.length > 0) {
      return res.json({ Status: false, Error: "Already Registered" });
    }

    // If the email is not registered, proceed to insert the new admin
    const sql = `INSERT INTO admin (name, email, password) VALUES (?)`;

    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err)
        return res.json({ Status: false, Error: "Password Hashing Error" });

      const values = [req.body.name, req.body.email, hash];

      con.query(sql, [values], (err, result) => {
        if (err) return res.json({ Status: false, Error: err });
        return res.json({ Status: true, result });
      });
    });
  });
});

//admin login
router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * FROM admin WHERE email = ?";
  con.query(sql, [req.body.email], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });

    if (result.length > 0) {
      bcrypt.compare(req.body.password, result[0].password, (err, response) => {
        if (err || !response)
          return res.json({ loginStatus: false, Error: "Invalid credentials" });

        const email = result[0].email;
        const token = jwt.sign(
          { role: "admin", email: email, id: result[0].id },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        res.cookie("token", token);
        return res.json({ loginStatus: true, id: result[0].id });
      });
    } else {
      return res.json({ loginStatus: false, Error: "Invalid credentials" });
    }
  });
});

//add category
router.post("/add_category", (req, res) => {
  const sql = "INSERT INTO category (`name`) VALUES (?)";
  con.query(sql, [req.body.category], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true });
  });
});

//category
router.get("/category", (req, res) => {
  const sql = "SELECT * FROM category";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

//add employee - employee signup
router.post("/add_employee", (req, res) => {
  const email = req.body.email;

  const search_sql = `SELECT email FROM employee WHERE email = ?`;

  con.query(search_sql, [email], (err, results) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });

    if (results.length > 0) {
      return res.json({ Status: false, Error: "Already added" });
    }

    const sql = `INSERT INTO employee (name, email, password, address, salary, category_id) VALUES (?)`;

    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err)
        return res.json({ Status: false, Error: "Password Hashing Error" });

      const values = [
        req.body.name,
        req.body.email,
        hash,
        req.body.address,
        req.body.salary,
        req.body.category_id,
      ];

      con.query(sql, [values], (err, result) => {
        if (err) return res.json({ Status: false, Error: err });
        return res.json({ Status: true });
      });
    });
  });
});

router.get("/employee", (req, res) => {
  const sql = "SELECT * FROM employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

router.put("/edit_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE employee 
        set name = ?, email = ?, salary = ?, address = ?, category_id = ? 
        Where id = ?`;
  const values = [
    req.body.name,
    req.body.email,
    req.body.salary,
    req.body.address,
    req.body.category_id,
  ];
  con.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.delete("/delete_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "delete from employee where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/admin_count", (req, res) => {
  const sql = "select count(id) as admin from admin";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/employee_count", (req, res) => {
  const sql = "select count(id) as employee from employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/salary_count", (req, res) => {
  const sql = "select sum(salary) as salaryOFEmp from employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/admin_records", (req, res) => {
  const sql = "select * from admin";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});

export { router as adminRouter };
