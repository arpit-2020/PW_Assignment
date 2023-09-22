const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const fs = require("fs");

module.exports.RenderSignIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "SignIn Page",
  });
};

module.exports.CreateSession = function (req, res) {
  console.log("session will be created here");
  let user = req.body;
  delete user.password;
  let expiresIn = 3600;
  const token = jwt.sign(req.body, "PW",{expiresIn});

  console.log("Session created. Token:", token);

  // Return the token or any other response as needed
  user.token = token;
  console.log(user);

  const userCookie = cookie.serialize("user", JSON.stringify(user));

  // Set the user cookie in the response
  res.setHeader("Set-Cookie", userCookie);
  return res.redirect("/api/list"); // Return the token as JSON response
};
module.exports.RenderList = function (req, res) {
  res.render("list", {
    title: "Api's Listing",
  });
};
module.exports.RenderAddDetails = function (req, res) {
  res.render("addDetails", {
    title: "Add Data",
  });
};
module.exports.addData = function (req, res) {
  const rawData = fs.readFileSync("./data.json");
  const data = JSON.parse(rawData);

  // Add the new data from req.body
  data.push(req.body);

  // Write the updated data back to data.json
  fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));

  console.log("Data added successfully:", req.body);
  res.redirect("/api/list");
};

module.exports.RenderDeletePage = function (req, res) {
  const rawData = fs.readFileSync("./data.json");
  const data = JSON.parse(rawData);

  res.render("dataTable", {
    title: "Add Data",
    data,
  });
};

module.exports.deletePage = async function (req, res) {
  console.log("Our data is here: ", req.body);
  try {
    // Read the contents of data.json
    const rawData = fs.readFileSync("./data.json", "utf8");
    let data = JSON.parse(rawData);

    // Use filter to create a new array without the item to delete
    data = data.filter((item) => {
      // Compare item properties with req.body properties to identify the item to delete
      return (
        item.name !== req.body.name ||
        item.salary !== req.body.salary ||
        item.currency !== req.body.currency ||
        item.department !== req.body.department ||
        item.sub_department !== req.body.sub_department
      );
    });

    // Write the updated data back to data.json
    fs.writeFileSync("./data.json", JSON.stringify(data, null, 2), "utf8");

    res.send({ success: true, msg: "Data deleted" });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).send({ success: false, msg: "Internal server error" });
  }
};

module.exports.queryEntireDataset = function (req, res) {
  const rawData = fs.readFileSync("./data.json", "utf8");
  let data = JSON.parse(rawData);
  const salaries = data.map((item) => Number(item.salary));
  const mean =
    salaries.reduce((sum, salary) => sum + salary, 0) / salaries.length;
  const max = Math.max(...salaries);
  const min = Math.min(...salaries);
  const finalData = {
    mean: mean,
    max: max,
    min: min,
  };
  res.render("queryDataset", {
    title: "Query Entire Dataset",
    result: finalData,
  });
};

module.exports.queryEachDept = function (req, res) {
  const rawData = fs.readFileSync("./data.json", "utf8");
  let data = JSON.parse(rawData);
  const departmentStats = [];

  // Loop through the data and calculate statistics for each department
  data.forEach((record) => {
    const { department, salary } = record;
    // Find the index of the department in departmentStats
    const index = departmentStats.findIndex(
      (item) => item.department === department
    );

    if (index === -1) {
      // Initialize statistics object for the department
      const newDepartment = {
        department: department,
        maximum: Number.MIN_SAFE_INTEGER,
        minimum: Number.MAX_SAFE_INTEGER,
        total: 0,
        count: 0,
      };
      departmentStats.push(newDepartment);
    }

    // Update statistics for the department
    const salaryValue = parseInt(salary);
    const stats = departmentStats.find(
      (item) => item.department === department
    );
    stats.maximum = Math.max(stats.maximum, salaryValue);
    stats.minimum = Math.min(stats.minimum, salaryValue);
    stats.total += salaryValue;
    stats.count++;
  });

  // Calculate mean for each department
  departmentStats.forEach((department) => {
    department.mean = department.total / department.count;
  });

  // Now, departmentStats contains the desired statistics for each department
  console.log(departmentStats);
  res.render("queryEachDept", {
    title: "Query of Each Department",
    departmentStats,
  });
  res.send({ success: true, msg: "Success" });
};

module.exports.querySubDept = function (req, res) {
  const rawData = fs.readFileSync("./data.json", "utf8");
  let data = JSON.parse(rawData);

  const departmentStats = {};

  data.forEach((employee) => {
    const { department, sub_department, salary } = employee;

    if (!departmentStats[department]) {
      departmentStats[department] = {};
    }

    if (!departmentStats[department][sub_department]) {
      departmentStats[department][sub_department] = [];
    }

    departmentStats[department][sub_department].push(Number(salary));
  });

  // Calculate mean, max, and min for each department and sub-department combination
  for (const department in departmentStats) {
    for (const sub_department in departmentStats[department]) {
      const salaries = departmentStats[department][sub_department];
      const mean =
        salaries.reduce((acc, val) => acc + val, 0) / salaries.length;
      const max = Math.max(...salaries);
      const min = Math.min(...salaries);

      departmentStats[department][sub_department] = {
        mean: mean.toFixed(2),
        max,
        min,
      };
    }
  }

  console.log(departmentStats);

  res.render('querySubDept', {
    title: "",
    departmentStats
  })
  res.send({success: true, msg:"Success"});
};

module.exports.queryOnContract = function(req, res) {
    const rawData = fs.readFileSync("./data.json", "utf8");
    let data = JSON.parse(rawData);

    const onContractEmployees = data.filter(
        (employee) => employee.on_contract === "true"
      );
    
      if (onContractEmployees.length > 0) {
        // Calculate mean salary
        const totalSalary = onContractEmployees.reduce(
          (acc, employee) => acc + parseInt(employee.salary),
          0
        );
        const meanSalary = totalSalary / onContractEmployees.length;
    
        // Find max and min salary
        const salaries = onContractEmployees.map((employee) =>
          parseInt(employee.salary)
        );
        const maxSalary = Math.max(...salaries);
        const minSalary = Math.min(...salaries);
    
        // Wrap the results into an object
        const resultObject = {
          meanSalary: meanSalary,
          maxSalary: maxSalary,
          minSalary: minSalary,
        };
    
        // Send the result object as JSON response
        console.log(resultObject);
        res.render('queryOnContract', {
            title: "Have Contract Department Statistics",
            resultObject
        })
        // res.json(resultObject);
      } else {
        // No employees with 'on_contract' set to true
        res.json({ message: "No employees with 'on_contract' set to true." });
      }

}
