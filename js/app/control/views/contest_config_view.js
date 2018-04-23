define([
    'app/view',
    'text!../templates/contest_config_view_template.jst'
], function(View, ContestConfigViewTemplate) {
    
    class ContestConfigView extends View {

        constructor() {
            super(ContestConfigViewTemplate);
        }
    };

    return ContestConfigView;
});