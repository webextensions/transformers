(()=>{"use strict";var e,t,n,r={28845:(e,t,n)=>{var r=n(67294),a=n(20745);class o extends r.Component{render(){return r.createElement("div",{className:"PageHeader__PageHeader--AAWQ1"},r.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",marginTop:25}},r.createElement("h1",{style:{margin:0,textAlign:"center"}},"Transformers: ",r.createElement("span",{style:{fontVariant:"small-caps"}},r.createElement("span",{style:{letterSpacing:"0.05em"}},"Operations on the Text"))),r.createElement("h3",{style:{fontSize:11,margin:"10px 0 0 0",color:"#555",textAlign:"center"}},"Operations for Lists, Sets, CSV, JSON, etc")))}}var l=n(96486),i=n(6867),s=n(54620),c=n(76914),m=n(45697),u=n.n(m),p=n(74981),d=(n(66245),n(61549),n(90252),n(24203),n(58086)),f=n(75071),g=n(25883),y=n(41899),v=n(1453),E=n(35378),S=n(44993),h=n(87606),b=n(52436),C=n(29781),x=n(36400),O=n(14957),Z=n(43582),k=n(20030),w=n(91535),_=n(51729),R=n(74888),N=n(13505),T=n(45),j=n(66385),I=n(85877),A=n(86002),z=n(5013),J=n(49332),$=n(92173),V=n(71768),L=n(93203),F=n(53586),P=n(7444),B=n(94492),D=n(58267),M=n(99245),U=n(30603),H=n(86024),W=n(78066),q=n(91290),Q=n(15498);const G="css",K="csv",X="json",Y="list",ee="$css_sample_css",te="$css_formatCss",ne="$css_minifyCss",re="$css_cssToScss",ae="$list_sample_list",oe="$list_removeEmptyLines",le="$list_removeDuplicates",ie="$list_sort",se="$list_caseInsensitiveSort",ce="$list_naturalSort",me="$list_randomize",ue="$list_reverse",pe="$list_trimLines",de="$list_removeCommaCharacterAtLineEnds",fe="$list_removeQuoteAndApostropheCharacters",ge="$list_getStats",ye="$list_linesToJsonArray",ve="$csv_sample_csv",Ee="$csv_removeFirstColumnFromCsv",Se="$csv_removeLastColumnFromCsv",he="$csv_csvToJson",be="$json_sample_json",Ce="$json_formatJson",xe="$json_minifyJson",Oe="$json_removeProperty",Ze="$json_sortJson",ke="$json_fixDataTypes",we="$json_jsonToLines",_e="$json_jsonToCsv",Re=[ee,ve,be,ae],Ne=w.Z,Te={[G]:{[ee]:{message:"Sample CSS",Icon:_.Z},[te]:{message:"Format CSS",Icon:D.Z},[ne]:{message:"Minify CSS",Icon:R.Z},[re]:{message:"CSS to SCSS",Icon:N.Z}},[K]:{[ve]:{message:"Sample CSV",Icon:_.Z},[Ee]:{message:"Remove first column from CSV",Icon:W.Z},[Se]:{message:"Remove last column from CSV",Icon:q.Z},[he]:{message:"CSV to JSON",Icon:N.Z}},[X]:{[be]:{message:"Sample JSON",Icon:_.Z},[Ce]:{message:"Format JSON",Icon:D.Z},[xe]:{message:"Minify JSON",Icon:R.Z},[Oe]:{message:"Remove property",Icon:M.Z},[Ze]:{message:"Sort JSON",Icon:U.Z},[ke]:{message:"Fix data types",Icon:H.Z},[we]:{message:"JSON to lines",Icon:P.Z},[_e]:{message:"JSON to CSV",Icon:B.Z}},[Y]:{[ae]:{message:"Sample list",Icon:_.Z},[oe]:{message:"Remove empty lines",Icon:T.Z},[le]:{message:"Remove duplicates",Icon:j.Z},[ie]:{message:"Sort",Icon:I.Z},[se]:{message:"Case-insensitive sort",Icon:A.Z},[ce]:{message:"Natural sort",Icon:z.Z},[me]:{message:"Randomize",Icon:J.Z},[ue]:{message:"Reverse",Icon:$.Z},[pe]:{message:"Trim lines",Icon:V.Z},[de]:{message:"Remove comma character at line ends",Icon:L.Z},[fe]:{message:"Remove quote and apostrophe characters",Icon:F.Z},[ge]:{message:"Get stats",Icon:Q.Z},[ye]:{message:"Lines to JSON Array",Icon:N.Z}}},je={};for(const e in Te){const t=Te[e];for(const e in t)je[e]=t[e]}for(const e in Te){const t=Te[e];for(const e in t)t[e].id=e}const Ie=Object.keys(je),Ae=localStorage.getItem("recentOperations");let ze=[];try{ze=JSON.parse(Ae),Array.isArray(ze)||(ze=Re)}catch(e){console.error(e)}ze.filter((e=>Ie.includes(e)));const Je=(0,Z.cn)(ze);var $e=n(54123),Ve=n(67266),Le=n.n(Ve);const Fe=e=>e.trim(),Pe=function(e){return function(e,t){return","===e[e.length-1]?e.substring(0,e.length-1):e}(e)},Be=function(e){return e.replaceAll('"',"").replaceAll("'","")},De=e=>{const t=e.split(",");return t.pop(),t.join(",")},Me=e=>{const t=e.split(",");return t.shift(),t.join(",")},Ue=function(e,t){const n=t(e);if("object"==typeof n)for(const e in n)n[e]=Ue(n[e],t);return n},He=function(e){return Ue(e,(function(e){if("string"==typeof e)"true"===e?e=!0:"false"===e?e=!1:"null"===e?e=null:String(Number(e))===e&&("Infinity"===String(Number(e))||"-Infinity"===String(Number(e))||"NaN"===String(Number(e))||(e=Number(e)));else if(Array.isArray(e))e=e.map((e=>He(e)));else if("object"==typeof e)for(const t in e)e[t]=He(e[t]);return e}))},We=async function({getInputValue:e,operation:t}){try{if([te,ne,re].includes(t)){const n=e();let r;switch(t){case te:r=(0,$e.RF)(n);break;case ne:r=(0,$e.BV)(n);break;case re:""===n.trim()?r=n:(r=(0,$e.AG)(n),"Error: no source supplied to csspretty."===r&&alert("Sorry! The CSS to SCSS conversion failed.\n\nPlease try again with some simpler syntax."))}return[null,r]}if([Ce,xe,Oe,Ze,ke,we,_e].includes(t)){const n=e(),r=JSON.parse(n);let a;switch(t){case Ce:a=JSON.stringify(r,null,"\t");break;case xe:a=JSON.stringify(r);break;case Oe:{const e=(t,n)=>{t.hasOwnProperty(n)?delete t[n]:Object.keys(t).forEach((r=>{"object"==typeof t[r]?e(t[r],n):Array.isArray(t[r])&&t[r].forEach((t=>{"object"==typeof t&&e(t,n)}))}))},t=prompt("Please enter the name of the property to remove:");if(!t)return[new Error("Please provide a property name.")];e(r,t),a=JSON.stringify(r,null,"\t")}break;case Ze:a=Le()(r,{space:"\t"});break;case ke:a=He(r),a=JSON.stringify(a,null,"\t");break;case we:if(!Array.isArray(r)||!r.every((e=>"string"==typeof e)))return[new Error("Please provide an Array of Strings as the input.")];a=r.join("\n");break;case _e:a=function(e){const t=[],n=[],r=Object.keys(e[0]);for(const e of r)t.push(e);n.push(t.join(","));for(const t of e){const e=[];for(const n of r)e.push(t[n]);n.push(e.join(","))}return n.join("\n")}(r)}return[null,a]}if(![ge].includes(t)){if([ee,ve,Ee,Se,he,be,ae,oe,le,ie,se,ce,me,ue,pe,de,fe,ye].includes(t)){const n=e().split("\n");let r=n;switch(t){case ee:r=["body {","    background-color: #f0f0f0;","}","","body h1 {","    color: #000000;","    font-size: 24px;","    font-weight: bold;","    text-align: center;","}",""];break;case ve:r=["Name,Age,Height","Charlie,22,1.85","Bob,21,1.75","Alice,20,1.65","David,23,1.95"];break;case Ee:r=function(e){return e.map(Me)}(n);break;case Se:r=function(e){return e.map(De)}(n);break;case he:r=function(e){const t=["["],n=e[0].split(",");for(let r=1;r<e.length;r++){const a=e[r].split(","),o={};for(let e=0;e<a.length;e++){const t=a[e];o[n[e]]=t}r<e.length-1?t.push("\t"+JSON.stringify(o)+","):t.push("\t"+JSON.stringify(o))}return t.push("]"),t}(n);break;case be:r=["{",'    "data": [','        { "name": "Charlie", "age": 22, "height": 1.85 },','        { "name": "Bob",     "age": 21, "height": 1.75 },','        { "name": "Alice",   "age": 20, "height": 1.65 },','        { "name": "David",   "age": 23, "height": 1.95 }',"    ]","}"];break;case ae:r=["Charlie","Bob","Alice","David"];break;case oe:r=function(e){return e.filter((e=>e))}(n);break;case le:r=function(e){return[...new Set(e)]}(n);break;case ie:n.sort(),r=n;break;case se:n.sort(((e,t)=>e.toLowerCase().localeCompare(t.toLowerCase()))),r=n;break;case ce:n.sort(((e,t)=>e.localeCompare(t,void 0,{numeric:!0}))),r=n;break;case me:n.sort((()=>Math.random()-.5)),r=n;break;case ue:n.reverse(),r=n;break;case pe:r=function(e){return e.map(Fe)}(n);break;case de:r=function(e){return e.map(Pe)}(n);break;case fe:r=function(e){return e.map(Be)}(n);break;case ye:r=JSON.stringify(n,null,"\t"),r=r.split("\n")}return[null,r.join("\n")]}return[new Error(`Error: Implementation is not available for operation: ${t}`)]}if(t===ge){const t={},n=e(),r=n.split("\n");t.linesCount=r.length,t.charactersCount=n.length;const a=n.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ").replace(/\s+/g," ").split(" ");return t.wordsCount=a.length,t.uniqueWordsCount=new Set(a).size,[null,null,{stats:t}]}}catch(e){return[e]}},qe=function({editorRef:e,onValueUpdate:t,mode:n}){const[a,o]=(0,Z.KO)(Je);return r.createElement("div",{style:{display:"flex",width:291,overflow:"hidden",paddingLeft:10}},a.filter((e=>Te[n][e])).map(((l,s)=>{var c;const m=Te[n];return r.createElement("div",{key:s},r.createElement(i.Z,{size:"small",title:(null===(c=m[l])||void 0===c?void 0:c.message)||l,onClick:async()=>{const n=[l,...a],r=n.filter(((e,t)=>n.indexOf(e)===t));o(r),localStorage.setItem("recentOperations",JSON.stringify(r));const[i,s,c]=await We({getInputValue:()=>e.current.getValue(),operation:l});i?(console.error(i),alert(i.message)):null===s?alert(JSON.stringify(c,null,"\t")):(e.current.setValue(s),"function"==typeof t&&t(s))}},(()=>{var e;let t=null===(e=je[l])||void 0===e?void 0:e.Icon;return t||(t=Ne),r.createElement(t,{style:{fontSize:16}})})()))})))};qe.propTypes={editorRef:u().object.isRequired,onValueUpdate:u().func,mode:u().string.isRequired};const Qe=async function(e){try{return await navigator.clipboard.writeText(e),!0}catch(e){return!1}},Ge=function({placeholder:e,onLoad:t,onValueUpdate:n,allowFileInput:a,style:o,editorWidth:l,editorHeight:s}){const[m,u]=(0,k.Z)("mode",Y,{raw:!0}),[w,_]=(0,k.Z)("selectedOperations",{[G]:"",[K]:"",[X]:"",[Y]:""}),R=w[m],[N,T]=(0,k.Z)("flagSyntaxHighlighting","yes",{raw:!0}),[j,I]=(0,Z.KO)(Je),[A,z]=(0,k.Z)("flagLineWrap","yes",{raw:!0}),[J,$]=(0,r.useState)(Date.now()),V=(()=>{if("yes"!==N)return"text";switch(m){case G:return"css";case K:return"text";case X:return"json";default:return"text"}})(),L=(0,r.useRef)(null);return r.createElement("div",{style:o,className:"TextList__TextList--NZ7zn"},r.createElement("div",{style:{marginTop:10}},r.createElement("div",{className:"TextList__translucentWithoutHover--n0_xk",style:{display:"flex",justifyContent:"space-between"}},r.createElement("div",{style:{display:"flex"}},r.createElement(i.Z,{title:"Cut",size:"small",onClick:async()=>{const e=L.current;if(e){let t=e.getSelectedText();t||(e.selectAll(),t=e.getSelectedText()),await Qe(t),e.execCommand("cut")}}},r.createElement(g.Z,{style:{fontSize:16}})),r.createElement(i.Z,{title:"Copy",size:"small",onClick:async()=>{const e=L.current;if(e){let t=e.getSelectedText();t||(e.selectAll(),t=e.getSelectedText()),await Qe(t),e.execCommand("copy")}}},r.createElement(y.Z,{style:{fontSize:16}})),r.createElement(i.Z,{title:"Clear",size:"small",onClick:()=>{const e=L.current;e&&(e.getSelectedText()?e.execCommand("inserttext",{text:""}):e.setValue(""))}},r.createElement(v.Z,{style:{fontSize:16}})),r.createElement(i.Z,{title:"Undo",size:"small",disabled:J&&(!L.current||!L.current.getSession().getUndoManager().hasUndo()),onClick:()=>{const e=L.current;e&&e.execCommand("undo")}},r.createElement(E.Z,{style:{fontSize:16}})),r.createElement(i.Z,{title:"Redo",size:"small",disabled:J&&(!L.current||!L.current.getSession().getUndoManager().hasRedo()),onClick:()=>{const e=L.current;e&&e.execCommand("redo")}},r.createElement(S.Z,{style:{fontSize:16}})),r.createElement(i.Z,{title:"Toggle line wrap",size:"small",onClick:()=>{z("yes"===A?"no":"yes")}},r.createElement(h.Z,{style:{fontSize:16,color:"yes"===A?"#1976d2":void 0}})),r.createElement(i.Z,{title:"Save",size:"small",onClick:()=>{const e=L.current;if(e){const t=e.getValue(),n=new Blob([t],{type:"text/plain"}),r=document.createElement("a");let a;switch(r.href=URL.createObjectURL(n),m){case G:a="css";break;case K:a="csv";break;case X:a="json";break;default:a="txt"}const o=new Date(Date.now()-60*(new Date).getTimezoneOffset()*1e3).toISOString().substring(0,19).replace("T"," ").replace(" ","_").replace(/:/g,"-");r.download=`output-${o}.${a}`,r.click()}}},r.createElement(b.Z,{style:{fontSize:16}}))),r.createElement("div",{style:{display:"flex"}},r.createElement("div",null,(()=>{const e=m!==X&&m!==G;let t;return t=e?"Syntax highlighting not available for this mode":"yes"===N?"Disable syntax highlighting":"Enable syntax highlighting",r.createElement(i.Z,{size:"small",title:t,onClick:()=>{e||T("yes"===N?"no":"yes")}},(()=>{let t,n;return t="yes"===N?f.Z:d.Z,n=e?"#ccc":"yes"===N?"#1976d2":void 0,r.createElement(t,{style:{fontSize:16,color:n}})})())})()),r.createElement("div",{style:{marginLeft:5}},r.createElement(C.Z,{native:!0,value:m,style:{width:75,height:24,fontSize:11},onChange:e=>u(e.target.value)},r.createElement("option",{value:G},"CSS"),r.createElement("option",{value:K},"CSV"),r.createElement("option",{value:X},"JSON"),r.createElement("option",{value:Y},"List")))))),r.createElement("div",{style:{marginTop:10}},r.createElement("div",null,r.createElement(p.ZP,{placeholder:e,setOptions:{wrap:"yes"===A},mode:V,theme:"github",onLoad:e=>{L.current=e,"function"==typeof t&&t(e)},onChange:e=>{$(Date.now()),"function"==typeof n&&n(e.target.value)},editorProps:{$blockScrolling:!0},width:l,height:s})),a&&r.createElement("div",{style:{marginTop:10}},r.createElement("input",{type:"file"}))),r.createElement("div",{style:{marginTop:10}},r.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"}},r.createElement("div",null,r.createElement(C.Z,{native:!0,style:{width:220,height:28,fontSize:11},value:w[m],onChange:e=>{const t=JSON.parse(JSON.stringify(w));t[m]=e.target.value,_(t)}},r.createElement("option",{value:"",style:{color:"#777"}},"-- Operations --"),m===G&&r.createElement(r.Fragment,null,r.createElement("optgroup",{label:"Sample"},r.createElement("option",{value:ee},"Sample CSS")),r.createElement("optgroup",{label:"Format"},r.createElement("option",{value:te},"Format CSS"),r.createElement("option",{value:ne},"Minify CSS")),r.createElement("optgroup",{label:"Transform"},r.createElement("option",{value:re},"CSS to SCSS"))),m===Y&&r.createElement(r.Fragment,null,r.createElement("optgroup",{label:"Sample"},r.createElement("option",{value:ae},"Sample list")),r.createElement("optgroup",{label:"Lines"},r.createElement("option",{value:oe},"Remove empty lines"),r.createElement("option",{value:le},"Remove duplicates")),r.createElement("optgroup",{label:"Sort"},r.createElement("option",{value:ie},"Sort"),r.createElement("option",{value:se},"Case-insensitive sort"),r.createElement("option",{value:ce},"Natural sort"),r.createElement("option",{value:me},"Randomize"),r.createElement("option",{value:ue},"Reverse")),r.createElement("optgroup",{label:"String"},r.createElement("option",{value:pe},"Trim lines"),r.createElement("option",{value:de},"Remove comma character at line ends"),r.createElement("option",{value:fe},"Remove \" and ' characters")),r.createElement("optgroup",{label:"Stats"},r.createElement("option",{value:ge},"Get Stats")),r.createElement("optgroup",{label:"Transform"},r.createElement("option",{value:ye},"Lines to JSON Array"))),m===K&&r.createElement(r.Fragment,null,r.createElement("optgroup",{label:"Sample"},r.createElement("option",{value:ve},"Sample CSV")),r.createElement("optgroup",{label:"Columns"},r.createElement("option",{value:Ee},"Remove first column from CSV"),r.createElement("option",{value:Se},"Remove last column from CSV")),r.createElement("optgroup",{label:"Transform"},r.createElement("option",{value:he},"CSV to JSON"))),m===X&&r.createElement(r.Fragment,null,r.createElement("optgroup",{label:"Sample"},r.createElement("option",{value:be},"Sample JSON")),r.createElement("optgroup",{label:"Format"},r.createElement("option",{value:Ce},"Format JSON"),r.createElement("option",{value:xe},"Minify JSON")),r.createElement("optgroup",{label:"Edit"},r.createElement("option",{value:Oe},"Remove property")),r.createElement("optgroup",{label:"Sort"},r.createElement("option",{value:Ze},"Sort JSON")),r.createElement("optgroup",{label:"Fix"},r.createElement("option",{value:ke},"Fix data types")),r.createElement("optgroup",{label:"Transform"},r.createElement("option",{value:we},"JSON to Lines"),r.createElement("option",{value:_e},"JSON to CSV"))))),r.createElement("div",{style:{marginLeft:5}},r.createElement(c.Z,{variant:"contained",color:"primary",size:"small",startIcon:r.createElement(x.Z,null),disabled:""===R,onClick:async()=>{const e=[R,...j],t=e.filter(((t,n)=>e.indexOf(t)===n));I(t),localStorage.setItem("recentOperations",JSON.stringify(t));const[r,a,o]=await We({getInputValue:()=>L.current.getValue(),operation:R});r?(console.error(r),alert(r.message)):null===a?alert(JSON.stringify(o,null,"\t")):(L.current.setValue(a),"function"==typeof n&&n(a))}},"Apply"))),j.length>0&&r.createElement("div",{style:{marginTop:10}},r.createElement("div",{style:{display:"flex",backgroundColor:"#f5f5f5",border:"1px solid #e0e0e0",borderRadius:999}},r.createElement("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",fontSize:12}},r.createElement(i.Z,{size:"small",title:"Reset suggested operations",onClick:()=>{I(Re),localStorage.setItem("recentOperations",JSON.stringify([]))}},r.createElement(O.Z,{style:{fontSize:16}}))),r.createElement("div",{style:{borderRight:"1px solid #e0e0e0"}}),r.createElement("div",{style:{backgroundColor:"#fff",width:"100%",borderTopRightRadius:999,borderBottomRightRadius:999}},r.createElement(qe,{editorRef:L,onValueUpdate:n,mode:m}))))))};Ge.propTypes={placeholder:u().string,onLoad:u().func,onValueUpdate:u().func,allowFileInput:u().bool,style:u().object,editorWidth:u().string,editorHeight:u().string};const Ke=({editorARef:e,editorBRef:t,editorCRef:n,operation:r})=>{const a=e.current.getValue(),o=t.current.getValue(),i=a.split("\n"),s=o.split("\n");let c="";"append"===r?c=[...i,...s]:"union"===r?c=(0,l.union)(i,s):"intersection"===r?c=(0,l.intersection)(i,s):"difference"===r&&(c=(0,l.difference)(i,s));const m=c.join("\n");n.current.setValue(m)},Xe=function(){const e=(0,r.useRef)(null),t=(0,r.useRef)(null),n=(0,r.useRef)(null);return r.createElement("div",{className:"ListOperations__ListOperations--VCX0Q"},r.createElement("div",{style:{display:"flex",justifyContent:"center",minWidth:1120}},r.createElement("div",null,r.createElement("div",{style:{textAlign:"center",fontFamily:'"Transformers", sans-serif',fontSize:20}},"A"),r.createElement("div",null,r.createElement(Ge,{placeholder:"Provide text here",onLoad:t=>{e.current=t},style:{marginTop:5},editorWidth:"320px",editorHeight:"300px"}))),r.createElement("div",{style:{marginLeft:10}},r.createElement("div",{style:{textAlign:"center"}}," "),r.createElement("div",{style:{marginTop:55,display:"flex",flexDirection:"column",justifyContent:"center",height:"300px"}},r.createElement(i.Z,{variant:"filled",color:"primary",size:"small",onClick:()=>{const n=e.current.getValue(),r=t.current.getValue();e.current.setValue(r),t.current.setValue(n)}},r.createElement(s.Z,null)))),r.createElement("div",{style:{marginLeft:10}},r.createElement("div",{style:{textAlign:"center",fontFamily:'"Transformers", sans-serif',fontSize:20}},"B"),r.createElement("div",null,r.createElement(Ge,{placeholder:"Provide text here",onLoad:e=>{t.current=e},style:{marginTop:5},editorWidth:"320px",editorHeight:"300px"}))),r.createElement("div",{style:{marginLeft:10}},r.createElement("div",{style:{textAlign:"center"}}," "),r.createElement("div",{style:{marginTop:55,display:"flex",flexDirection:"column",justifyContent:"center",height:"300px"}},r.createElement(c.Z,{variant:"contained",size:"small",type:"button",style:{display:"block"},onClick:()=>{Ke({editorARef:e,editorBRef:t,editorCRef:n,operation:"append"})}},"A + B"),r.createElement(c.Z,{variant:"contained",size:"small",type:"button",style:{display:"block",marginTop:5},onClick:()=>{Ke({editorARef:e,editorBRef:t,editorCRef:n,operation:"intersection"})}},"A ∩ B"),r.createElement(c.Z,{variant:"contained",size:"small",type:"button",style:{display:"block",marginTop:5},onClick:()=>{Ke({editorARef:e,editorBRef:t,editorCRef:n,operation:"union"})}},"A ∪ B"),r.createElement(c.Z,{variant:"contained",size:"small",type:"button",style:{display:"block",marginTop:5},onClick:()=>{Ke({editorARef:e,editorBRef:t,editorCRef:n,operation:"difference"})}},"A − B"))),r.createElement("div",{style:{marginLeft:10}},r.createElement("div",{style:{textAlign:"center",fontFamily:'"Transformers", sans-serif',fontSize:20}},"C"),r.createElement("div",null,r.createElement(Ge,{placeholder:"Result of the operation will be available here",onLoad:e=>{n.current=e},style:{marginTop:5},editorWidth:"320px",editorHeight:"300px"})))))},Ye=()=>r.createElement("div",{className:"Dashboard__Dashboard--d2pNX"},r.createElement("div",{style:{marginTop:45}},r.createElement(Xe,null)));var et=n(54332);class tt extends r.Component{render(){return r.createElement("div",{className:"PageFooter__PageFooter--yI25Y"},r.createElement("div",{style:{display:"flex",justifyContent:"center",marginTop:45,marginBottom:20}},r.createElement("div",null,r.createElement("div",null,r.createElement(et.Q,null)))))}}class nt extends r.Component{render(){return r.createElement("div",null,r.createElement(o,null),r.createElement("div",null,r.createElement(Ye,null)),r.createElement(tt,null))}}const rt=document.getElementById("root");(0,a.s)(rt).render(r.createElement(nt,null))}},a={};function o(e){var t=a[e];if(void 0!==t)return t.exports;var n=a[e]={id:e,loaded:!1,exports:{}};return r[e].call(n.exports,n,n.exports,o),n.loaded=!0,n.exports}o.m=r,o.amdD=function(){throw new Error("define cannot be used indirect")},e=[],o.O=(t,n,r,a)=>{if(!n){var l=1/0;for(m=0;m<e.length;m++){for(var[n,r,a]=e[m],i=!0,s=0;s<n.length;s++)(!1&a||l>=a)&&Object.keys(o.O).every((e=>o.O[e](n[s])))?n.splice(s--,1):(i=!1,a<l&&(l=a));if(i){e.splice(m--,1);var c=r();void 0!==c&&(t=c)}}return t}a=a||0;for(var m=e.length;m>0&&e[m-1][2]>a;m--)e[m]=e[m-1];e[m]=[n,r,a]},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},n=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,o.t=function(e,r){if(1&r&&(e=this(e)),8&r)return e;if("object"==typeof e&&e){if(4&r&&e.__esModule)return e;if(16&r&&"function"==typeof e.then)return e}var a=Object.create(null);o.r(a);var l={};t=t||[null,n({}),n([]),n(n)];for(var i=2&r&&e;"object"==typeof i&&!~t.indexOf(i);i=n(i))Object.getOwnPropertyNames(i).forEach((t=>l[t]=()=>e[t]));return l.default=()=>e,o.d(a,l),a},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e;o.g.importScripts&&(e=o.g.location+"");var t=o.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var n=t.getElementsByTagName("script");n.length&&(e=n[n.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),o.p=e})(),(()=>{var e={826:0};o.O.j=t=>0===e[t];var t=(t,n)=>{var r,a,[l,i,s]=n,c=0;if(l.some((t=>0!==e[t]))){for(r in i)o.o(i,r)&&(o.m[r]=i[r]);if(s)var m=s(o)}for(t&&t(n);c<l.length;c++)a=l[c],o.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return o.O(m)},n=self.webpackChunktransformers=self.webpackChunktransformers||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var l=o.O(void 0,[360,375],(()=>o(28845)));l=o.O(l)})();
//# sourceMappingURL=bundle.index.eb8a002b00af9c552b98.js.map