var Handlebars = require("handlebars/runtime");
 exports["news"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "    <a class=\""
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " button\" data-index=\""
    + container.escapeExpression(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\"></a>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "active";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.article,depth0,{"name":"article","data":data,"indent":"      ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"cliqz-news\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.pages : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n  <div class=\"acordion\" style=\"height: 141px;\" id=\"news\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.news : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n</div>";
},"usePartial":true,"useData":true});
Handlebars.registerPartial("article", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" class=\"article\" style=\"height: 129px;\">\n  <div class=\"side-front\">\n"
    + ((stack1 = container.invokePartial(partials.logo,depth0,{"name":"logo","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    <span class=\"source-name\">\n      "
    + alias4(((helper = (helper = helpers.displayUrl || (depth0 != null ? depth0.displayUrl : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"displayUrl","hash":{},"data":data}) : helper)))
    + "\n    </span>\n    <p class=\"title\">\n      "
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\n    </p>\n  </div>\n  <div class=\"side-back\">\n    <p class=\"abstract\">\n      "
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "\n    </p>\n  </div>\n</a>\n";
},"usePartial":true,"useData":true}));
Handlebars.registerPartial("logo", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<span style=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.logo : depth0)) != null ? stack1.style : stack1), depth0))
    + "\" class=\"logo\">\n  "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.logo : depth0)) != null ? stack1.text : stack1), depth0))
    + "\n</span>";
},"useData":true}));
exports["speeddials"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.speeddial,depth0,{"name":"speeddial","hash":{"role":"history"},"data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.speeddial,depth0,{"name":"speeddial","hash":{"role":"custom"},"data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "<h3 class=\"speedDialLabel\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.i18n : depth0)) != null ? stack1.speedDials : stack1)) != null ? stack1["history-sites"] : stack1), depth0))
    + "</h3>\n<div class=\"speed-dial-row\" id=\"most-visited\">\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.history : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n<h3 class=\"speedDialLabel\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.i18n : depth0)) != null ? stack1.speedDials : stack1)) != null ? stack1["custom-sites"] : stack1), depth0))
    + "</h3>\n<div class=\"speed-dial-row\" id=\"favorites\">\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.custom : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n<div class=\"undo\" id=\"undo\" style=\"display: none\"><a href=\"\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.i18n : depth0)) != null ? stack1.speedDials : stack1)) != null ? stack1["custom-sites"] : stack1), depth0))
    + "</a> <a href=\"\">Close</a></div>\n";
},"usePartial":true,"useData":true});
Handlebars.registerPartial("speeddial", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" class=\"speed-dial\" role=\""
    + alias4(((helper = (helper = helpers.role || (depth0 != null ? depth0.role : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"role","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = container.invokePartial(partials.logo,depth0,{"name":"logo","data":data,"indent":"  ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "  <span class=\"title\">"
    + alias4(((helper = (helper = helpers.displayTitle || (depth0 != null ? depth0.displayTitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"displayTitle","hash":{},"data":data}) : helper)))
    + "</span>\n</a>\n";
},"usePartial":true,"useData":true}));
exports["urlbar"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<input placeholder=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.i18n : depth0)) != null ? stack1.urlBar : stack1)) != null ? stack1["search-address"] : stack1), depth0))
    + "\" class=\"url-bar\">";
},"useData":true});