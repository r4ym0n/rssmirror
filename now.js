{
    "version": 2,
    "builds": [
      { "src": "scripts/build_fileless.sh", "use": "@now/static-build" ,"config": { "distDir": "./" }},
      { "src": "server/now.js", "use": "@now/node" }
    ],
    "routes": [
      { "src": "/(.*)", "dest": "server/now.js" }
    ]
  }