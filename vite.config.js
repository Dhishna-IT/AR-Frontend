export default {
    server: {
      port: 5173,
      middleware: [
        (req, res, next) => {
          const path = req.url.split('/')[1];
  
          // Redirect to /{folder}/index.html
          const redirectTo = `/home/index.html`;
          res.writeHead(302, { Location: redirectTo });
          if (path && path !== '' && path !== 'index.html') {
            const redirectTo = `/${path}/index.html`;
            res.writeHead(302, { Location: redirectTo });
            res.end();
          } else {
            next();
          }
        },
      ],
    },
  };