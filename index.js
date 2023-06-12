const inquirer = require('inquirer');
const { table } = require('table');
const mysql = require('mysql2');
const express = require('express');

const config = {
    border: {
      topBody: `─`,
      topJoin: `┬`,
      topLeft: `┌`,
      topRight: `┐`,
  
      bottomBody: `─`,
      bottomJoin: `┴`,
      bottomLeft: `└`,
      bottomRight: `┘`,
  
      bodyLeft: `│`,
      bodyRight: `│`,
      bodyJoin: `│`,
  
      joinBody: `─`,
      joinLeft: `├`,
      joinRight: `┤`,
      joinJoin: `┼`
    }
  };
  
  function showTable(data, cb){
    let tableData = [];
    // option 1 fancy one line table data format
    tableData = [
      //column
      Object.keys(data[0]), 
      //values
      ...data.map(val => Object.values(val))];
  
    // // option 2 for tables, using basic for loop and starter array
    // tableData = [Object.keys(data[0])];
    // for(var i = 0; i< data.length; i++){
    //   tableData.push(Object.values(data[i]));
    // }
    inquirer.prompt([
      {
        message: "\n" + table(tableData, config),
        type: 'input',
        name: 'name'
      }
    ])
    .then( () => {
      if(cb) cb();
    })
  }
  
  const dbData = [
    { id: 1, name: "Anthony"},
    { id: 2, name: "Myself"},
    { id: 3, name: "Turtle"},
  ];
  
  showTable(dbData, () => {
    console.log("Do stuff after!");
  });