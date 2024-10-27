import { useState } from 'react';

import { ActiveTool, Editor } from '@/features/editor/types';
import { useGenerationImage } from '@/features/ai/api/use-generate-image';
import { ToolSidebarClose } from '@/features/editor/components/tool-sidebar-close';
import { ToolSidebarHeader } from '@/features/editor/components/tool-sidebar-header';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AiSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export const AiSidebar = ({
    editor,
    activeTool,
    onChangeActiveTool,
}: AiSidebarProps) => {
    const mutation = useGenerationImage();

    const [value, setValue] = useState<string>('');

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //TODO Block with paywall

        mutation.mutateAsync(
            { prompt: value },
            {
                onSuccess: ({ data }) => {
                    editor?.addImage(data);
                },
            },
        );
    };

    const onClose = () => {
        onChangeActiveTool('select');
    };

    return (
        <aside
            className={cn(
                'relative z-[40] flex h-full w-[360px] flex-col border-r bg-white',
                activeTool === 'ai' ? 'visible' : 'hidden',
            )}
        >
            <ToolSidebarHeader
                title="AI"
                description="Generate an image using AI"
            />
            <ScrollArea>
                <form className="space-y-6 p-4" onSubmit={onSubmit}>
                    <Textarea
                        placeholder="Enter your prompt here..."
                        cols={30}
                        rows={10}
                        required
                        minLength={3}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        disabled={mutation.isPending}
                    />
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={mutation.isPending}
                    >
                        Generate
                    </Button>
                </form>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    );
};
