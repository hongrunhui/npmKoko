import { Controller, Get, Post, Param, Response, Req, Render, Body } from '@nestjs/common';
import { AppService } from './app.service';
const childProcess = require('child_process');
const {exec} = childProcess;
const path = require('path');
const express = require('express');
const app = new express();
// const fse = require('fs-extra');
// const api2htmlFile = path.resolve(process.cwd(), 'src/js/api2html');
// const api2html = require(api2htmlFile);
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('html')
  homePage(@Param() params): string {
    return 'hello world';
  }
  @Post('npm')
  getNpmName(@Body() rData, @Param() params, @Req() request, @Response() res): string {
    console.log('rData', rData);
    let {npmName} = params;
    if (!npmName) {
      npmName = rData.name || 'redux';
    }
    // const apis = api2html(fse, 'ss');
    // console.log('req', JSON.stringify(apis));
    // cd ./page & npm i ${npmName} --save-dev
    const currentPath = path.resolve(process.cwd(), 'src/page');
    const reaplaceJsPath = path.resolve(process.cwd(), 'src/js');
    const fePath = path.resolve(process.cwd(), 'front-end');
    const resultPath = path.resolve(process.cwd(), 'src/page/index.html');
    const errResultPath = path.resolve(process.cwd(), 'src/page/index_error.html');
    var cmdStr = `
      npm i ${npmName} --save-dev
    `;
    console.log(cmdStr);
    exec(cmdStr, {cwd: fePath}, function (err, stdout, stderr) {
      if (err) {
        console.log('error:' + stderr);
      } else {
        console.log('success:' + stdout);
        exec(`node ./replace.js ${npmName}`, {cwd: reaplaceJsPath}, function (err, stdout, stderr) {
          if(err) {
            console.log('replace error:' + stderr);
          } else {
            console.log('replace success:' + stdout);
            exec(`npm run build`, {cwd: fePath, maxBuffer: 1024 * 1024 * 10}, function (err, stdout, stderr) {
              if (err) {
                console.log('build error:' + stderr, err);
                // res.status(400).json({
                //   msg: '编译失败'
                // })
                res.status(400).send({
                  msg: '安装失败'
                });
              }
              else {
                console.log('build success:' + stdout);
                res.status(200).send({
                  msg: '安装成功'
                });
                return {mm: 'hi'}
                // res.status(200).json({
                //   msg: '安装成功'
                // })
              }
            })
          }
        });
      }
    });

    return `正在安装npm包: ${npmName}`;
  }
}
