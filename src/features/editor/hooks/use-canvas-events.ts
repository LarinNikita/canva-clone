import { useEffect } from 'react';

import { fabric } from 'fabric';

interface UseCanvasEventsProps {
    canvas: fabric.Canvas | null;
    save: () => void;
    setSelectedObjects: (objects: fabric.Object[]) => void;
    clearSelectionCallback?: () => void;
}

export const useCanvasEvents = ({
    canvas,
    save,
    setSelectedObjects,
    clearSelectionCallback,
}: UseCanvasEventsProps) => {
    useEffect(() => {
        if (canvas) {
            canvas.on('selection:created', e => {
                setSelectedObjects(e.selected || []);
            });
            canvas.on('selection:updated', e => {
                setSelectedObjects(e.selected || []);
            });
            canvas.on('selection:cleared', e => {
                setSelectedObjects([]);
                clearSelectionCallback?.();
            });
            canvas.on('object:added', () => save());
            canvas.on('object:removed', () => save());
            canvas.on('object:modified', () => save());
        }

        return () => {
            if (canvas) {
                canvas.off('selection:created');
                canvas.off('selection:updated');
                canvas.off('selection:cleared');
                canvas.off('object:added');
                canvas.off('object:removed');
                canvas.off('object:modified');
            }
        };
    }, [canvas, save, setSelectedObjects, clearSelectionCallback]);
};
