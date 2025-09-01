import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
import { access } from 'fs';

const es = initEdgeStore.create();

/**
 * This is the main router for the EdgeStore buckets.
 */
const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket(),
  promptFiles: es.fileBucket(),
  boardImages: es.imageBucket(),
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
  // Add any additional options here
});

export { handler as GET, handler as POST };

/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;