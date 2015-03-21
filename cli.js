#!/usr/bin/env node

var _ = require('lodash');
var conf = require('rc')('github-issues-to-readme', {});
var extract = require('extract-github');
var fs = require('fs');
var github = new (require('github'))({version: '3.0.0'});

var repoInfo = extract(require(process.cwd() + '/package.json'));

github.authenticate({type: 'oauth', token: conf.token});
github.issues.repoIssues({'user': repoInfo.user, 'repo': repoInfo.repo}, processIssues);

function processIssues(err, res) {
  if (err) {
    handleHttpErrors(err);
    return;
  }

  var issuesHeader = '# Issues';
  var readmeText = '';
  var appendedText = '';

  _.each(res, function(n, key) {
    appendedText += '\n## <a href="' + n.html_url + '">' + n.title + '</a>\n' + n.body + '\n'
  });

  fs.readFile('README.md', function (err, data) {
    if (err) throw err;
    var readmeText = data.toString().split('# Issues').shift();

    fs.writeFile('README.md', readmeText + issuesHeader + appendedText, function (err) {
      if (err) throw err;
      console.log('It\'s saved!');
    });
  });
}

function handleHttpErrors(err) {
  switch (err.code) {
    case 401:
      console.error('Could not authenticate. Check your oauth token in your configuration file.');
      break;
    default:
      throw err;
  }
}
