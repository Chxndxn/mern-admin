const promClient = require('prom-client');

// Create Prometheus registry and collect default metrics
const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

// Create custom metrics
const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status'],
  registers: [register],
});

const httpRequestTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
  registers: [register],
});

exports.health = (req, res) => {
    res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
}

exports.ready = (req, res) => {
    res.status(200).json({
    status: 'ready',
    timestamp: new Date().toISOString()
  });
}

exports.metrics = (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(register.metrics());
}