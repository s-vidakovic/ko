/// <reference path="knockout-2.3.0.debug.js" />
/// <reference path="jquery-ui-1.8.24.js" />
/// <reference path="jquery-1.8.2.js" />
//// <reference path="jquery.js" />
/// <reference path="ajax-util.js" />
/// <reference path="ko-protected-observable.js"/>

/* -- OBSERVABLE AND DEPENDENT OBSERVABLE -- $(function () {

    var viewModel = {
        //regular observable
        name: ko.observable('Bob'),
        //lastName: ko.observable('Bowl'),
        changeName: function () {
            this.name('John');
        },
        nameVisible: ko.observable(true)
    };
 
    //dependent observable or computed
    //viewModel.fullName = ko.computed(function () {
      //  return this.name() + " " + this.lastName();
    //}, viewModel);

    viewModel.displayName = ko.dependentObservable(function () {
        return this.name() + " is" + (!this.nameVisible() ? " not" : "") + " visible";
    }, viewModel);

    ko.applyBindings(viewModel);
});*/

/* old school templating -  NE ISPISUJE KAKO TREBA 
$(function () {

    //hard coded array
    var data = [
        { Id: 1, Name: "Ball Handling" },
        { Id: 2, Name: "Passing" },
        { Id: 3, Name: "Shooting" },
        { Id: 4, Name: "Rebounding" },
        { Id: 5, Name: "Transition" },
        { Id: 6, Name: "Defense" },
        { Id: 7, Name: "Team Offense" },
        { Id: 8, Name: "Team Defense" }
    ];

    var viewModel = {
        //data
        tags: ko.observableArray(data),
        tagToAdd: ko.observable(""),

        //behaviors
        addTag: function () {
            this.tags.push({ Name: this.tagToAdd() });
        }
    };
    ko.applyBindings(viewModel);
    });*/

/*OPTIMIZACIJA TEMPLATE-A SA FOREACH-OM - NE RADI
$(function () {

    //hard coded array
    var data = [
        { Id: 1, Name: "Ball Handling" },
        { Id: 2, Name: "Passing" },
        { Id: 3, Name: "Shooting" },
        { Id: 4, Name: "Rebounding" },
        { Id: 5, Name: "Transition" },
        { Id: 6, Name: "Defense" },
        { Id: 7, Name: "Team Offense" },
        { Id: 8, Name: "Team Defense" }
    ];

    var viewModel = {
        //data
        tags: ko.observableArray(data),
        tagToAdd: ko.observable(""),

        //behaviors
        addTag: function () {
            this.tags.push({ Name: this.tagToAdd() });
            this.tagToAdd("");
        }
    };
    ko.applyBindings(viewModel);
});*/

/* BEZ JQUERY REFERENCE*/
$(function () {
    $('#tagDialog').hide();

    //hard coded array - kada na edit editujemo nesto izmena se nece prikazati u UI jer ovo nije observable niz
    //ovim nizom mozemo da imamo uvid u to da li je element niza dodat ili uklonjem
    //ali ne mozemo da imamo uvid u izmene pojedinacnih elemenata 
    var data = [
        { Id: 1, Name: "Ball Handling" },
        { Id: 2, Name: "Passing" },
        { Id: 3, Name: "Shooting" },
        { Id: 4, Name: "Rebounding" },
        { Id: 5, Name: "Transition" },
        { Id: 6, Name: "Defense" },
        { Id: 7, Name: "Team Offense" },
        { Id: 8, Name: "Team Defense" }
    ];

    //var data = [
    //    new tagItem("Ball Handling", 1),
    //    new tagItem("Passing", 2),
    //    new tagItem("Shooting", 3),
    //    new tagItem("Rebounding", 4),
    //    new tagItem("Transition", 5),
    //    new tagItem("Defense", 6),
    //    new tagItem("Team Offense", 7),
    //    new tagItem("Team Defense", 8)
    //];

    //function tagItem(name, id) {
    //    return {
    //        Name: ko.protectedObservable(name),
    //        Id: ko.protectedObservable(id)
    //    };
    //}
     
    var viewModel = {
        //data
        tags: ko.observableArray(ko.toProtectedObservableItemArray(data)),
        tagToAdd: ko.observable(""),
        selectedTag: ko.observable("Sara"),

        //behaviors
        addTag: function () {
            this.tags.push({ Name: this.tagToAdd() });
            this.tagToAdd("");
        },
        selectTag: function () {
            viewModel.selectedTag(this);
        }
    };

    $(document).on('click', '.tag-delete', function () {
        var itemToRemove = ko.dataFor(this);
        viewModel.tags.remove(itemToRemove);
    });

    $(document).on("click", ".tag-edit", function () {
        $("#tagDialog").dialog({
            buttons: {
                Save: function () {
                    $(this).dialog("close");
                    viewModel.selectedTag().commit();
                },
                Cancel: function () { $(this).dialog("close"); }
            }
        });
    });

    ko.applyBindings(viewModel);

    //function toTagItemArray(data) {
    //    var tagItems = ko.utils.arrayMap(data, function (item) {
    //        return new tagItem(item.Name, item.Id);
    //    });
    //    return tagItems;
    //}
});
