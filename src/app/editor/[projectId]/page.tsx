'use client';

import Link from 'next/link';
import { Loader, TriangleAlert } from 'lucide-react';

import { Editor } from '@/features/editor/components/editor';
import { useGetProject } from '@/features/projects/api/use-get-project';

import { Button } from '@/components/ui/button';

interface EditorProjectIdPageProps {
    params: { projectId: string };
}

const EditorProjectIdPage = ({ params }: EditorProjectIdPageProps) => {
    const { data, isLoading, isError } = useGetProject(params.projectId);

    if (isLoading || !data) {
        return (
            <div className="flex h-full flex-col items-center justify-center">
                <Loader className="text-muted-foreground size-6 animate-spin" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex h-full flex-col items-center justify-center gap-y-5">
                <TriangleAlert className="text-muted-foreground size-6" />
                <p className="text-muted-foreground text-sm">
                    Failed to load project
                </p>
                <Button asChild variant="secondary">
                    <Link href="/">Back to Home</Link>
                </Button>
            </div>
        );
    }

    return <Editor initialData={data} />;
};

export default EditorProjectIdPage;
