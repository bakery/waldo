Package.describe({
  name: "thebakery:open-graph-scraper",
  summary: "Open Graph metadata parser",
  version: "0.0.1"
});

Package.onUse(function(api) {
  api.versionsFrom("1.0");
  //api.use([], "server");

  Npm.depends({ 'open-graph-scraper' : '0.9.8' });

  api.addFiles([
    "api.js"
  ], "server");

  api.export("OpenGraphScraper");
});