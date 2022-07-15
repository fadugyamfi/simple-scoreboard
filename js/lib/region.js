define([
    'jquery',
    'lib/base'
], function($, Base) {

    class Region extends Base {

        constructor(element) {
            super(element);
        }

        show(view) {
            document.querySelector(this.element).innerHtml = view.render();
        }
    };

    return Region;
});
