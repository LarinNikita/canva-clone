import { useEffect } from 'react';

import { fabric } from 'fabric';

interface UseCanvasEventsProps {
    canvas: fabric.Canvas | null;
    setSelectedObjects: (objects: fabric.Object[]) => void;
}

export const useCanvasEvents = ({
    canvas,
    setSelectedObjects,
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
            });
        }

        return () => {
            if (canvas) {
                canvas.off('selection:created');
                canvas.off('selection:updated');
                canvas.off('selection:cleared');
            }
        };
    }, [canvas, setSelectedObjects]);
};
