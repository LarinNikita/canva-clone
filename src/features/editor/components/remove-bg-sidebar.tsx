import Image from 'next/image';
import { AlertTriangle } from 'lucide-react';

import { ActiveTool, Editor } from '@/features/editor/types';
import { useRemoveBg } from '@/features/ai/api/use-remove-bg';
import { usePaywall } from '@/features/subscriptions/hooks/use-paywall';
import { ToolSidebarClose } from '@/features/editor/components/tool-sidebar-close';
import { ToolSidebarHeader } from '@/features/editor/components/tool-sidebar-header';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface RemoveBgSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export const RemoveBgSidebar = ({
    editor,
    activeTool,
    onChangeActiveTool,
}: RemoveBgSidebarProps) => {
    const mutation = useRemoveBg();

    const { shouldBlock, triggerPaywall } = usePaywall();

    const selectedObject = editor?.selectedObjects[0];
    // @ts-ignore
    const imageSrc = selectedObject?._originalElement?.currentSrc;

    const onClose = () => {
        onChangeActiveTool('select');
    };

    const onClick = () => {
        if (shouldBlock) {
            triggerPaywall();
            return;
        }

        mutation.mutate(
            {
                image: imageSrc,
            },
            {
                onSuccess({ data }) {
                    editor?.addImage(data);
                },
            },
        );
    };

    return (
        <aside
            className={cn(
                'relative z-[40] flex h-full w-[360px] flex-col border-r bg-white',
                activeTool === 'remove-bg' ? 'visible' : 'hidden',
            )}
        >
            <ToolSidebarHeader
                title="Background remover"
                description="Remove background from image using AI"
            />
            {!imageSrc && (
                <div className="flex flex-1 flex-col items-center justify-center gap-y-4">
                    <AlertTriangle className="text-muted-foreground size-4" />
                    <p className="text-muted-foreground text-xs">
                        Feature not available for selected object
                    </p>
                </div>
            )}
            {imageSrc && (
                <ScrollArea>
                    <div className="space-y-4 p-4">
                        <div
                            className={cn(
                                'bg-muted relative aspect-square overflow-hidden rounded-md transition',
                                mutation.isPending && 'opacity-50',
                            )}
                        >
                            <Image
                                src={imageSrc}
                                fill
                                alt="Image to remove background from"
                                className="object-cover"
                            />
                        </div>
                        <Button
                            className="w-full"
                            onClick={onClick}
                            disabled={mutation.isPending}
                        >
                            Remove background
                        </Button>
                    </div>
                </ScrollArea>
            )}
            <ToolSidebarClose onClick={onClose} />
        </aside>
    );
};
