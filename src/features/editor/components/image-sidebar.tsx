import { AlertTriangle, Loader } from 'lucide-react';

import { ActiveTool, Editor } from '@/features/editor/types';

import { useGetImages } from '@/features/images/api/use-get-images';

import { ToolSidebarClose } from '@/features/editor/components/tool-sidebar-close';
import { ToolSidebarHeader } from '@/features/editor/components/tool-sidebar-header';

import { cn } from '@/lib/utils';

import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import Link from 'next/link';

interface ImageSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export const ImageSidebar = ({
    editor,
    activeTool,
    onChangeActiveTool,
}: ImageSidebarProps) => {
    const { data, isLoading, isError } = useGetImages();

    const onClose = () => {
        onChangeActiveTool('select');
    };

    return (
        <aside
            className={cn(
                'relative z-[40] flex h-full w-[360px] flex-col border-r bg-white',
                activeTool === 'images' ? 'visible' : 'hidden',
            )}
        >
            <ToolSidebarHeader
                title="Images"
                description="Add images to your canvas"
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
                        Failed to fetch images
                    </p>
                </div>
            )}
            <ScrollArea>
                <div className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                        {data &&
                            data.map(image => {
                                return (
                                    <button
                                        onClick={() =>
                                            editor?.addImage(image.urls.regular)
                                        }
                                        key={image.id}
                                        className="bg-muted group relative h-[100px] w-full overflow-hidden rounded-sm border transition hover:opacity-75"
                                    >
                                        <Image
                                            fill
                                            src={image.urls.small}
                                            alt={
                                                image.alt_description ||
                                                'Image unsplash'
                                            }
                                            className="object-cover"
                                        />
                                        <Link
                                            target="_blank"
                                            href={image.links.html}
                                            className="absolute bottom-0 left-0 w-full truncate bg-black/50 p-1 text-left text-[10px] text-white opacity-0 hover:underline group-hover:opacity-100"
                                        >
                                            {image.user.name}
                                        </Link>
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
