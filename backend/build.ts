import * as esbuild from "esbuild";

const fs = require("fs");

const jsdomPatch = {
  name: "jsdom-patch",
  setup(build: any) {
    build.onLoad(
      { filter: /jsdom\/living\/xhr\/XMLHttpRequest-impl\.js$/ },
      async (args: any) => {
        let contents = await fs.promises.readFile(args.path, "utf8");

        contents = contents.replace(
          'const syncWorkerFile = require.resolve ? require.resolve("./xhr-sync-worker.js") : null;',
          `const syncWorkerFile = "${require.resolve(
            "jsdom/lib/jsdom/living/xhr/xhr-sync-worker.js"
          )}";`
        );

        return { contents, loader: "js" };
      }
    );
  },
};

module.exports = [jsdomPatch];

esbuild.build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "node",
  outfile: "dist/index.js",
  plugins: [jsdomPatch],
});
