export default async (req, res) => {
  const { reqHandler } = await import('../dist/control-de-procesos/server/server.mjs');
  return reqHandler(req, res);
};
