import path from "path";
import fs from "fs-extra";

async function copy() {
  const exampleRoot = path.resolve("channels"); 
  const distRoot = path.resolve("dist");

  // 1. 核心修复：确保 dist 目录及其父目录存在
  await fs.ensureDir(distRoot);

  const exampleFolders = await fs.readdir(exampleRoot);
  
  // 2. 拷贝各频道产物
  await Promise.all(exampleFolders.map(exampleFolder => {
    const copyFrom = path.join(exampleRoot, exampleFolder, "public");
    const copyTo = path.join(distRoot, exampleFolder);
    
    // 检查子目录是否存在 public，防止因空文件夹报错
    if (fs.existsSync(copyFrom)) {
        return fs.copy(copyFrom, copyTo);
    }
  }));

  // 3. 确保在 dist 目录存在后再写入 CNAME
  await fs.writeFile(path.join(distRoot, "CNAME"), "rss3.basicsix.eu.org");
  console.log("CNAME generated successfully in dist/");
} 

copy().catch(err => {
    console.error(err);
    process.exit(1);
});
