const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

const externals = ["script", ".DS_Store", ".git"];

function recursive_dir(dir, deep = 1) {
  const list = fs.readdirSync(dir);

  const rt = [];
  for (const name of list) {
    if (externals.includes(name)) continue;
    const filepath = path.join(dir, name);

    if (fs.statSync(filepath).isDirectory()) {
      if (deep === 1) {
        rt.push({
          name,
        });
      }

      rt.push(...recursive_dir(filepath, deep + 1));
    } else {
      if (deep === 1) continue;

      rt.push({
        name,
        filepath,
      });
    }
  }
  return rt;
}

function toFile(list) {
  let str = "";
  for (const item of list) {
    const { name, filepath } = item;
    if (!filepath) {
      str += `\n${name}: \n`;
    } else {
      str += `- [${name}](${filepath.replace(root, ".")})\n`;
    }
  }

  fs.writeFileSync(path.resolve(__dirname, "out.md"), str);
}

function main() {
  const list = recursive_dir(root);
  toFile(list);
}

main();
