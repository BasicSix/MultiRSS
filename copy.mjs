import path from "path";
import fs from "fs-extra";

async function copy() {
  // 核心修改：将路径从 examples 指向 channels
  const exampleRoot = path.resolve("channels"); 
  const exampleFolders = await fs.readdir(exampleRoot);
  
  await Promise.all(exampleFolders.map(exampleFolder => {
    const copyFrom = path.join(exampleRoot, exampleFolder, "public");
    // 拷贝到 dist 目录下，保持频道名称
    const copyTo = path.resolve("dist", exampleFolder);
    return fs.copy(copyFrom, copyTo);
  }));
} 

copy();
