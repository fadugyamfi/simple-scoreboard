define([
    'jquery',
    'lib/base'
], function($, Base) {
    
    class Region extends Base {

        constructor(element) {
            super(element);
        }

        show(view) {
            $(this.element).html( view.render() );
        }
    };

    return Region;
});