import Image from 'next/image';
import { AlertTriangle, Loader } from 'lucide-react';

import { ActiveTool, Editor } from '@/features/editor/types';
import { ToolSidebarClose } from '@/features/editor/components/tool-sidebar-close';
import { ToolSidebarHeader } from '@/features/editor/components/tool-sidebar-header';
import {
    ResponseType,
    useGetTemplates,
} from '@/features/projects/api/use-get-templates';

import { useConfirm } from '@/hooks/use-confirm';

import { cn } from '@/lib/utils';

import { ScrollArea } from '@/components/ui/scroll-area';

interface TemplateSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export const TemplateSidebar = ({
    editor,
    activeTool,
    onChangeActiveTool,
}: TemplateSidebarProps) => {
    const [ConfirmDialog, confirm] = useConfirm(
        'Are you sure?',
        'You are about to replace the current project with this template',
    );

    const { data, isLoading, isError } = useGetTemplates({
        page: '1',
        limit: '20',
    });

    const onClick = async (template: ResponseType['data'][0]) => {
        //TODO Check if template is Pro

        const ok = await confirm();
        if (ok) {
            editor?.loadJson(template.json);
        }
    };

    const onClose = () => {
        onChangeActiveTool('select');
    };

    return (
        <aside
            className={cn(
                'relative z-[40] flex h-full w-[360px] flex-col border-r bg-white',
                activeTool === 'templates' ? 'visible' : 'hidden',
            )}
        >
            <ConfirmDialog />
            <ToolSidebarHeader
                title="Templates"
                description="Choose from a variety of templates to get started"
            />

            {isLoading && (
                <div className="flex flex-1 items-center justify-center">
                    <Loader className="text-muted-foreground size-4 animate-spin" />
                </div>
            )}
            {isError && (
                <div className="flex flex-1 flex-col items-center justify-center gap-y-4">
                    <AlertTriangle className="text-muted-foreground size-4" />
                    <p className="text-muted-foreground text-xs">
                        Failed to fetch templates
                    </p>
                </div>
            )}
            <ScrollArea>
                <div className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                        {data &&
                            data.map(template => {
                                return (
                                    <button
                                        onClick={() => onClick(template)}
                                        key={template.id}
                                        style={{
                                            aspectRatio: `${template.width}/${template.height}`,
                                        }}
                                        className="bg-muted group relative w-full overflow-hidden rounded-sm border transition hover:opacity-75"
                                    >
                                        <Image
                                            fill
                                            src={template.thumbnailUrl || ''}
                                            alt={template.name || 'Template'}
                                            className="object-cover"
                                        />
                                        <div className="absolute bottom-0 left-0 w-full truncate bg-black/50 p-1 text-left text-[10px] text-white opacity-0 group-hover:opacity-100">
                                            {template.name}
                                        </div>
                                    </button>
                                );
                            })}
                    </div>
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    );
};
