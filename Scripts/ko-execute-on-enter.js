/// <reference path="knockout-2.3.0.debug.js" />
/// <reference path="jquery-1.8.2.js" />

ko.bindingHandlers.executeOnEnter = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = valueAccessor();
        $(element).keypress(function (event) {
            if (event.which === 13) {
                value.call(viewModel);
                return false;
            }
            return true;
        });
    }
};