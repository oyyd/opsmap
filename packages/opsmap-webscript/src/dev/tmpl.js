function tmpl({ scenes, host }) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="opsmap-host" content="${host}"/>
      <meta name="opsmap-scenes" content="${scenes}"/>
    </head>
    <body>
      <script src="../build/index.bundle.js"></script>
    </body>
  </html>
  `
}

export default tmpl
