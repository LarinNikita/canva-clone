import { useCallback, useMemo, useState } from 'react';

import { fabric } from 'fabric';

import { isTextType } from '@/features/editor/utils';
import { useAutoResize } from '@/features/editor/hooks/use-auto-resize';
import { useCanvasEvents } from '@/features/editor/hooks/use-canvas-events';
import {
    BuildEditorProps,
    CIRCLE_OPTIONS,
    DIAMOND_OPTIONS,
    Editor,
    EditorHookProps,
    FILL_COLOR,
    FONT_FAMILY,
    FONT_SIZE,
    FONT_WEIGHT,
    RECTANGLE_OPTIONS,
    STROKE_COLOR,
    STROKE_DASH_ARRAY,
    STROKE_WIDTH,
    TEXT_OPTIONS,
    TRIANGLE_OPTIONS,
} from '@/features/editor/types';

const buildEditor = ({
    canvas,
    fontFamily,
    fillColor,
    strokeColor,
    strokeWidth,
    strokeDashArray,
    setFontFamily,
    setFillColor,
    setStrokeColor,
    setStrokeWidth,
    selectedObjects,
    setStrokeDashArray,
}: BuildEditorProps): Editor => {
    const getWorkplace = () => {
        return canvas.getObjects().find(object => object.name === 'clip');
    };

    const center = (object: fabric.Object) => {
        const workplace = getWorkplace();
        const center = workplace?.getCenterPoint();

        if (!center) return;

        // @ts-ignore
        canvas._centerObject(object, center); //* Данный метод позволяет создавать элемент в центре холста с указанием переменой
        // canvas.centerObject(object);
    };

    const addToCanvas = (object: fabric.Object) => {
        center(object);
        canvas.add(object);
        canvas.setActiveObject(object);
    };

    return {
        bringForward: () => {
            canvas.getActiveObjects().forEach(object => {
                canvas.bringForward(object);
            });

            canvas.renderAll();

            const workplace = getWorkplace();
            workplace?.sendToBack();
        },
        sendBackwards: () => {
            canvas.getActiveObjects().forEach(object => {
                canvas.sendBackwards(object);
            });

            canvas.renderAll();

            const workplace = getWorkplace();
            workplace?.sendToBack();
        },
        delete: () => {
            canvas.getActiveObjects().forEach(object => canvas.remove(object));
            canvas.discardActiveObject();
            canvas.renderAll();
        },
        addText: (value, options) => {
            const object = new fabric.Textbox(value, {
                ...TEXT_OPTIONS,
                fill: fillColor,
                ...options,
            });

            addToCanvas(object);
        },
        addCircle: () => {
            const object = new fabric.Circle({
                ...CIRCLE_OPTIONS,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeDashArray,
            });

            addToCanvas(object);
        },
        addSoftRectangle: () => {
            const object = new fabric.Rect({
                ...RECTANGLE_OPTIONS,
                rx: 50,
                ry: 50,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeDashArray,
            });

            addToCanvas(object);
        },
        addRectangle: () => {
            const object = new fabric.Rect({
                ...RECTANGLE_OPTIONS,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeDashArray,
            });

            addToCanvas(object);
        },
        addTriangle: () => {
            const object = new fabric.Triangle({
                ...TRIANGLE_OPTIONS,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeDashArray,
            });

            addToCanvas(object);
        },
        addInverseTriangle: () => {
            //? Если использовать данный метод, то selection box тоже будут перевернута
            // const object = new fabric.Triangle({
            //     ...TRIANGLE_OPTIONS,
            //     angle: 180,
            // });

            const WIDTH = TRIANGLE_OPTIONS.width;
            const HEIGHT = TRIANGLE_OPTIONS.height;

            const object = new fabric.Polygon(
                [
                    { x: 0, y: 0 },
                    { x: WIDTH, y: 0 },
                    { x: WIDTH / 2, y: HEIGHT },
                ],
                {
                    ...TRIANGLE_OPTIONS,
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeDashArray,
                },
            );

            addToCanvas(object);
        },
        addDiamond: () => {
            const WIDTH = DIAMOND_OPTIONS.width;
            const HEIGHT = DIAMOND_OPTIONS.height;

            const object = new fabric.Polygon(
                [
                    { x: WIDTH / 2, y: 0 },
                    { x: WIDTH, y: HEIGHT / 2 },
                    { x: WIDTH / 2, y: HEIGHT },
                    { x: 0, y: HEIGHT / 2 },
                ],
                {
                    ...DIAMOND_OPTIONS,
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeDashArray,
                },
            );

            addToCanvas(object);
        },
        changeFontFamily: value => {
            setFontFamily(value);
            canvas.getActiveObjects().forEach(object => {
                if (isTextType(object.type)) {
                    // @ts-ignore
                    object.set({ fontFamily: value });
                }
            });
            canvas.renderAll();
        },
        changeFontStyle: value => {
            canvas.getActiveObjects().forEach(object => {
                if (isTextType(object.type)) {
                    // @ts-ignore
                    object.set({ fontStyle: value });
                }
            });
            canvas.renderAll();
        },
        changeFontWeight: value => {
            canvas.getActiveObjects().forEach(object => {
                if (isTextType(object.type)) {
                    // @ts-ignore
                    object.set({ fontWeight: value });
                }
            });
            canvas.renderAll();
        },
        changeTextLinethrough: value => {
            canvas.getActiveObjects().forEach(object => {
                if (isTextType(object.type)) {
                    // @ts-ignore
                    object.set({ linethrough: value });
                }
            });
            canvas.renderAll();
        },
        changeTextUnderline: value => {
            canvas.getActiveObjects().forEach(object => {
                if (isTextType(object.type)) {
                    // @ts-ignore
                    object.set({ underline: value });
                }
            });
            canvas.renderAll();
        },
        changeTextAlign: value => {
            canvas.getActiveObjects().forEach(object => {
                if (isTextType(object.type)) {
                    // @ts-ignore
                    object.set({ textAlign: value });
                }
            });
            canvas.renderAll();
        },
        changeFontSize: value => {
            canvas.getActiveObjects().forEach(object => {
                if (isTextType(object.type)) {
                    // @ts-ignore
                    object.set({ fontSize: value });
                }
            });
            canvas.renderAll();
        },
        changeFillColor: value => {
            setFillColor(value);
            canvas.getActiveObjects().forEach(object => {
                object.set({ fill: value });
            });
            canvas.renderAll();
        },
        changeStrokeColor: value => {
            setStrokeColor(value);
            canvas.getActiveObjects().forEach(object => {
                //* Text types don't have stroke
                if (isTextType(object.type)) {
                    object.set({ fill: value });
                    return;
                }

                object.set({ stroke: value });
            });
            canvas.renderAll();
        },
        changeStrokeWidth: value => {
            setStrokeWidth(value);
            canvas.getActiveObjects().forEach(object => {
                object.set({ strokeWidth: value });
            });
            canvas.renderAll();
        },
        changeStrokeDashArray: value => {
            setStrokeDashArray(value);
            canvas.getActiveObjects().forEach(object => {
                object.set({ strokeDashArray: value });
            });
            canvas.renderAll();
        },
        changeOpacity: value => {
            canvas.getActiveObjects().forEach(object => {
                object.set({ opacity: value });
            });

            canvas.renderAll();
        },
        getActiveFontStyle: () => {
            const selectedObject = selectedObjects[0];

            if (!selectedObject) {
                return 'normal';
            }

            // @ts-ignore
            const value = selectedObject.get('fontStyle') || 'normal';

            return value as string;
        },
        getActiveFontFamily: () => {
            const selectedObject = selectedObjects[0];

            if (!selectedObject) {
                return fontFamily;
            }

            // @ts-ignore
            const value = selectedObject.get('fontFamily') || fontFamily;

            return value as string;
        },
        getActiveFontWeight: () => {
            const selectedObject = selectedObjects[0];

            if (!selectedObject) {
                return FONT_WEIGHT;
            }

            // @ts-ignore
            const value = selectedObject.get('fontWeight') || FONT_WEIGHT;

            return value;
        },
        getActiveTextLinethrough: () => {
            const selectedObject = selectedObjects[0];

            if (!selectedObject) {
                return false;
            }

            // @ts-ignore
            const value = selectedObject.get('linethrough') || false;

            return value;
        },
        getActiveTextUnderline: () => {
            const selectedObject = selectedObjects[0];

            if (!selectedObject) {
                return false;
            }

            // @ts-ignore
            const value = selectedObject.get('underline') || false;

            return value;
        },
        getActiveTextAlign: () => {
            const selectedObject = selectedObjects[0];

            if (!selectedObject) {
                return 'left';
            }

            // @ts-ignore
            const value = selectedObject.get('textAlign') || 'left';

            return value;
        },
        getActiveFontSize: () => {
            const selectedObject = selectedObjects[0];

            if (!selectedObject) {
                return FONT_SIZE;
            }

            // @ts-ignore
            const value = selectedObject.get('fontSize') || FONT_SIZE;

            return value;
        },
        getActiveFillColor: () => {
            const selectedObject = selectedObjects[0];

            if (!selectedObject) {
                return fillColor;
            }

            const value = selectedObject.get('fill') || fillColor;

            //! Currently, gradients & patterns ara not supported
            return value as string;
        },
        getActiveStrokeColor: () => {
            const selectedObject = selectedObjects[0];

            if (!selectedObject) {
                return strokeColor;
            }

            const value = selectedObject.get('stroke') || strokeColor;

            return value;
        },
        getActiveStrokeWidth: () => {
            const selectedObject = selectedObjects[0];

            if (!selectedObject) {
                return strokeWidth;
            }

            const value = selectedObject.get('strokeWidth') || strokeWidth;

            return value;
        },
        getActiveStrokeDashArray: () => {
            const selectedObject = selectedObjects[0];

            if (!selectedObject) {
                return strokeDashArray;
            }

            const value =
                selectedObject.get('strokeDashArray') || strokeDashArray;

            return value;
        },
        getActiveOpacity: () => {
            const selectedObject = selectedObjects[0];

            if (!selectedObject) {
                return 1;
            }

            const value = selectedObject.get('opacity') || 1;

            return value;
        },
        canvas,
        selectedObjects,
    };
};

export const useEditor = ({ clearSelectionCallback }: EditorHookProps) => {
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);

    const [fontFamily, setFontFamily] = useState(FONT_FAMILY);

    const [fillColor, setFillColor] = useState(FILL_COLOR);
    const [strokeColor, setStrokeColor] = useState(STROKE_COLOR);
    const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);
    const [strokeDashArray, setStrokeDashArray] =
        useState<number[]>(STROKE_DASH_ARRAY);

    useAutoResize({ canvas, container });

    useCanvasEvents({ canvas, setSelectedObjects, clearSelectionCallback });

    const editor = useMemo(() => {
        if (canvas) {
            return buildEditor({
                canvas,
                fontFamily,
                fillColor,
                strokeColor,
                strokeWidth,
                strokeDashArray,
                setFontFamily,
                setFillColor,
                setStrokeColor,
                setStrokeWidth,
                setStrokeDashArray,
                selectedObjects,
            });
        }

        return undefined;
    }, [
        canvas,
        fontFamily,
        fillColor,
        strokeColor,
        strokeWidth,
        strokeDashArray,
        selectedObjects,
    ]);

    const init = useCallback(
        ({
            initialCanvas,
            initialContainer,
        }: {
            initialCanvas: fabric.Canvas;
            initialContainer: HTMLDivElement;
        }) => {
            fabric.Object.prototype.set({
                cornerColor: '#FFF',
                cornerStyle: 'circle',
                borderColor: '#3b82f6',
                borderScaleFactor: 1.5,
                transparentCorners: false,
                borderOpacityWhenMoving: 1,
                cornerStrokeColor: '#3b82f6',
            });

            const initialWorkspace = new fabric.Rect({
                width: 900,
                height: 1200,
                name: 'clip',
                fill: 'white',
                selectable: false,
                hasControls: false,
                shadow: new fabric.Shadow({
                    color: 'rgba(0,0,0,0.8)',
                    blur: 5,
                }),
            });

            initialCanvas.setWidth(initialContainer.offsetWidth);
            initialCanvas.setHeight(initialContainer.offsetHeight);

            initialCanvas.add(initialWorkspace);
            initialCanvas.centerObject(initialWorkspace);
            initialCanvas.clipPath = initialWorkspace;

            setCanvas(initialCanvas);
            setContainer(initialContainer);
        },
        [],
    );

    return { init, editor };
};
