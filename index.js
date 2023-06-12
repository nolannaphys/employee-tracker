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

function showTable(data, cb) {
  let tableData = [];
  tableData = [
    //column
    Object.keys(data[0]),
    //values
    ...data.map(val => Object.values(val))];

  inquirer.prompt([
    {
      message: "\n" + table(tableData, config),
      type: 'input',
      name: 'name'
    }
  ])
    .then(() => {
      if (cb) cb();
      console.log("Done!")
    })
};

const dbData = [
  {id: 1, name: "Nolan"},
  {id: 2, name: "Hank"},
  {id: 3, name: "George"}
];

showTable(dbData, () => {
  console.log("Do stuff after!");
});