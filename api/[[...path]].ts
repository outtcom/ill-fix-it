import app from './boot.js';

export default async function handler(request: Request) {
  return app.fetch(request);
}
