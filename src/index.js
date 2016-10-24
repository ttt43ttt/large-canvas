(function () {

    var LargeCanvas = (function () {
        function LargeCanvas(width, height) {
            this.width = width;
            this.height = height;

            this.context = createContext();
        }

        function createContext() {

        }

        LargeCanvas.prototype = {
            getContext: function () {
                return this.context;
            }
        };

        return LargeCanvas;
    })();

    // an offscreen canvas
    var offscreen = document.createElement('canvas');

    function module() {

    }

    module.create = function (width, height) {
        return new LargeCanvas(width, height);
    };

    /**
     * Check whether the canvas can be rendered according to the given width and height.
     */
    function isSizeCanRender(width, height) {
        // if width or height is less than 1px, we treat that the canvas can render
        if (!(width >= 1 && height >= 1)) {
            return true;
        }

        offscreen.width = width;
        offscreen.height = height;

        var ctx = offscreen.getContext('2d');
        ctx.fillRect(0, 0, 1, 1);

        return hasColor(ctx);
    }

    function hasColor(context) {
        var imageData = context.getImageData(0, 0, 1, 1);
        var data = imageData.data;
        var alpha = data[3];
        // the default alpha value is 0
        return alpha !== 0;
    }

    return module;
})();