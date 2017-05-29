// @flow
export default function (config: any) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>opsmap</title>
        <link rel="stylesheet" href="${config['web-static-prefix']}/semantic.min.css" />
      </head>
      <body>
        <div id="main"></div>
        <script src="${config['web-static-prefix']}/index.bundle.js"></script>
      </body>
    </html>
  `
}
