const { run } = require('runjs');

const serve = env => () => {
  run(`NODE_ENV=${env} vue-cli-service serve --port 9090`);
};

const deploy = (bucket, env) => () => {
  run(`SET NODE_ENV=${env} & yarn build`);
  // run(`aws s3 rm s3://${bucket} --recursive --profile kontigo`);
  // run(`aws s3 cp --recursive ./dist s3://${bucket} --profile kontigo --metadata-directive REPLACE --acl public-read --cache-control max-age=3600,s-maxage=1,public`);
};

const destroy = bucket => () => {
  run(`aws s3 rb s3://${bucket} --force`);
};

module.exports = {
  'serve:mock': serve('mock'),
  'deploy:uat': deploy('kontigo-express', 'uat'),
  'deploy:production': deploy('kontigo-express', 'production'),
};
