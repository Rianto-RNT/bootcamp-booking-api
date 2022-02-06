const http = require("http");

const todos = [
  { id: 1, text: "Todo Zero" },
  { id: 2, text: "Todo One" },
  { id: 3, text: "Todo Two" },
];

const server = http.createServer((req, res) => {
  const { method, url } = req;
  // const {headers, url, method} = req;
  // console.log(headers, url, method);

  //   res.statusCode = 404;
  // res.setHeader('Content-Type', 'text/plain')
  //   res.setHeader("Content-Type", "application/json");
  //   res.setHeader("X-Powered-By", "Node.js");

  //   console.log(req.headers.authorization)

  let body = [];

  req
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();
      //   console.log(body);

      let status = 404;
      const response = {
        success: false,
        data: null,
        error: null
      };

      if (method === "GET" && url === "/todos") {
        status = 200;
        response.success = true;
        response.data = todos;
      } else if (method === "POST" && url === "/todos") {
        const { id, text } = JSON.parse(body);

        if (!id || !text) {
          status = 400;
          response.error = 'please add id and text'
        } else {
          todos.push({ id, text });
          status = 201;
          response.success = true;
          response.data = todos;
        }
      }

      res.writeHead(status, {
        "Content-Type": "application/json",
        "X-Powered-By": "Node.js",
      });

      res.end(
        JSON.stringify(
          response
          //     {

          //   //   success: true,
          //   //   success: false,
          //   //   data: todos,
          //   //   error: 'Not Found',
          //   //   error: 'Please add email',
          //   //   data: null,
          // }
        )
      );
    });

  //   res.writeHead(404, {
  //     "Content-Type": "application/json",
  //     "X-Powered-By": "Node.js",
  //   });

  // res.write('<h1>Hello</h1>')
  // res.write('<h2>Hello Again</h2>')
});

const PORT = 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
