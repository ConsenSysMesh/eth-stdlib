#!/usr/bin/env ./node_modules/.bin/babel-node
var fs = require("fs");
var path = require("path");
var rimraf = require("rimraf");
var mkdirp = require("mkdirp");

var contracts_file = "./config/development/contracts.json";
var headers_directory = "./headers"

if (!fs.existsSync(contracts_file)) {
  console.log(`Couldn't find contracts file, please compile contracts first. Expected: ${contracts_file}`);
  process.exit(1);
};

var contracts = JSON.parse(fs.readFileSync("./config/development/contracts.json"));

// Ignore contracts that are only used for testing.
Object.keys(contracts).forEach(function(name) {
  if (name.indexOf("Test") == 0) {
    console.log(`Ignored ${name}.sol`)
    delete contracts[name];
  }
});

var reduce_signature = function(signature) {
  return signature.reduce(function(previous, current, index) {
    var sig = "";
    if (index > 0) {
      sig += ", ";
    }
    sig += current.type;
    if (current.name != null && current.name != "") {
      sig += ` ${current.name}`;
    }
    return previous + sig;
  }, "");
};

var make_function = function(name, fn) {
  var returns = "";

  if (fn.outputs != null && fn.outputs.length > 0) {
    returns = ` returns (${reduce_signature(fn.outputs)})`;
  }

  return `  function ${name}(${reduce_signature(fn.inputs)})${returns}; \n`;
};

var headers = Object.keys(contracts).map(function(name) {
  var contract = contracts[name];
  var abi = contract.abi;
  var new_header = `contract ${name} { \n`;

  for (var fn of abi) {
    switch(fn.type) {
      case "constructor":
        new_header += make_function(name, fn)
        break;
      case "function":
        new_header += make_function(fn.name, fn);
        break;
      default:
        throw new Error(`Unknown type ${fn.type} found in ${contract.source}`);
    }
  }

  new_header += `} \n`;

  return {
    name: name,
    body: new_header
  }
});

rimraf.sync(headers_directory + "/*");
mkdirp.sync(headers_directory);

for (var header of headers) {
  var header_path = path.join(headers_directory, header.name + ".sol");
  console.log(`Writing ${header_path}...`);
  fs.writeFileSync(header_path, header.body, {encoding: "utf8"});
}

console.log("All headers written successfully!");
