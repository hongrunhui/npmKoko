import { Controller, Get, Param, Response, Req } from '@nestjs/common';
import { AppService } from './app.service';
const childProcess = require('child_process');
const {exec} = childProcess;
const path = require('path');
const express = require('express');
const app = new express();

app.set('view engine', 'html');
const htmlPath = path.resolve(process.cwd(), 'necoo/build');
app.use(express.static(htmlPath));
app.listen(9090, function() {
  console.log('服务创建成功');
});
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('html')
  homePage(@Param() params): string {
    return 'hello world';
  }
  @Get('npm/:npmName')
  getNpmName(@Param() params, @Req() request, @Response() res): string {
    const {npmName} = params;
    console.log('req', request.originalUrl);
    if (/npm\//.test(request.originalUrl)) {
      // cd ./page & npm i ${npmName} --save-dev
      const currentPath = path.resolve(process.cwd(), 'src/page');
      const reaplaceJsPath = path.resolve(process.cwd(), 'src/js');
      const necooPath = path.resolve(process.cwd(), 'necoo');
      const resultPath = path.resolve(process.cwd(), 'src/page/index.html');
      var cmdStr = `
        npm i ${npmName} --save-dev
    `;
      console.log(currentPath);
      exec(cmdStr, {cwd: currentPath}, function (err, stdout, stderr) {
        if(err) {
          console.log('error:' + stderr);
        } else {
          console.log('success:' + stdout);
          exec(`node ./replace.js ${npmName}`, {cwd: reaplaceJsPath}, function (err, stdout, stderr) {
            if(err) {
              console.log('replace error:' + stderr);
            } else {
              console.log('replace success:' + stdout);
              exec(`npm run build`, {cwd: necooPath}, function (err, stdout, stderr) {
                if (err) {
                  console.log('build error:' + stderr);
                }
                else {
                  console.log('build success:' + stdout);
                  res.sendFile(resultPath);
                }
              })
            }
          });
        }
      });
    }
    else {
      console.log('其他', request.originalUrl);
    }

    return `正在安装npm包: ${npmName}`;
  }
}
