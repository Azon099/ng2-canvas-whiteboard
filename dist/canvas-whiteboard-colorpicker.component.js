"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CanvasWhiteboardColorPickerComponent = (function () {
    function CanvasWhiteboardColorPickerComponent(_elementRef) {
        this._elementRef = _elementRef;
        this.selectedColor = "rgb(0,0,0)";
        this._showColorPicker = false;
        this.onColorSelected = new core_1.EventEmitter();
    }
    /**
     * Initialize the canvas drawing context. If we have an aspect ratio set up, the canvas will resize
     * according to the aspect ratio.
     */
    CanvasWhiteboardColorPickerComponent.prototype.ngOnInit = function () {
        this._context = this.canvas.nativeElement.getContext("2d");
        this.createColorPalette();
    };
    CanvasWhiteboardColorPickerComponent.prototype.createColorPalette = function () {
        var gradient = this._context.createLinearGradient(0, 0, this._context.canvas.width, 0);
        gradient.addColorStop(0, "rgb(255,   0,   0)");
        gradient.addColorStop(0.15, "rgb(255,   0, 255)");
        gradient.addColorStop(0.33, "rgb(0,     0, 255)");
        gradient.addColorStop(0.49, "rgb(0,   255, 255)");
        gradient.addColorStop(0.67, "rgb(0,   255,   0)");
        gradient.addColorStop(0.84, "rgb(255, 255,   0)");
        gradient.addColorStop(1, "rgb(255,   0,   0)");
        this._context.fillStyle = gradient;
        this._context.fillRect(0, 0, this._context.canvas.width, this._context.canvas.height);
        //Add white -> transparent -> black
        gradient = this._context.createLinearGradient(0, 0, 0, this._context.canvas.height);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(0.5, "rgba(0,     0,   0, 0)");
        gradient.addColorStop(1, "rgba(0,     0,   0, 1)");
        this._context.fillStyle = gradient;
        this._context.fillRect(0, 0, this._context.canvas.width, this._context.canvas.height);
    };
    CanvasWhiteboardColorPickerComponent.prototype._closeOnExternalClick = function (event) {
        if (!this._elementRef.nativeElement.contains(event.target) && this._showColorPicker) {
            this._showColorPicker = false;
        }
    };
    CanvasWhiteboardColorPickerComponent.prototype.toggleColorPicker = function (event) {
        if (event) {
            event.preventDefault();
        }
        this._showColorPicker = !this._showColorPicker;
    };
    CanvasWhiteboardColorPickerComponent.prototype._getColor = function (event) {
        var canvasRect = this._context.canvas.getBoundingClientRect();
        var imageData = this._context.getImageData(event.clientX - canvasRect.left, event.clientY - canvasRect.top, 1, 1);
        var selectedColor = 'rgb(' + imageData.data[0] + ', ' + imageData.data[1] + ', ' + imageData.data[2] + ')';
        console.log(imageData);
        console.log(selectedColor);
        return selectedColor;
    };
    CanvasWhiteboardColorPickerComponent.prototype._selectColor = function (event) {
        console.log(event);
        this.selectedColor = this._getColor(event);
        this.onColorSelected.emit(this.selectedColor);
        this.toggleColorPicker(null);
    };
    return CanvasWhiteboardColorPickerComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CanvasWhiteboardColorPickerComponent.prototype, "selectedColor", void 0);
__decorate([
    core_1.ViewChild('canvaswhiteboardcolorpicker'),
    __metadata("design:type", core_1.ElementRef)
], CanvasWhiteboardColorPickerComponent.prototype, "canvas", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], CanvasWhiteboardColorPickerComponent.prototype, "onColorSelected", void 0);
CanvasWhiteboardColorPickerComponent = __decorate([
    core_1.Component({
        selector: 'canvas-whiteboard-colorpicker',
        host: {
            '(document:mousedown)': '_closeOnExternalClick($event)',
            '(document:touchstart)': '_closeOnExternalClick($event)',
        },
        template: "\n        <input [style.background]=\"selectedColor\" [hidden]=\"_showColorPicker\" class=\"canvas-whiteboard-colorpicker-input\" (click)=\"toggleColorPicker($event)\"/>\n        <canvas #canvaswhiteboardcolorpicker [hidden]=\"!_showColorPicker\" class=\"canvas-whiteboard-colorpicker\" width=\"284\" height=\"155\"\n          (click)=\"_selectColor($event)\"></canvas>\n    ",
        styles: ["\n        .canvas-whiteboard-colorpicker {\n            position: absolute;\n            top: 0;\n            right: 100%;\n        }\n        .canvas-whiteboard-colorpicker-input {\n            width: 30px;\n            height: 30px;\n        }\n    "]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], CanvasWhiteboardColorPickerComponent);
exports.CanvasWhiteboardColorPickerComponent = CanvasWhiteboardColorPickerComponent;
//# sourceMappingURL=canvas-whiteboard-colorpicker.component.js.map