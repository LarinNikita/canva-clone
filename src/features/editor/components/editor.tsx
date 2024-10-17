'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { fabric } from 'fabric';

import { Navbar } from '@/features/editor/components/navbar';
import { Footer } from '@/features/editor/components/footer';
import { useEditor } from '@/features/editor/hooks/use-editor';
import { Sidebar } from '@/features/editor/components/sidebar';
import { Toolbar } from '@/features/editor/components/toolbar';
import { ShapeSidebar } from '@/features/editor/components/shape-sidebar';
import { ActiveTool, selectionDependentTools } from '@/features/editor/types';
import { FillColorSidebar } from '@/features/editor/components/fill-color-sidebar';
import { StrokeColorSidebar } from '@/features/editor/components/stroke-color-sidebar';

export const Editor = () => {
    const [activeTool, setActiveTool] = useState<ActiveTool>('select');

    const onChangeActiveTool = useCallback(
        (tool: ActiveTool) => {
            if (tool === activeTool) {
                return setActiveTool('select');
            }

            if (tool === 'draw') {
                // TODO Enable drawing mode
            }

            if (activeTool === 'draw') {
                // TODO Disable drawing mode
            }

            setActiveTool(tool);
        },
        [activeTool],
    );

    const onClearSelection = useCallback(() => {
        if (selectionDependentTools.includes(activeTool)) {
            setActiveTool('select');
        }
    }, [activeTool]);

    const { init, editor } = useEditor({
        clearSelectionCallback: onClearSelection,
    });

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
                activeTool={activeTool}
                onChangeActiveTool={onChangeActiveTool}
            />
            <div className="absolute top-[68px] flex h-[calc(100%-68px)] w-full">
                <Sidebar
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
                    <Footer />
                </main>
            </div>
        </div>
    );
};
