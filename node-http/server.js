const http = require("http");

const todos = [
  { id: 1, text: "Todo Zero" },
  { id: 2, text: "Todo One" },
  { id: 3, text: "Todo Two" },
];

const server = http.createServer((req, res) => {
  // const {headers, url, method} = req;
  // console.log(headers, url, method);

//   res.statusCode = 404;
  // res.setHeader('Content-Type', 'text/plain')
//   res.setHeader("Content-Type", "application/json");
//   res.setHeader("X-Powered-By", "Node.js");

  res.writeHead(404, {
    "Content-Type": "application/json",
    "X-Powered-By": "Node.js"
  });

  // res.write('<h1>Hello</h1>')
  // res.write('<h2>Hello Again</h2>')
  res.end(
    JSON.stringify({
    //   success: true,
      success: false,
    //   data: todos,
    //   error: 'Not Found',
      error: 'Please add email',
      data: null,
    })
  );
});

const PORT = 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
