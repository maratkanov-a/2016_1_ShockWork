define(function () { return function (__fest_context){"use strict";var __fest_self=this,__fest_buf="",__fest_chunks=[],__fest_chunk,__fest_attrs=[],__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn,__fest_html="",__fest_blocks={},__fest_params,__fest_element,__fest_debug_file="",__fest_debug_line="",__fest_debug_block="",__fest_htmlchars=/[&<>"]/g,__fest_htmlchars_test=/[&<>"]/,__fest_short_tags = {"area":true,"base":true,"br":true,"col":true,"command":true,"embed":true,"hr":true,"img":true,"input":true,"keygen":true,"link":true,"meta":true,"param":true,"source":true,"wbr":true},__fest_element_stack = [],__fest_htmlhash={"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"},__fest_jschars=/[\\'"\/\n\r\t\b\f<>]/g,__fest_jschars_test=/[\\'"\/\n\r\t\b\f<>]/,__fest_jshash={"\"":"\\\"","\\":"\\\\","/":"\\/","\n":"\\n","\r":"\\r","\t":"\\t","\b":"\\b","\f":"\\f","'":"\\'","<":"\\u003C",">":"\\u003E"},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_replaceHTML(chr){return __fest_htmlhash[chr]}function __fest_replaceJS(chr){return __fest_jshash[chr]}function __fest_extend(dest, src){for(var i in src)if(src.hasOwnProperty(i))dest[i]=src[i];}function __fest_param(fn){fn.param=true;return fn}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}function __fest_escapeJS(s){if (typeof s==="string") {if (__fest_jschars_test.test(s))return s.replace(__fest_jschars,__fest_replaceJS);} else if (typeof s==="undefined")return "";return s;}function __fest_escapeHTML(s){if (typeof s==="string") {if (__fest_htmlchars_test.test(s))return s.replace(__fest_htmlchars,__fest_replaceHTML);} else if (typeof s==="undefined")return "";return s;}var json=__fest_context;__fest_buf+=("<div id=\"loader-wrapper\"><div id=\"loader\"></div><div class=\"loader-section section-left\"></div><div class=\"loader-section section-right\"></div></div><div id=\"waiter\"></div><div id=\"game\" class=\"row\"><div class=\"col s12 m6 offset-m3\"><nav class=\"nav\"><div class=\"nav-wrapper\"><a class=\"brand-logo center\">Игра</a><ul class=\"left hide-on-med-and-down\"><li><a class=\"js-go-back waves-effect waves-light btn\">Назад</a></li></ul></div></nav></div><div id=\"wrapper\"><div class=\"row\"><div class=\"container\"><div id=\"user_stack\" class=\"leftBar fl\" style=\"\"></div><div class=\"js-insert-back rightBar fr\"></div><div id=\"table\"><div class=\"leftBar fl\"><ul id=\"sortable2\" class=\"connectedSortable\"></ul></div><div class=\"score\" align=\"center\"><span class=\"my\">0</span><span class=\"score__span__vs\">VS</span><span class=\"not_my\">?</span></div><div class=\"button-finish\" id=\"button_done\"></div><div class=\"my_health\"><span>HP:</span><span id=\"your_health\">50</span></div><div class=\"his_health\"><span>HP:</span><span id=\"enemy_health\">50</span></div><div id=\"restart_button\" align=\"center\"></div><div class=\"rightBar fr\"><ul id=\"sortable3\" class=\"connectedSortable\"></ul></div><img class=\"flame__my\" src=\"img\/explosion.gif\"/><img class=\"flame__enemy\" src=\"img\/explosion.gif\"/></div></div></div></div></div>");__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}} ; });