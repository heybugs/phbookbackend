(this["webpackJsonpwork2.6-10"]=this["webpackJsonpwork2.6-10"]||[]).push([[0],{21:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n(2),r=n(15),i=n.n(r),u=(n(21),n(5)),o=n(4),s=n(3),d=n.n(s),h="/api/persons/",j=function(e){var t=e.searchName,n=e.handleSearchChange;return Object(a.jsxs)("div",{children:["filter shown with :"," ",Object(a.jsx)("input",{value:t,onChange:n})]})},l=function(e){var t=e.newPerson,n=e.handleNameChange,c=e.handleNumChange,r=e.handleAddClick;return Object(a.jsxs)("form",{children:[Object(a.jsxs)("div",{children:["name: ",Object(a.jsx)("input",{value:t.name,onChange:n})]}),Object(a.jsxs)("div",{children:["number: ",Object(a.jsx)("input",{value:t.number,onChange:c})]}),Object(a.jsx)("div",{children:Object(a.jsx)("button",{type:"submit",onClick:r,children:"add"})})]})},b=function(e){var t=e.persons,n=(e.setPersons,function(e){var t;window.confirm("Delete ".concat(e.name,"?"))&&(t=e.id,d.a.delete(h+t).then((function(e){return e.data}))).then((function(e){}))});return t.map((function(e,t){return e.filter?void 0:Object(a.jsxs)("li",{children:[e.name,"\xa0",e.number,"\xa0\xa0",Object(a.jsx)("button",{onClick:function(){return n(e)},children:"delete"})]},t)}))},f=function(e){var t=e.msg;return""===t.text?null:Object(a.jsx)("div",{className:t.type?"success":"error",children:t.text})},m=function(){var e=Object(c.useState)({type:!1,text:""}),t=Object(o.a)(e,2),n=t[0],r=t[1],i=Object(c.useState)([]),s=Object(o.a)(i,2),m=s[0],O=s[1];Object(c.useEffect)((function(){d.a.get(h).then((function(e){return e.data})).then((function(e){O(e)}))}),[]);var x=Object(c.useState)({name:"",number:"",filter:!1}),p=Object(o.a)(x,2),v=p[0],g=p[1],w=Object(c.useState)(""),C=Object(o.a)(w,2),k=C[0],y=C[1];return Object(a.jsxs)("div",{children:[Object(a.jsx)("h2",{children:"Phonebook"}),Object(a.jsx)(f,{msg:n}),Object(a.jsx)(j,{searchName:k,handleSearchChange:function(e){y(e.target.value);var t=new RegExp(e.target.value,"i");m.filter((function(e,n){var a=t.test(e.name);return e.filter=!a,!0}))}}),Object(a.jsx)("h2",{children:"add a new"}),Object(a.jsx)(l,{newPerson:v,handleNameChange:function(e){g(Object(u.a)(Object(u.a)({},v),{},{name:e.target.value}))},handleNumChange:function(e){g(Object(u.a)(Object(u.a)({},v),{},{number:e.target.value}))},handleAddClick:function(e){e.preventDefault();for(var t,n,a=!1,c=null,i=0;i<m.length;i++)m[i].name===v.name&&(a=!0,c=m[i].id);a&&c?window.confirm("".concat(v.name," is already added to phonebook,replace the old number with a new one?"))&&(t=c,n=v,d.a.put(h+t,n).then((function(e){return e.data}))).then((function(e,t){})).catch((function(e){r({type:!1,text:"".concat(v.name," was deleted ")}),setTimeout((function(){r({type:!1,text:""})}),2e3)})):(function(e){return d.a.post(h,e).then((function(e){return e.data}))}(v).then((function(e){O(m.concat(e))})),r({type:!0,text:"added ".concat(v.name," ")}),setTimeout((function(){r({type:!1,text:""})}),2e3));g({filter:!1,number:"",name:""})}}),Object(a.jsx)("h2",{children:"Numbers"}),Object(a.jsx)("ul",{children:Object(a.jsx)(b,{persons:m,setPersons:O})})]})};i.a.render(Object(a.jsx)(m,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.818891c2.chunk.js.map