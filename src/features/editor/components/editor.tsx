'use client';

import { useEffect, useRef } from 'react';

import { fabric } from 'fabric';

import { useEditor } from '@/features/editor/hooks/use-editor';

export const Editor = () => {
    const { init } = useEditor();

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
    }, [init]);

    return (
        <div className="flex h-full flex-col">
            <div className="bg-muted h-full flex-1" ref={containerRef}>
                <canvas ref={canvasRef} />
            </div>
        </div>
    );
};
