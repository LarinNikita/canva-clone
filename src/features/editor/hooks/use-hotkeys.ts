import { fabric } from 'fabric';
import { useEvent } from 'react-use';

interface UseHotkeysProps {
    canvas: fabric.Canvas | null;
    undo: () => void;
    redo: () => void;
    save: (skip?: boolean) => void;
    copy: () => void;
    paste: () => void;
}

export const useHotkeys = ({
    canvas,
    undo,
    redo,
    save,
    copy,
    paste,
}: UseHotkeysProps) => {
    useEvent('keydown', event => {
        const isCtrlKey = event.ctrlKey || event.metaKey;
        const isBackspaceKey = event.key === 'Backspace';
        const isInput = ['INPUT', 'TEXTAREA'].includes(
            (event.target as HTMLLIElement).tagName,
        );

        if (isInput) return;

        if (isBackspaceKey) {
            canvas?.remove(...canvas.getActiveObjects());
            canvas?.discardActiveObject();
        }

        if (isCtrlKey && event.key === 'z') {
            event.preventDefault();
            undo();
        }

        if (isCtrlKey && event.key === 'y') {
            event.preventDefault();
            redo();
        }

        if (isCtrlKey && event.key === 'c') {
            event.preventDefault();
            copy();
        }

        if (isCtrlKey && event.key === 'v') {
            event.preventDefault();
            paste();
        }

        if (isCtrlKey && event.key === 's') {
            event.preventDefault();
            save(true); //* Save in database
        }

        if (isCtrlKey && event.key === 'a') {
            event.preventDefault();
            canvas?.discardActiveObject();

            const allObjects = canvas
                ?.getObjects()
                .filter(object => object.selectable);

            canvas?.setActiveObject(
                new fabric.ActiveSelection(allObjects, { canvas }),
            );

            canvas?.renderAll();
        }
    });
};
