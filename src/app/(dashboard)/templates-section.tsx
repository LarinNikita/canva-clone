'use client';

import { useRouter } from 'next/navigation';
import { AlertTriangle, Loader } from 'lucide-react';

import { usePaywall } from '@/features/subscriptions/hooks/use-paywall';
import { useCreateProject } from '@/features/projects/api/use-create-project';
import {
    ResponseType,
    useGetTemplates,
} from '@/features/projects/api/use-get-templates';

import { TemplateCard } from './template-card';

export const TemplatesSection = () => {
    const router = useRouter();

    const { shouldBlock, triggerPaywall } = usePaywall();

    const { data, isLoading, isError } = useGetTemplates({
        page: '1',
        limit: '4',
    });

    const mutation = useCreateProject();

    const onClick = (template: ResponseType['data'][0]) => {
        if (template.isPro && shouldBlock) {
            triggerPaywall();
            return;
        }

        mutation.mutate(
            {
                name: `${template.name} project`,
                json: template.json,
                width: template.width,
                height: template.height,
            },
            {
                onSuccess: ({ data }) => {
                    router.push(`/editor/${data.id}`);
                },
            },
        );
    };

    if (isError) {
        return (
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Start from a template</h3>
                <div className="flex h-32 flex-col items-center justify-center gap-y-4">
                    <AlertTriangle className="text-muted-foreground size-6" />
                    <p className="text-muted-foreground text-sm">
                        Failed to load templates
                    </p>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Start from a template</h3>
                <div className="flex h-32 flex-col items-center justify-center gap-y-4">
                    <Loader className="text-muted-foreground size-6 animate-spin" />
                </div>
            </div>
        );
    }

    if (!data?.length) {
        return null;
    }

    return (
        <div className="">
            <h3 className="text-lg font-semibold">Start from a template</h3>
            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                {data?.map(template => (
                    <TemplateCard
                        key={template.id}
                        imageSrc={template.thumbnailUrl || ''}
                        title={template.name}
                        onClick={() => onClick(template)}
                        disable={mutation.isPending}
                        description={`${template.width} x ${template.height} px`}
                        width={template.width}
                        height={template.height}
                        isPro={template.isPro}
                    />
                ))}
            </div>
        </div>
    );
};
