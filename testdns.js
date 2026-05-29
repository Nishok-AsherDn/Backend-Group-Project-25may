const dns = require("dns");

dns.resolveSrv(
  "_mongodb._tcp.projectuser.xxgm6nb.mongodb.net",
  (err, records) => {
    console.log("Error:", err);
    console.log("Records:", records);
  }
);