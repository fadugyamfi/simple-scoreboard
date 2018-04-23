
define([], function() {

    class Base {

        constructor(element, events, listeners) {
            this.element = element;
            this._events = events || {};
            this.listeners = listeners || {};
            this.callbacks = {};

            this.bindEvents();
            this.bindListeners();
        }

        set events(events) {
            this._events = events;
            this.bindEvents();
        }

        bindEvents() {
            var module = this;
            var events = module._events;

            $.each(events, function(e, v) {
                var func = v;
                
                var key_pcs = e.split(' ');
                var trigger = key_pcs[0];
                
                key_pcs.splice(0, 1);
                
                var element = key_pcs.join(" ");
                var mod_element = module.element ? module.element : 'body';
    
                $(mod_element).on(trigger, element, function(ev) {
                    var args = arguments;
                    
                    if( module[func] ) {
                        $(element).each(function() {
                            if( this == ev.currentTarget ) {
                                module[func].apply(module, args);
                            }
                        });
                    }
                });
            });
        }

        bindListeners() {
            var module = this;
            var listeners = module.listeners;
        
            $.each(listeners, function(key, func) {
                if( $.isFunction() ) {
                    module.listen(key, func);
                }

                else {
                    module.listen(key, function() {
                        module[func].apply(module, arguments);
                    });
                }
            });
        }
        
        /**
         * Registers a callback method based on the type
         * 
         * @param type the type of the callback, e.g. add
         * @param func the function to be used as the callback
         */
        on(type, func) {
            if( this.callbacks[type] == null ) {
                this.callbacks[type] = [];
            }
            
            this.callbacks[type].push(func);
        }
        
        /**
         * Fires all callbacks of a specified type and passes any other arguments 
         * to the callbacks for use
         */
        trigger() {
            var i = 0, j = 1, args = [], type = arguments[0];
            
            for(i = 0; i < arguments.length; i++, j++) {
                args[i] = arguments[j];
            }
            
            if( this.callbacks[type] ) {
                for(i = 0; i < this.callbacks[type].length; i++ ){
                    this.callbacks[type][i].apply(this, args);
                }
            }
        }
    };

    return Base;
});