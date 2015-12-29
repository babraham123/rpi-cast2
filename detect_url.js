var page = require('webpage').create(),
  system = require('system'),
  total = 0,
  requests = [],
  num_requests = 1,
  target = "",
  timeout_t = 10000,
  timeout_id,
  t = 0, 
  url = "",
  errorQueue = [];

if (system.args.length < 3) {
  console.log('Usage: phantomjs detect_url.js <URL> <TARGET> <NUM REQUESTS> <TIMEOUT SEC>');
  phantom.exit();
}

function printSummary() {
  console.log('\nTarget requests: ' + requests.length + ', Total: ' + total + ', Errors: ' + errorQueue.length);
}

page.onResourceRequested = function(request) {
  total++;
  if (request.url.indexOf(target) > -1) {
    console.log('Request ' + JSON.stringify(request, undefined, 4));
    requests.append(request);
    if (requests.length > num_requests) {
      printSummary();
      phantom.exit();
    }
  }
};

//page.onResourceReceived = function(response) {
//  console.log('Receive ' + JSON.stringify(response, undefined, 4));
//};

page.onError = function(msg, trace) {
  var msgStack = ['ERROR: ' + msg];
  if (trace && trace.length) {
    msgStack.push('TRACE:');
    trace.forEach(function(t) {
      msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function + '")' : ''));
    });
  }
  errorQueue.append(msgStack);
};

t = Date.now();
url = system.args[1];
target = system.args[2];
if (system.args.length > 3) {
  num_requests = system.args[3];
}
if (system.args.length > 4) {
  timeout_t = parseInt(system.args[4]) * 1000;
}

page.open(url, function(status) {
  if (status !== 'success') {
    console.log('FAIL to load the url');
  } else {
    t = (Date.now() - t)/1000.0;
    console.log('Loading ' + system.args[1] + ', time ' + t + ' s');
  }

  timeout_id = setTimeout(function() {
    printSummary();
    phantom.exit();
  }, timeout_t);
});

