import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(90),
      /** <title> de la página (≤ 60 caracteres). Si falta, se usa `title`. */
      seoTitle: z.string().max(60).optional(),
      description: z.string().max(155),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      author: z.string().default('Equipo CERAMIS'),
      tags: z.array(z.string()).min(1),
      cover: image(),
      coverAlt: z.string(),
      /** Slug de un servicio para el CTA del final del artículo. */
      service: z.string().optional(),
      faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
