define([
    'jquery',
    'app/base',
    'app/view'
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