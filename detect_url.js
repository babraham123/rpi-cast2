var page = require('webpage').create(),
  system = require('system'),
  total = 0,
  requests = [],
  num_requests = 1,
  target = '1.1.1.1',
  t, address;

if (system.args.length < 3) {
  console.log('Usage: detect_url.js <URL> <TARGET> <NUM REQUESTS>');
  phantom.exit();
}

page.onResourceRequested = function(request) {
  total++;
  if (request.url.indexOf(target) > -1) {
    console.log('Request ' + JSON.stringify(request, undefined, 4));
    requests.append(request);
    if (requests.length > num_requests) {
      console.log('\nTarget requests: ' + requests.length + ', Total: ' + total);
      phantom.exit();
    }
  }
};

//page.onResourceReceived = function(response) {
//  console.log('Receive ' + JSON.stringify(response, undefined, 4));
//};

t = Date.now();
url = system.args[1];
target = system.args[2];
if (system.args.length > 3) {
  num_requests = system.args[3];
}

page.open(url, function(status) {
  if (status !== 'success') {
    console.log('FAIL to load the url');
  } else {
    t = (Date.now() - t)/1000.0;
    console.log('Loading ' + system.args[1] + ', time ' + t + ' s');
  }
  phantom.exit();
});
