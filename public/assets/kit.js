(function(a){a.KitTitle=function(j){var d=a.Component({id:"kit-title"},j);var b,f,i,e;var h="";function g(l){var k=e.val();if(k&&k!=h){h=k;f.text(k);b.attr("data-val",k);a.Data.save("/"+d.manager.username+"/"+d.manager.slug+"/"+d.manager.token,{title:k},function(m){if(m.success!==false){window.location.href="/"+d.manager.username+"/"+m.slug+"/"+m.token}})}b.show();i.hide()}function c(){f.click(function(){b.hide();i.show();e.val(b.attr("data-val")).focus()});e.blur(function(){g()}).keyup(function(k){if(k.which===13){g()}})}d.oninit=function(){b=$(".k-kit-title-label");i=$(".k-kit-title-input");f=$(".k-kit-title-label h1");e=$("input",i);h=f.text();c()};return d.pub}})(Kitify);(function(a){a.NewItem=function(c){var b=a.Component({id:"newitem",fields:[{id:"newitem-name",prop:"name",label:"Product Name",required:true},{id:"newitem-quantity",prop:"quantity",label:"Quantity",validator:"positiveInteger",required:true},{id:"newitem-merchanturl",prop:"merchant_url",label:"Merchant URL",validator:"url",required:true},{id:"newitem-price",prop:"price",label:"Price",validator:"positiveNumeric",required:true},{id:"newitem-notes",prop:"notes",label:"Notes"}]},c);b.oninit=function(){var d=a.Form.setup({context:"#newitem",fields:b.options.fields,btns:{submit:"#kit-add-btn"}});$(d).bind("submit",function(e,f){f.token=b.manager.token;a.Data.save("/"+b.manager.username+"/"+b.manager.slug+"/items",f,function(g){if(g&&g.success!==false){d.reset();g.price=parseFloat(g.price);$(a).trigger("item-created",[g])}})})};return b.pub}})(Kitify);(function(a){a.EditItem=function(f){var c=a.Component({id:"edititem",fields:[{id:"item-name",prop:"name",required:true},{id:"item-quantity",prop:"quantity",required:true},{id:"item-merchanturl",prop:"merchant_url",required:true},{id:"item-price",prop:"price",required:true},{id:"item-notes",prop:"notes"}]},f);var e,g;var b=['<tr class="k-items-editrow">','<td><input type="text" id="item-name" value="{{name}}" class="span3" required /></td>','<td><input type="number" id="item-quantity" value="{{quantity}}" class="span1" required /></td>','<td><input type="url" id="item-merchanturl" value="{{merchant_url}}" class="span4" required /></td>',"<td>",'<div class="input-prepend">','<span class="add-on">$</span>','<input type="number" id="item-price" value="{{price}}" class="span2" required />',"</div>","</td>","<td>",'<input type="text" id="item-notes" value="{{notes}}" class="span2" />',"</td>","<td>",'<div class="k-kit-ctrls">','<a href="javascript:void(0)" class="k-kit-ctrls-save btn small primary">save</a>','<a href="javascript:void(0)" class="k-kit-ctrls-cancel btn small">cancel</a>',"</div>","</td>","</tr>"].join("");function d(h){var j=h.data("item");if(j){var k=$(a.template(b,j)).insertAfter(h);var i=a.Form.setup({context:k,fields:c.options.fields,data:j,btns:{submit:$(".k-kit-ctrls-save",k)}});$(i).bind("submit",function(l,m){a.Data.save("/"+c.manager.username+"/"+c.manager.slug+"/items/"+m.id,m,function(n){m.token=c.manager.token;if(n&&n.success!==false){n.price=parseFloat(n.price);k.remove();$(a).trigger("item-updated",[n,h])}})})}}c.oninit=function(){e=$("#kit-items");g=$("#kit-items-editctrls");$(document).on("hover","#kit-items tbody tr",function(h){if(!$(this).hasClass("k-items-editrow")){if(h.type==="mouseenter"){$(".k-kit-ctrls",this).show()}else{$(".k-kit-ctrls",this).hide()}}});$("#kit-items tbody").click(function(j){var i=$(j.target),h=i.parents("tr");if(i.hasClass("k-kit-ctrls-cancel")){$(".k-items-editrow").remove();$(".k-kit-item-editing").removeClass("k-kit-item-editing")}else{if(i.hasClass("k-kit-ctrls-edit")){$(".k-items-editrow").remove();$(".k-kit-item-editing").removeClass("k-kit-item-editing");h.addClass("k-kit-item-editing");d(h)}else{if(i.hasClass("k-kit-ctrls-delete")){var k=h.attr("data-id");if(k){a.Data.del("/"+c.manager.username+"/"+c.manager.slug+"/items/"+k,{token:c.manager.token},function(l){h.fadeOut(function(){h.remove();$(a).trigger("item-deleted",[l.id])})})}}}}})};return c.pub}})(Kitify);(function(a){a.Kit=function(k){var g=a.Component({id:"kit",components:{}},k),i=[];var j;var b='<tr class="k-kit-items-none"><td colspan="6">Start adding items above.</td></tr>';var h=['<tr data-id="{{id}}">','<td class="k-kit-items-name">{{name}}</td>',"<td>{{quantity}}</td>",'<td class="k-kit-items-url"><a href="{{merchant_url}}" target="_blank">{{merchant_url}}</a></td>',"<td>{{price}}</td>","<td>{{notes}}</td>","<td>",'<div class="k-kit-ctrls">','<a href="javascript:void(0)" class="k-kit-ctrls-edit btn small primary">edit</a>','<a href="javascript:void(0)" class="k-kit-ctrls-delete btn small danger">delete</a>',"</div>","</td>","</tr>"].join("");function f(l){var m=$.extend(true,{},l);if(typeof l.price==="number"){m.price="$"+l.price.toFixed(2)}return m}function c(l,m){var n=f(m),o=a.template(h,n);$(o).appendTo(l).data("item",m)}function d(l,m){var n=f(m),o=a.template(h,n);l.replaceWith($(o).data("item",m))}function e(){var l=$("tbody",j).empty();if(!i.length){$("tbody",j).append(b)}else{$.each(i,function(m,n){n.price=parseFloat(n.price);c(l,n)})}}g.oninit=function(){g.pub.username=$("#"+g.options.id).attr("data-username");g.pub.slug=$("#"+g.options.id).attr("data-id");g.pub.token=$("#"+g.options.id).attr("data-token");j=$("#"+g.options.id+"-items");if($("#"+g.options.id).hasClass("editable")){$.each(g.options.components,function(l,m){m.init(g.pub)})}a.Data.get("/"+g.pub.username+"/"+g.pub.slug+"/items",function(l){i=l;e()});$(a).bind("item-created",function(l,m){$(".k-kit-items-none",j).remove();c($("tbody",j),m)});$(a).bind("item-updated",function(m,n,l){d(l,n)});$(a).bind("item-deleted",function(l,m){if(!$("tbody tr",j).length){$("tbody",j).append(b)}})};return g.pub}})(Kitify);