import { fabric } from 'fabric';
import * as material from 'material-colors';
import { ITextboxOptions } from 'fabric/fabric-impl';

export const filters = [
    'none',
    'polaroid',
    'sepia',
    'kodachrome',
    'contrast',
    'brightness',
    'greyscale',
    'brownie',
    'vintage',
    'technicolor',
    'pixelate',
    'invert',
    'blur',
    'sharpen',
    'emboss',
    'removecolor',
    'blacknwhite',
    'vibrance',
    'blendcolor',
    'huerotate',
    'resize',
    'saturation',
    'gamma',
];

export const fonts = [
    'Arial',
    'Arial Black',
    'Verdana',
    'Helvetica',
    'Tahoma',
    'Trebuchet MS',
    'Times New Roman',
    'Georgia',
    'Garamond',
    'Courier New',
    'Brush Script MT',
    'Palatino',
    'Bookman',
    'Comic Sans MS',
    'Impact',
    'Lucida Sans Unicode',
    'Geneva',
    'Lucida Console',
];

export const selectionDependentTools = [
    'fill',
    'font',
    'filter',
    'opacity',
    'remove-bg',
    'stroke-color',
    'stroke-width',
];

export const colors = [
    material.red[500],
    material.pink[500],
    material.purple[500],
    material.deepPurple[500],
    material.indigo[500],
    material.blue[500],
    material.lightBlue[500],
    material.cyan[500],
    material.teal[500],
    material.green[500],
    material.lightGreen[500],
    material.lime[500],
    material.yellow[500],
    material.amber[500],
    material.orange[500],
    material.deepOrange[500],
    material.brown[500],
    material.grey[500],
    'transparent',
];

export type ActiveTool =
    | 'select'
    | 'shapes'
    | 'text'
    | 'images'
    | 'draw'
    | 'fill'
    | 'stroke-color'
    | 'stroke-width'
    | 'font'
    | 'opacity'
    | 'filter'
    | 'settings'
    | 'ai'
    | 'remove-bg'
    | 'templates';

export const FILL_COLOR = 'rgba(0,0,0,1)';
export const STROKE_COLOR = 'rgba(0,0,0,1)';
export const STROKE_WIDTH = 2;
export const STROKE_DASH_ARRAY = [];
export const FONT_FAMILY = 'Arial';
export const FONT_SIZE = 32;
export const FONT_WEIGHT = 400;

export const TEXT_OPTIONS = {
    type: 'textbox',
    left: 100,
    top: 100,
    fill: FILL_COLOR,
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZE,
};

export const CIRCLE_OPTIONS = {
    radius: 225,
    left: 100,
    top: 100,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH,
};

export const RECTANGLE_OPTIONS = {
    left: 100,
    top: 100,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH,
    width: 400,
    height: 400,
    angle: 0,
};

export const TRIANGLE_OPTIONS = {
    left: 100,
    top: 100,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH,
    width: 400,
    height: 400,
    angle: 0,
};

export const DIAMOND_OPTIONS = {
    left: 100,
    top: 100,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH,
    width: 600,
    height: 600,
    angle: 0,
};

export type EditorProps<T> = {
    canvas: fabric.Canvas;
    selectedObjects: fabric.Object[];
};

export interface BuildEditorProps extends EditorProps<{}> {
    fontFamily: string;
    fillColor: string;
    strokeColor: string;
    strokeWidth: number;
    strokeDashArray: number[];
    setFontFamily: (value: string) => void;
    setFillColor: (value: string) => void;
    setStrokeColor: (value: string) => void;
    setStrokeWidth: (value: number) => void;
    setStrokeDashArray: (value: number[]) => void;
}

export interface Editor extends EditorProps<Editor> {
    bringForward: () => void;
    sendBackwards: () => void;
    getActiveFontFamily: () => string;
    getActiveFontStyle: () => string;
    getActiveFontWeight: () => number;
    getActiveTextLinethrough: () => boolean;
    getActiveTextUnderline: () => boolean;
    getActiveTextAlign: () => string;
    getActiveFontSize: () => number;
    getActiveFillColor: () => string;
    getActiveStrokeColor: () => string;
    getActiveStrokeWidth: () => number;
    getActiveStrokeDashArray: () => number[];
    getActiveOpacity: () => number;
    addImage: (value: string) => void;
    addText: (value: string, options?: ITextboxOptions) => void;
    addCircle: () => void;
    addSoftRectangle: () => void;
    addRectangle: () => void;
    addTriangle: () => void;
    addInverseTriangle: () => void;
    addDiamond: () => void;
    delete: () => void;
    changeFontFamily: (value: string) => void;
    changeFontStyle: (value: string) => void;
    changeTextLinethrough: (value: boolean) => void;
    changeTextUnderline: (value: boolean) => void;
    changeFontWeight: (value: number) => void;
    changeTextAlign: (value: string) => void;
    changeFontSize: (value: number) => void;
    changeStrokeWidth: (value: number) => void;
    changeFillColor: (value: string) => void;
    changeStrokeColor: (value: string) => void;
    changeStrokeDashArray: (value: number[]) => void;
    changeOpacity: (value: number) => void;
    changeImageFilter: (value: string) => void;
}

export interface EditorHookProps {
    clearSelectionCallback?: () => void;
}
