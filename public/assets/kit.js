(function(a){a.KitTitle=function(d){var c=a.Component({id:"kit-title"},d);var g,b,f,h;function e(){b.click(function(){g.hide();f.show();h.val(g.attr("data-val")).focus()});h.blur(function(){var i=h.val();if(i){b.text(i);g.attr("data-val",i)}g.show();f.hide()})}c.oninit=function(){g=$(".k-kit-title-label");f=$(".k-kit-title-input");b=$(".k-kit-title-label h2");h=$("input",f);e()};return c.pub}})(Kitify);(function(a){a.NewItem=function(c){var b=a.Component({id:"newitem",fields:[{id:"newitem-name",prop:"name",required:true},{id:"newitem-quantity",prop:"quantity",required:true},{id:"newitem-merchanturl",prop:"merchant_url",required:true},{id:"newitem-price",prop:"price",required:true},{id:"newitem-notes",prop:"notes"}]},c);b.oninit=function(){var d=$("#kit").attr("data-id");$("#kit-add-btn").click(function(){var f=true,e={kit_id:d};$.each(b.options.fields,function(g,j){var h=$("#"+j.id);var k=h.val();if(j.required&&!k){f=false;h.addClass("error")}e[j.prop]=h.val()});if(f){a.Data.save("/items",e,function(g){$(a).trigger("item-added",[g])})}})};return b.pub}})(Kitify);(function(a){a.Kit=function(d){var b=a.Component({id:"kit"},d);var c,e;var g=["<tr>",'<td><input id="item-name" type="text" class="span4" value="" /></td>','<td><input id="item-quantity" type="text" class="span1" value="1" /></td>','<td><input id="item-merchantlink" type="text" class="span5" value="" /></td>','<td><input id="item-price" type="text" class="span2" value="" /></td>','<td><input id="item-notes" type="text" class="span6" value="" /></td>',"</tr>","<tr>",'<td colspan="5">','<a id="kit-edit-btn" href="javascript:void(0)" class="btn small">Add</a>','<a href="javascript:void(0)">Cancel</a>',"</td>","</tr>"].join("");function f(){$("#kit-add-btn").click(function(){$("tbody",c).append(g);e.hide()})}b.oninit=function(){c=$("#"+b.options.id+"-items");e=$(".k-kit-items-add")};return b.pub}})(Kitify);