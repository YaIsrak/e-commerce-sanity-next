'use client';

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';
import { apiVersion, dataset, projectId } from './sanity/env';
import { schema } from './sanity/schemaTypes';
import { structure } from './sanity/structure';

export default defineConfig({
	basePath: '/studio',
	projectId,
	dataset,
	schema,
	plugins: [
		structureTool({ structure }),
		visionTool({ defaultApiVersion: apiVersion }),
		presentationTool({
			previewUrl: {
				preview: '/',
				previewMode: {
					enable: '/draft-mode/enable',
				},
			},
		}),
	],
});
