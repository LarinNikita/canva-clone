'use client';

import { CiFileOn } from 'react-icons/ci';
import { useFilePicker } from 'use-file-picker';
import {
    ChevronDown,
    Download,
    MousePointerClick,
    Redo2,
    Undo2,
} from 'lucide-react';
import {
    BsCloudCheck,
    BsFiletypeJpg,
    BsFiletypeJson,
    BsFiletypePng,
    BsFiletypeSvg,
} from 'react-icons/bs';

import { Logo } from '@/features/editor/components/logo';
import { ActiveTool, Editor } from '@/features/editor/types';

import { cn } from '@/lib/utils';

import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavbarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Navbar = ({
    editor,
    activeTool,
    onChangeActiveTool,
}: NavbarProps) => {
    const { openFilePicker } = useFilePicker({
        accept: '.json',
        onFilesSuccessfullySelected: ({ plainFiles }: any) => {
            if (plainFiles && plainFiles.length > 0) {
                const file = plainFiles[0];
                const reader = new FileReader();
                reader.readAsText(file, 'UTF-8');
                reader.onload = () => {
                    editor?.loadJson(reader.result as string);
                };
            }
        },
    });

    return (
        <nav className="flex h-[68px] w-full items-center gap-x-8 border-b p-4 lg:pl-[34px]">
            <Logo />
            <div className="flex size-full items-center gap-x-1">
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost">
                            File
                            <ChevronDown className="ml-2 size-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="min-w-60">
                        <DropdownMenuItem
                            className="flex items-center gap-x-2"
                            onClick={() => openFilePicker()}
                        >
                            <CiFileOn className="size-8" />
                            <div>
                                <p>Open</p>
                                <p className="text-muted-foreground text-xs">
                                    Open a JSON file
                                </p>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Separator orientation="vertical" className="mx-2" />
                <Hint label="Select" side="bottom" sideOffset={10}>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onChangeActiveTool('select')}
                        className={cn(activeTool === 'select' && 'bg-gray-100')}
                    >
                        <MousePointerClick className="size-4" />
                    </Button>
                </Hint>
                <Hint label="Undo" side="bottom" sideOffset={10}>
                    <Button
                        disabled={!editor?.canUndo()}
                        size="icon"
                        variant="ghost"
                        onClick={() => editor?.onUndo()}
                    >
                        <Undo2 className="size-4" />
                    </Button>
                </Hint>
                <Hint label="redo" side="bottom" sideOffset={10}>
                    <Button
                        disabled={!editor?.canRedo()}
                        size="icon"
                        variant="ghost"
                        onClick={() => editor?.onRedo()}
                    >
                        <Redo2 className="size-4" />
                    </Button>
                </Hint>
                <Separator orientation="vertical" className="mx-2" />
                <div className="flex items-center gap-x-2">
                    <BsCloudCheck className="text-muted-foreground size-[20px]" />
                    <div className="text-muted-foreground text-xs">Saved</div>
                    {/* TODO add states */}
                </div>
            </div>
            <div className="ml-auto flex items-center gap-x-4">
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                            Export
                            <Download className="ml-4 size-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="min-w-60">
                        <DropdownMenuItem
                            className="flex items-center gap-x-2"
                            onClick={() => editor?.saveJson()}
                        >
                            <BsFiletypeJson className="size-8" />
                            <div>
                                <p>JSON</p>
                                <p className="text-muted-foreground text-xs">
                                    Save for later editing
                                </p>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="flex items-center gap-x-2"
                            onClick={() => editor?.savePng()}
                        >
                            <BsFiletypePng className="size-8" />
                            <div>
                                <p>PNG</p>
                                <p className="text-muted-foreground text-xs">
                                    Best for sharing on the web
                                </p>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="flex items-center gap-x-2"
                            onClick={() => editor?.saveJpg()}
                        >
                            <BsFiletypeJpg className="size-8" />
                            <div>
                                <p>JPG</p>
                                <p className="text-muted-foreground text-xs">
                                    Best for printing
                                </p>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="flex items-center gap-x-2"
                            onClick={() => editor?.saveSvg()}
                        >
                            <BsFiletypeSvg className="size-8" />
                            <div>
                                <p>SVG</p>
                                <p className="text-muted-foreground text-xs">
                                    Best for editing in vector software
                                </p>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                {/* TODO add user button */}
            </div>
        </nav>
    );
};
