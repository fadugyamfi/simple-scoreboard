define([
    'lib/base',
    'lib/region',
    'mustache/mustache'
], function(Base, Region, Mustache) {

    class View extends Base {

        constructor(template, element) {
            super(element, null);

            this.regions = {};
            this.template = template;
        }

        getRegion(key) {
            var region = null;

            if( typeof this.regions[key] != 'undefined' ) {
                region = new Region(this.regions[key]);
            }

            return region;
        }

        render() {
            Mustache.parse(this.template);
            var rendered = Mustache.render(this.template, this);

            if( this.element ) {
                document.querySelector(this.element).innerHTML = rendered;
            }

            this.onRender(rendered);
            this.trigger('render', rendered);

            return rendered;
        }

        /**
         * Can be overridden to listen for render changes
         */
        onRender() {

        }
    };

    return View;
});
