'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { fabric } from 'fabric';
import debounce from 'lodash.debounce';

import { Navbar } from '@/features/editor/components/navbar';
import { Footer } from '@/features/editor/components/footer';
import { useEditor } from '@/features/editor/hooks/use-editor';
import { Sidebar } from '@/features/editor/components/sidebar';
import { Toolbar } from '@/features/editor/components/toolbar';
import { AiSidebar } from '@/features/editor/components/ai-sidebar';
import { ResponseType } from '@/features/projects/api/use-get-project';
import { TextSidebar } from '@/features/editor/components/text-sidebar';
import { FontSidebar } from '@/features/editor/components/font-sidebar';
import { DrawSidebar } from '@/features/editor/components/draw-sidebar';
import { ShapeSidebar } from '@/features/editor/components/shape-sidebar';
import { ImageSidebar } from '@/features/editor/components/image-sidebar';
import { FilterSidebar } from '@/features/editor/components/filter-sidebar';
import { ActiveTool, selectionDependentTools } from '@/features/editor/types';
import { OpacitySidebar } from '@/features/editor/components/opacity-sidebar';
import { useUpdateProject } from '@/features/projects/api/use-update-project';
import { SettingsSidebar } from '@/features/editor/components/settings-sidebar';
import { RemoveBgSidebar } from '@/features/editor/components/remove-bg-sidebar';
import { FillColorSidebar } from '@/features/editor/components/fill-color-sidebar';
import { StrokeColorSidebar } from '@/features/editor/components/stroke-color-sidebar';
import { StrokeWidthSidebar } from '@/features/editor/components/stroke-width-sidebar';

interface EditorProps {
    initialData: ResponseType['data'];
}

export const Editor = ({ initialData }: EditorProps) => {
    const { mutate } = useUpdateProject(initialData.id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSave = useCallback(
        debounce((values: { json: string; height: number; width: number }) => {
            mutate(values);
        }, 500),
        [mutate],
    );

    const [activeTool, setActiveTool] = useState<ActiveTool>('select');

    const onClearSelection = useCallback(() => {
        if (selectionDependentTools.includes(activeTool)) {
            setActiveTool('select');
        }
    }, [activeTool]);

    const { init, editor } = useEditor({
        defaultState: initialData.json,
        defaultWidth: initialData.width,
        defaultHeight: initialData.height,
        clearSelectionCallback: onClearSelection,
        saveCallback: debouncedSave,
    });

    const onChangeActiveTool = useCallback(
        (tool: ActiveTool) => {
            if (tool === activeTool) {
                return setActiveTool('select');
            }

            if (tool === 'draw') {
                editor?.enableDrawingMod();
            }

            if (activeTool === 'draw') {
                editor?.disableDrawingMod();
            }

            setActiveTool(tool);
        },
        [activeTool, editor],
    );

    const canvasRef = useRef(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = new fabric.Canvas(canvasRef.current, {
            controlsAboveOverlay: true,
            preserveObjectStacking: true,
        });

        init({
            initialCanvas: canvas,
            initialContainer: containerRef.current!,
        });

        return () => {
            canvas.dispose();
        };
    }, [init]);

    return (
        <div className="flex h-full flex-col">
            <Navbar
                id={initialData.id}
                editor={editor}
                activeTool={activeTool}
                onChangeActiveTool={onChangeActiveTool}
            />
            <div className="absolute top-[68px] flex h-[calc(100%-68px)] w-full">
                <Sidebar
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <ImageSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <FilterSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <TextSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <ShapeSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <FillColorSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <StrokeColorSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <StrokeWidthSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <OpacitySidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <FontSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <DrawSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <AiSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <RemoveBgSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <SettingsSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <main className="bg-muted relative flex flex-1 flex-col overflow-auto">
                    <Toolbar
                        key={JSON.stringify(editor?.canvas.getActiveObjects())}
                        editor={editor}
                        activeTool={activeTool}
                        onChangeActiveTool={onChangeActiveTool}
                    />
                    <div
                        className="bg-muted h-[calc(100%-124px)] flex-1"
                        ref={containerRef}
                    >
                        <canvas ref={canvasRef} />
                    </div>
                    <Footer editor={editor} />
                </main>
            </div>
        </div>
    );
};
