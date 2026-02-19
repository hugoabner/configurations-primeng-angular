// export default async (req, res) => {
//   const { reqHandler } = await import('../dist/angular-SSR-vercel/server/server.mjs');
//   return reqHandler(req, res);
// };

// api/index.js
const { reqHandler } = require('../dist/<your-project-name>/server/server.mjs');

module.exports = (req, res) => {
  return reqHandler(req, res);
};