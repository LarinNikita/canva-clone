import { z } from 'zod';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';

import { replicate } from '@/lib/replicate';

const app = new Hono()
    .post(
        '/generate-image',
        zValidator(
            'json',
            z.object({
                prompt: z.string(),
            }),
        ),
        async c => {
            const { prompt } = c.req.valid('json');

            //!!! TODO найти способ локально генерировать изображения
            //??? Возможно потребуется создать микросервисный бэкэнд на python для запуска модели black-forest-labs/flux-dev

            const input = {
                prompt: prompt,
                go_fast: true,
                megapixels: '1',
                num_outputs: 1,
                aspect_ratio: '1:1',
                output_format: 'webp',
                output_quality: 80,
                num_inference_steps: 4,
            };

            const output = await replicate.run(
                'stability-ai/stable-diffusion-3',
                {
                    input,
                },
            );

            const res = output as Array<string>;

            return c.json({ data: res[0] });
        },
    )
    .post(
        '/remove-bg',
        zValidator(
            'json',
            z.object({
                image: z.string(),
            }),
        ),
        async c => {
            const { image } = c.req.valid('json');

            const input = {
                image: image,
            };

            const output: unknown = await replicate.run(
                'cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003',
                { input },
            );

            const res = output as string;

            return c.json({ data: res });
        },
    );

export default app;
