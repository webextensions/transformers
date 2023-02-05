(()=>{var e,t,n,r,a,o={8788:()=>{window.less={onReady:!1}},13373:(e,t,n)=>{"use strict";var r=n(67294),a=n(20745),o=n(91218),l=n(79655),i=n(89250);class s extends r.Component{render(){return r.createElement("div",{className:"PageHeader__PageHeader--AAWQ1"},r.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",marginTop:25}},r.createElement("h1",{style:{margin:0,textAlign:"center"}},r.createElement("span",{style:{fontVariant:"small-caps"}},r.createElement("span",{style:{letterSpacing:"0.05em",fontSize:"28px"}},"Transformers: ")),r.createElement("span",{style:{fontVariant:"small-caps"}},r.createElement("span",{style:{letterSpacing:"0.05em"}},"Operations on the Text"))),r.createElement("h3",{style:{fontSize:11,margin:"10px 0 0 0",color:"#555",textAlign:"center"}},"Operations for Lists, Sets, CSV, JSON, etc")))}}var c=n(45697),m=n.n(c),u=n(44656),d=n(62640),p=n(20030);const f=()=>{const e=new URLSearchParams(window.location.search),t={};for(const n of e)t[n[0]]=n[1];return t};var y=n(74981),g=(n(66245),n(61549),n(90252),n(24203),n(6867)),v=n(76914),E=n(75943),h=n(58086),S=n(75071),b=n(25883),C=n(41899),x=n(1453),O=n(35378),w=n(44993),T=n(87606),k=n(52436),Z=n(45501),R=n(36400),N=n(14957),j=n(43582),A=n(24697),I=n(91535),L=n(74888),z=n(13505),V=n(45),F=n(66385),J=n(85877),D=n(86002),P=n(5013),_=n(49332),B=n(92173),M=n(71768),W=n(93203),H=n(53586),U=n(7444),$=n(94492),q=n(58267),G=n(99245),Q=n(30603),K=n(86024),X=n(78066),Y=n(91290),ee=n(15498);const te="css",ne="csv",re="json",ae="less",oe="list",le=[te,ne,re,ae,oe],ie="cssFormat",se="cssMinify",ce="cssToScss",me="listRemoveEmptyLines",ue="listRemoveDuplicates",de="listSort",pe="listCaseInsensitiveSort",fe="listNaturalSort",ye="listRandomize",ge="listReverse",ve="listTrimLines",Ee="listRemoveCommaCharacterAtLineEnds",he="listRemoveQuoteAndApostropheCharacters",Se="listGetStats",be="listLinesToJsonArray",Ce="csvRemoveFirstColumnFromCsv",xe="csvRemoveLastColumnFromCsv",Oe="csvToJson",we="jsonFormat",Te="jsonMinify",ke="jsonSort",Ze="jsonRemoveProperty",Re="jsonFixDataTypes",Ne="jsonToLines",je="jsonToCsv",Ae="lessFormat",Ie="lessMinify",Le="lessToCss",ze=[ie,Oe,we,Ae,de],Ve={[te]:"",[ne]:"",[re]:"",[ae]:"",[oe]:""},Fe=I.Z,Je={[te]:{[ie]:{message:"Format CSS",Icon:q.Z},[se]:{message:"Minify CSS",Icon:L.Z},[ce]:{message:"CSS to SCSS",Icon:z.Z}},[ne]:{[Ce]:{message:"Remove first column from CSV",Icon:X.Z},[xe]:{message:"Remove last column from CSV",Icon:Y.Z},[Oe]:{message:"CSV to JSON",Icon:z.Z}},[re]:{[we]:{message:"Format JSON",Icon:q.Z},[Te]:{message:"Minify JSON",Icon:L.Z},[ke]:{message:"Sort JSON",Icon:Q.Z},[Ze]:{message:"Remove property",Icon:G.Z},[Re]:{message:"Fix data types",Icon:K.Z},[Ne]:{message:"JSON to lines",Icon:U.Z},[je]:{message:"JSON to CSV",Icon:$.Z}},[ae]:{[Ae]:{message:"Format LESS",Icon:q.Z},[Ie]:{message:"Minify LESS",Icon:L.Z},[Le]:{message:"LESS to CSS",Icon:z.Z}},[oe]:{[me]:{message:"Remove empty lines",Icon:V.Z},[ue]:{message:"Remove duplicates",Icon:F.Z},[de]:{message:"Sort",Icon:J.Z},[pe]:{message:"Case-insensitive sort",Icon:D.Z},[fe]:{message:"Natural sort",Icon:P.Z},[ye]:{message:"Randomize",Icon:_.Z},[ge]:{message:"Reverse",Icon:B.Z},[ve]:{message:"Trim lines",Icon:M.Z},[Ee]:{message:"Remove comma character at line ends",Icon:W.Z},[he]:{message:"Remove quote and apostrophe characters",Icon:H.Z},[Se]:{message:"Get stats",Icon:ee.Z},[be]:{message:"Lines to JSON Array",Icon:z.Z}}},De={};for(const e in Je){const t=Je[e];for(const e in t)De[e]=t[e]}for(const e in Je){const t=Je[e];for(const e in t)t[e].id=e}const Pe=Object.keys(De),_e=localStorage.getItem("recentOperations");let Be=[];try{Be=JSON.parse(_e),Array.isArray(Be)||(Be=ze)}catch(e){console.error(e)}Be.filter((e=>Pe.includes(e)));const Me=(0,j.cn)(Be);var We=n(54123),He=(n(8788),n(67266)),Ue=n.n(He);const $e=e=>e.trim(),qe=function(e){return function(e,t){return","===e[e.length-1]?e.substring(0,e.length-1):e}(e)},Ge=function(e){return e.replaceAll('"',"").replaceAll("'","")},Qe=e=>{const t=e.split(",");return t.pop(),t.join(",")},Ke=e=>{const t=e.split(",");return t.shift(),t.join(",")},Xe=function(e,t){const n=t(e);if("object"==typeof n)for(const e in n)n[e]=Xe(n[e],t);return n},Ye=function(e){return Xe(e,(function(e){if("string"==typeof e)"true"===e?e=!0:"false"===e?e=!1:"null"===e?e=null:String(Number(e))===e&&("Infinity"===String(Number(e))||"-Infinity"===String(Number(e))||"NaN"===String(Number(e))||(e=Number(e)));else if(Array.isArray(e))e=e.map((e=>Ye(e)));else if("object"==typeof e)for(const t in e)e[t]=Ye(e[t]);return e}))},et=async function({getInputValue:e,operation:t}){try{if([ie,se,ce,Ae,Ie,Le].includes(t)){const r=e();let a,o=null;const l={};switch(t){case ie:a=(0,We.RF)(r);break;case se:a=(0,We.BV)(r);break;case ce:""===r.trim()?a=r:(a=(0,We.AG)(r),"Error: no source supplied to csspretty."===a&&alert("Sorry! The CSS to SCSS conversion failed.\n\nPlease try again with some simpler syntax."));break;case Ae:a=(0,We.RF)(r);break;case Ie:a=(0,We.BV)(r);break;case Le:if(""===r.trim())a=r;else try{const e=await(async()=>await n.e(616).then(n.t.bind(n,56111,23)))();a=(await e.render(r)).css,a=(0,We.RF)(a)}catch(e){o=new Error(e.message+`\n(Line ${e.line}, Column ${e.column}) / (Character ${e.index})`),a=null;const t={row:e.line-1,column:e.column,position:e.index};l.moveCursorTo=t}}return[o,a,l]}if([we,Te,Ze,ke,Re,Ne,je].includes(t)){const n=e(),r=JSON.parse(n);let a;switch(t){case we:a=JSON.stringify(r,null,"\t");break;case Te:a=JSON.stringify(r);break;case Ze:{const e=(t,n)=>{t.hasOwnProperty(n)?delete t[n]:Object.keys(t).forEach((r=>{"object"==typeof t[r]?e(t[r],n):Array.isArray(t[r])&&t[r].forEach((t=>{"object"==typeof t&&e(t,n)}))}))},t=prompt("Please enter the name of the property to remove:");if(!t)return[new Error("Please provide a property name.")];e(r,t),a=JSON.stringify(r,null,"\t")}break;case ke:a=Ue()(r,{space:"\t"});break;case Re:a=Ye(r),a=JSON.stringify(a,null,"\t");break;case Ne:if(!Array.isArray(r)||!r.every((e=>"string"==typeof e)))return[new Error("Please provide an Array of Strings as the input.")];a=r.join("\n");break;case je:a=function(e){const t=[],n=[],r=Object.keys(e[0]);for(const e of r)t.push(e);n.push(t.join(","));for(const t of e){const e=[];for(const n of r)e.push(t[n]);n.push(e.join(","))}return n.join("\n")}(r)}return[null,a]}if(![Se].includes(t)){if([Ce,xe,Oe,me,ue,de,pe,fe,ye,ge,ve,Ee,he,be].includes(t)){const n=e().split("\n");let r=n;switch(t){case Ce:r=function(e){return e.map(Ke)}(n);break;case xe:r=function(e){return e.map(Qe)}(n);break;case Oe:r=function(e){const t=["["],n=e[0].split(",");for(let r=1;r<e.length;r++){const a=e[r].split(","),o={};for(let e=0;e<a.length;e++){const t=a[e];o[n[e]]=t}r<e.length-1?t.push("\t"+JSON.stringify(o)+","):t.push("\t"+JSON.stringify(o))}return t.push("]"),t}(n);break;case me:r=function(e){return e.filter((e=>e))}(n);break;case ue:r=function(e){return[...new Set(e)]}(n);break;case de:n.sort(),r=n;break;case pe:n.sort(((e,t)=>e.toLowerCase().localeCompare(t.toLowerCase()))),r=n;break;case fe:n.sort(((e,t)=>e.localeCompare(t,void 0,{numeric:!0}))),r=n;break;case ye:n.sort((()=>Math.random()-.5)),r=n;break;case ge:n.reverse(),r=n;break;case ve:r=function(e){return e.map($e)}(n);break;case Ee:r=function(e){return e.map(qe)}(n);break;case he:r=function(e){return e.map(Ge)}(n);break;case be:r=JSON.stringify(n,null,"\t"),r=r.split("\n")}return[null,r.join("\n")]}return[new Error(`Error: Implementation is not available for operation: ${t}`)]}if(t===Se){const t={},n=e(),r=n.split("\n");t.linesCount=r.length,t.charactersCount=n.length;const a=n.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ").replace(/\s+/g," ").split(" ");return t.wordsCount=a.length,t.uniqueWordsCount=new Set(a).size,[null,null,{stats:t}]}}catch(e){return[e]}},tt=function({editorRef:e,onValueUpdate:t,mode:n}){const[a,o]=(0,j.KO)(Me);return r.createElement("div",{style:{display:"flex",width:291,overflow:"hidden",paddingRight:10,marginLeft:"auto",flexDirection:"row-reverse"}},a.filter((e=>Je[n][e])).map(((l,i)=>{var s;const c=Je[n];return r.createElement("div",{key:i},r.createElement(g.Z,{size:"small",title:(null===(s=c[l])||void 0===s?void 0:s.message)||l,onClick:async()=>{const n=[l,...a],r=n.filter(((e,t)=>n.indexOf(e)===t));o(r),localStorage.setItem("recentOperations",JSON.stringify(r));const[i,s,c]=await et({getInputValue:()=>e.current.getValue(),operation:l});i?(console.error(i),alert(i.message)):null===s?alert(JSON.stringify(c,null,"\t")):(e.current.setValue(s),"function"==typeof t&&t(s))}},(()=>{var e;let t=null===(e=De[l])||void 0===e?void 0:e.Icon;return t||(t=Fe),r.createElement(t,{style:{fontSize:16}})})()))})))};tt.propTypes={editorRef:m().object.isRequired,onValueUpdate:m().func,mode:m().string.isRequired};const nt="MainEditor__translucentWithoutHover--GBmBJ",rt=async function(e){try{return await navigator.clipboard.writeText(e),!0}catch(e){return!1}},at=({mode:e,operation:t,selectedOperations:n})=>{const r={...f()};return r.mode||delete r.mode,e&&(r.mode=e),r.operation&&n[e]&&""!==t||delete r.operation,t&&(r.operation=t),r},ot=e=>le.indexOf(e)>=0?{wasAlreadyClean:!0,mode:e}:{wasAlreadyClean:!1,mode:oe},lt={[te]:"CSS",[ne]:"CSV",[re]:"JSON",[ae]:"LESS",[oe]:"List"},it=function({placeholder:e,onLoad:t,onValueUpdate:n,allowFileInput:a,style:i,editorWidth:s,editorHeight:c,autoApply:m,onComputeOutput:u,hideOperations:d}){const{enqueueSnackbar:f}=(0,o.Ds)(),[I,L]=(0,p.Z)("mode",re,{raw:!0}),[z,V]=(0,r.useState)(ot(I).mode),[F,J]=(0,l.lr)();(0,r.useEffect)((()=>{const e=F.get("mode");ot(e).wasAlreadyClean&&(L(e),V(e))}),[]);const[D,P]=(0,p.Z)("selectedOperations",JSON.parse(JSON.stringify(Ve))),_=D||JSON.parse(JSON.stringify(Ve)),B=_[z],[M,W]=(0,p.Z)("flagSyntaxHighlighting","yes",{raw:!0}),[H,U]=(0,j.KO)(Me),[$,q]=(0,p.Z)("flagLineWrap","yes",{raw:!0}),[G,Q]=(0,r.useState)(Date.now()),K=(()=>{if("yes"!==M)return"text";switch(z){case te:return"css";case ne:return"text";case re:return"json";case ae:return"less";default:return"text"}})(),X=(0,r.useRef)(null),Y=(0,A.y1)((e=>{f(e)}),32),ee=(0,A.y1)((async(e,t)=>{Q(Date.now()),m&&B&&await le()}),750),le=async()=>{const e=[B,...H],t=e.filter(((t,n)=>e.indexOf(t)===n));U(t),localStorage.setItem("recentOperations",JSON.stringify(t));const[r,a,o]=await et({getInputValue:()=>X.current.getValue(),operation:B});if(r)console.error(r),Y(r.message),o&&o.moveCursorTo&&(X.current.moveCursorToPosition({row:o.moveCursorTo.row,column:o.moveCursorTo.column}),X.current.focus());else if(null===a){const e=JSON.stringify(o,null,"\t");console.error(e),Y(e)}else"function"==typeof u?u({operation:B,output:a}):X.current.setValue(a),"function"==typeof n&&n(a)};return(0,r.useEffect)((()=>{m&&B&&(async()=>{await le()})()}),[m,B]),r.createElement("div",{style:i,className:"MainEditor__MainEditor--Q_tBg"},r.createElement("div",{style:{marginTop:10}},r.createElement("div",{style:{marginTop:20},className:nt},r.createElement("div",null,r.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"}},d&&r.createElement("div",null," "),r.createElement("div",{style:{display:"flex"}},r.createElement("div",null,r.createElement(Z.Z,{native:!0,value:z,style:{width:75,height:24,fontSize:11},onChange:e=>{const t=e.target.value;V(t),L(t);const n=at({mode:t,operation:_[t],selectedOperations:_});J(n)}},r.createElement("option",{value:te},"CSS"),r.createElement("option",{value:ne},"CSV"),r.createElement("option",{value:re},"JSON"),r.createElement("option",{value:ae},"Less"),r.createElement("option",{value:oe},"List"))),r.createElement("div",{style:{marginLeft:5}},(()=>{const e=z!==re&&z!==te&&z!==ae;let t;return t=e?"Syntax highlighting not available for this mode":"yes"===M?"Disable syntax highlighting":"Enable syntax highlighting",r.createElement(g.Z,{size:"small",title:t,onClick:()=>{e||W("yes"===M?"no":"yes")}},(()=>{let t,n;return t="yes"===M?S.Z:h.Z,n=e?"#ccc":"yes"===M?"#1976d2":void 0,r.createElement(t,{style:{fontSize:16,color:n}})})())})())),r.createElement("div",{style:{display:d?"none":"flex"}},r.createElement("div",{style:{marginLeft:5}},r.createElement(Z.Z,{native:!0,style:{width:125,height:28,fontSize:11,border:""===_[z]?"1px dashed orange":void 0},value:_[z],onChange:e=>{const t=e.target.value,n=JSON.parse(JSON.stringify(_));n[z]=t,P(n);const r=at({mode:z,operation:t,selectedOperations:_});J(r)}},r.createElement("option",{value:"",style:{color:"#777"}},"-- Operations --"),z===te&&r.createElement(r.Fragment,null,r.createElement("optgroup",{label:"Format"},r.createElement("option",{value:ie},"Format CSS"),r.createElement("option",{value:se},"Minify CSS")),r.createElement("optgroup",{label:"Transform"},r.createElement("option",{value:ce},"CSS to SCSS"))),z===ae&&r.createElement(r.Fragment,null,r.createElement("optgroup",{label:"Format"},r.createElement("option",{value:Ae},"Format Less"),r.createElement("option",{value:Ie},"Minify Less")),r.createElement("optgroup",{label:"Transform"},r.createElement("option",{value:Le},"Less to CSS"))),z===oe&&r.createElement(r.Fragment,null,r.createElement("optgroup",{label:"Lines"},r.createElement("option",{value:me},"Remove empty lines"),r.createElement("option",{value:ue},"Remove duplicates")),r.createElement("optgroup",{label:"Sort"},r.createElement("option",{value:de},"Sort"),r.createElement("option",{value:pe},"Case-insensitive sort"),r.createElement("option",{value:fe},"Natural sort"),r.createElement("option",{value:ye},"Randomize"),r.createElement("option",{value:ge},"Reverse")),r.createElement("optgroup",{label:"String"},r.createElement("option",{value:ve},"Trim lines"),r.createElement("option",{value:Ee},"Remove comma character at line ends"),r.createElement("option",{value:he},"Remove \" and ' characters")),r.createElement("optgroup",{label:"Stats"},r.createElement("option",{value:Se},"Get Stats")),r.createElement("optgroup",{label:"Transform"},r.createElement("option",{value:be},"Lines to JSON Array"))),z===ne&&r.createElement(r.Fragment,null,r.createElement("optgroup",{label:"Columns"},r.createElement("option",{value:Ce},"Remove first column from CSV"),r.createElement("option",{value:xe},"Remove last column from CSV")),r.createElement("optgroup",{label:"Transform"},r.createElement("option",{value:Oe},"CSV to JSON"))),z===re&&r.createElement(r.Fragment,null,r.createElement("optgroup",{label:"Format"},r.createElement("option",{value:we},"Format JSON"),r.createElement("option",{value:Te},"Minify JSON")),r.createElement("optgroup",{label:"Sort"},r.createElement("option",{value:ke},"Sort JSON")),r.createElement("optgroup",{label:"Edit"},r.createElement("option",{value:Ze},"Remove property")),r.createElement("optgroup",{label:"Fix"},r.createElement("option",{value:Re},"Fix data types")),r.createElement("optgroup",{label:"Transform"},r.createElement("option",{value:Ne},"JSON to Lines"),r.createElement("option",{value:je},"JSON to CSV"))))),r.createElement("div",{style:{marginLeft:5}},r.createElement(g.Z,{size:"small",title:"Insert sample value",onClick:()=>{const e=X.current;let t=[];switch(z){case te:t=t=["body {","    background-color: #f0f0f0;","}","","body h1 {","    color: #000000;","    font-size: 24px;","    font-weight: bold;","    text-align: center;","}",""];break;case ne:t=["Name,Age,Height","Charlie,22,1.85","Bob,21,1.75","Alice,20,1.65","David,23,1.95"];break;case re:t=["{",'    "data": [','        { "name": "Charlie", "age": 22, "height": 1.85 },','        { "name": "Bob",     "age": 21, "height": 1.75 },','        { "name": "Alice",   "age": 20, "height": 1.65 },','        { "name": "David",   "age": 23, "height": 1.95 }',"    ]","}"];break;case ae:t=["@color: #222;","","body {","    color: @color;","","    a {","        color: @color;","    }","}"];break;case oe:t=["Charlie","Bob","Alice","David"];break;default:t=["Please provide content here"]}e.setValue(t.join("\n"))}},r.createElement(E.Z,{style:{fontSize:16}}))),r.createElement("div",{style:{marginLeft:5}},r.createElement(v.Z,{variant:"contained",color:"primary",size:"small",startIcon:r.createElement(R.Z,null),disabled:""===B,onClick:async()=>{await le()},style:{height:28}},"Apply"))))),H.length>0&&r.createElement("div",{style:{marginTop:10,visibility:d?"hidden":"visible"}},r.createElement("div",{style:{display:"flex",flexDirection:"row-reverse",backgroundColor:"#f5f5f5",border:"1px solid #e0e0e0",borderRadius:999}},r.createElement("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",fontSize:12}},r.createElement(g.Z,{size:"small",title:"Reset suggested operations",onClick:()=>{U(ze),localStorage.setItem("recentOperations",JSON.stringify([]))}},r.createElement(N.Z,{style:{fontSize:16}}))),r.createElement("div",{style:{borderRight:"1px solid #e0e0e0"}}),r.createElement("div",{style:{backgroundColor:"#fff",width:"100%",borderTopLeftRadius:999,borderBottomLeftRadius:999}},r.createElement(tt,{editorRef:X,onValueUpdate:n,mode:z})))))),r.createElement("div",{style:{marginTop:10}},r.createElement("div",null,r.createElement(y.ZP,{placeholder:e||`Provide ${lt[z]} here`,setOptions:{wrap:"yes"===$},mode:K,theme:"github",onLoad:e=>{X.current=e,"function"==typeof t&&t(e)},onChange:(e,t)=>{(async()=>{await ee(e,t)})()},editorProps:{$blockScrolling:!0},width:s,height:c})),a&&r.createElement("div",{style:{marginTop:10}},r.createElement("input",{type:"file"}))),r.createElement("div",{style:{marginTop:10}},r.createElement("div",{className:nt,style:{display:"flex",justifyContent:"space-between"}},r.createElement("div",{style:{display:"flex"}},r.createElement(g.Z,{title:"Cut",size:"small",onClick:async()=>{const e=X.current;if(e){let t=e.getSelectedText();t||(e.selectAll(),t=e.getSelectedText()),await rt(t),e.execCommand("cut")}}},r.createElement(b.Z,{style:{fontSize:16}})),r.createElement(g.Z,{title:"Copy",size:"small",onClick:async()=>{const e=X.current;if(e){let t=e.getSelectedText();t||(e.selectAll(),t=e.getSelectedText()),await rt(t),e.execCommand("copy")}}},r.createElement(C.Z,{style:{fontSize:16}})),r.createElement(g.Z,{title:"Clear",size:"small",onClick:()=>{const e=X.current;e&&(e.getSelectedText()?e.execCommand("inserttext",{text:""}):e.setValue(""))}},r.createElement(x.Z,{style:{fontSize:16}})),r.createElement(g.Z,{title:"Undo",size:"small",disabled:G&&(!X.current||!X.current.getSession().getUndoManager().hasUndo()),onClick:()=>{const e=X.current;e&&e.execCommand("undo")}},r.createElement(O.Z,{style:{fontSize:16}})),r.createElement(g.Z,{title:"Redo",size:"small",disabled:G&&(!X.current||!X.current.getSession().getUndoManager().hasRedo()),onClick:()=>{const e=X.current;e&&e.execCommand("redo")}},r.createElement(w.Z,{style:{fontSize:16}})),r.createElement(g.Z,{title:"Toggle line wrap",size:"small",onClick:()=>{q("yes"===$?"no":"yes")}},r.createElement(T.Z,{style:{fontSize:16,color:"yes"===$?"#1976d2":void 0}})),r.createElement(g.Z,{title:"Save",size:"small",onClick:()=>{const e=X.current;if(e){const t=e.getValue(),n=new Blob([t],{type:"text/plain"}),r=document.createElement("a");let a;switch(r.href=URL.createObjectURL(n),z){case te:a="css";break;case ne:a="csv";break;case re:a="json";break;case ae:a="less";break;default:a="txt"}const o=new Date(Date.now()-60*(new Date).getTimezoneOffset()*1e3).toISOString().substring(0,19).replace("T"," ").replace(" ","_").replace(/:/g,"-");r.download=`output-${o}.${a}`,r.click()}}},r.createElement(k.Z,{style:{fontSize:16}}))))))};it.propTypes={placeholder:m().string,onLoad:m().func,onValueUpdate:m().func,allowFileInput:m().bool,style:m().object,editorWidth:m().string,editorHeight:m().string,autoApply:m().bool,onComputeOutput:m().func,hideOperations:m().bool};const st=()=>{const e=(0,r.useRef)(null);return r.createElement("div",null,r.createElement(it,{onLoad:t=>{e.current=t},style:{marginTop:5},editorWidth:"1120px",editorHeight:"300px"}))};var ct=n(54620),mt=n(22887),ut=n(78678);const dt={DoubleEditor:"DoubleEditor__DoubleEditor--molkI"},pt=()=>{const e=(0,r.useRef)(null),t=(0,r.useRef)(null),[n,a]=r.useState(!0);return r.createElement("div",{className:dt.TripleEditor},r.createElement("div",{style:{display:"flex",justifyContent:"center",minWidth:1120}},r.createElement("div",null,r.createElement("div",{style:{textAlign:"center",fontFamily:'"Transformers", sans-serif',fontSize:14,letterSpacing:"0.05em",color:"#777"}},r.createElement("span",{style:{fontSize:18}},"I"),"nput"),r.createElement("div",null,r.createElement(it,{onLoad:t=>{e.current=t},style:{marginTop:5},editorWidth:"500px",editorHeight:"300px",autoApply:n,onComputeOutput:({operation:e,output:n})=>{t.current.setValue(n)}}))),r.createElement("div",{style:{marginLeft:20}},r.createElement("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",marginTop:30}},r.createElement(ut.Z,{control:r.createElement(mt.Z,{checked:n,size:"small",onChange:e=>{const t=e.target.checked;a(t)}}),label:r.createElement("div",{style:{marginLeft:1}},r.createElement("span",{style:{fontSize:12}},"Auto-apply"))})),r.createElement("div",{style:{textAlign:"center"}}," "),r.createElement("div",{style:{marginTop:20,display:"flex",flexDirection:"column",justifyContent:"center"}},r.createElement("div",{style:{marginLeft:"auto",marginRight:"auto"}},r.createElement(g.Z,{variant:"filled",color:"primary",size:"small",onClick:()=>{const n=e.current.getValue(),r=t.current.getValue();e.current.setValue(r),t.current.setValue(n)}},r.createElement(ct.Z,null))))),r.createElement("div",{style:{marginLeft:10}},r.createElement("div",{style:{textAlign:"center",fontFamily:'"Transformers", sans-serif',fontSize:14,letterSpacing:"0.05em",color:"#777"}},r.createElement("span",{style:{fontSize:18}},"O"),"utput"),r.createElement("div",null,r.createElement(it,{placeholder:"Result of the operation will be available here",onLoad:e=>{t.current=e},style:{marginTop:5},editorWidth:"500px",editorHeight:"300px",hideOperations:!0})))))};var ft=n(96486);const yt=({editorARef:e,editorBRef:t,editorCRef:n,operation:r})=>{const a=e.current.getValue(),o=t.current.getValue(),l=a.split("\n"),i=o.split("\n");let s="";"append"===r?s=[...l,...i]:"union"===r?s=(0,ft.union)(l,i):"intersection"===r?s=(0,ft.intersection)(l,i):"difference"===r&&(s=(0,ft.difference)(l,i));const c=s.join("\n");n.current.setValue(c)},gt=function(){const e=(0,r.useRef)(null),t=(0,r.useRef)(null),n=(0,r.useRef)(null);return r.createElement("div",{className:"TripleEditor__TripleEditor--CeiGf"},r.createElement("div",{style:{display:"flex",justifyContent:"center",minWidth:1120}},r.createElement("div",null,r.createElement("div",{style:{textAlign:"center",fontFamily:'"Transformers", sans-serif',fontSize:20,color:"#777"}},"A"),r.createElement("div",null,r.createElement(it,{onLoad:t=>{e.current=t},style:{marginTop:5},editorWidth:"360px",editorHeight:"300px"}))),r.createElement("div",{style:{marginLeft:10}},r.createElement("div",{style:{textAlign:"center"}}," "),r.createElement("div",{style:{marginTop:55,display:"flex",flexDirection:"column",justifyContent:"center",height:"300px"}},r.createElement(g.Z,{variant:"filled",color:"primary",size:"small",onClick:()=>{const n=e.current.getValue(),r=t.current.getValue();e.current.setValue(r),t.current.setValue(n)}},r.createElement(ct.Z,null)))),r.createElement("div",{style:{marginLeft:10}},r.createElement("div",{style:{textAlign:"center",fontFamily:'"Transformers", sans-serif',fontSize:20,color:"#777"}},"B"),r.createElement("div",null,r.createElement(it,{onLoad:e=>{t.current=e},style:{marginTop:5},editorWidth:"360px",editorHeight:"300px"}))),r.createElement("div",{style:{marginLeft:10}},r.createElement("div",{style:{textAlign:"center"}}," "),r.createElement("div",{style:{marginTop:55,display:"flex",flexDirection:"column",justifyContent:"center",height:"300px"}},r.createElement(v.Z,{variant:"contained",size:"small",type:"button",style:{display:"block"},onClick:()=>{yt({editorARef:e,editorBRef:t,editorCRef:n,operation:"union"})}},"A ∪ B"),r.createElement(v.Z,{variant:"contained",size:"small",type:"button",style:{display:"block",marginTop:5},onClick:()=>{yt({editorARef:e,editorBRef:t,editorCRef:n,operation:"intersection"})}},"A ∩ B"),r.createElement(v.Z,{variant:"contained",size:"small",type:"button",style:{display:"block",marginTop:5},onClick:()=>{yt({editorARef:e,editorBRef:t,editorCRef:n,operation:"append"})}},"A + B"),r.createElement(v.Z,{variant:"contained",size:"small",type:"button",style:{display:"block",marginTop:5},onClick:()=>{yt({editorARef:e,editorBRef:t,editorCRef:n,operation:"difference"})}},"A − B"))),r.createElement("div",{style:{marginLeft:10}},r.createElement("div",{style:{textAlign:"center",fontFamily:'"Transformers", sans-serif',fontSize:20,color:"#777"}},"C"),r.createElement("div",null,r.createElement(it,{placeholder:"Result of the operation will be available here",onLoad:e=>{n.current=e},style:{marginTop:5},editorWidth:"360px",editorHeight:"300px",hideOperations:!0})))))};function vt(){return vt=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},vt.apply(this,arguments)}const Et=function(e){const{children:t,value:n,index:a,...o}=e;return r.createElement("div",vt({hidden:n!==a},o),r.createElement("div",null,t))};Et.propTypes={children:m().node,index:m().number.isRequired,value:m().number.isRequired};const ht=e=>"1"===e||"2"===e||"3"===e?{wasAlreadyClean:!0,transformers:e}:{wasAlreadyClean:!1,transformers:"2"},St=()=>{const[e,t]=(0,p.Z)("transformers","2",{raw:!0}),n=ht(e).transformers,a=parseInt(n,10),[o,i]=(0,r.useState)(a-1),[s,c]=(0,l.lr)();return(0,r.useEffect)((()=>{const e=s.get("transformers"),n=ht(e);n.wasAlreadyClean&&(t(e),i(parseInt(n.transformers,10)-1))}),[]),r.createElement("div",null,r.createElement("div",{style:{display:"flex",justifyContent:"center",minWidth:"1120"}},r.createElement(u.Z,{value:o,onChange:(e,n)=>{i(n);const r=""+(n+1);t(r);const a={...f()};a.transformers=r,c(a)}},r.createElement(d.Z,{label:r.createElement("div",{style:{fontFamily:'"Transformers", sans-serif',fontVariant:"small-caps",textTransform:"none",fontSize:18}},"Transformers I")}),r.createElement(d.Z,{label:r.createElement("div",{style:{fontFamily:'"Transformers", sans-serif',fontVariant:"small-caps",textTransform:"none",fontSize:18}},"Transformers II")}),r.createElement(d.Z,{label:r.createElement("div",{style:{fontFamily:'"Transformers", sans-serif',fontVariant:"small-caps",textTransform:"none",fontSize:18}},"Transformers III")}))),r.createElement("div",{style:{marginTop:40,display:"flex",justifyContent:"center",minWidth:"1120"}},r.createElement(Et,{value:o,index:0},r.createElement("div",null,r.createElement(st,null))),r.createElement(Et,{value:o,index:1},r.createElement("div",null,r.createElement(pt,null))),r.createElement(Et,{value:o,index:2},r.createElement(gt,null))))},bt=()=>r.createElement("div",{className:"Dashboard__Dashboard--d2pNX"},r.createElement("div",{style:{marginTop:35}},r.createElement(St,null)));var Ct=n(76990);class xt extends r.Component{render(){return r.createElement("div",{className:"PageFooter__PageFooter--yI25Y"},r.createElement("div",{style:{display:"flex",justifyContent:"center",marginTop:45,marginBottom:20}},r.createElement("div",null,r.createElement("div",null,r.createElement(Ct.Q,null)))))}}const Ot=(0,l.aj)([{path:window.location.pathname,element:r.createElement("div",null,r.createElement(s,null),r.createElement("div",null,r.createElement(bt,null)),r.createElement(xt,null))}]);class wt extends r.Component{render(){return r.createElement(o.wT,{anchorOrigin:{vertical:"top",horizontal:"right"},maxSnack:3,dense:!0,preventDuplicate:!0,autoHideDuration:3e3},r.createElement(i.pG,{router:Ot}))}}const Tt=document.getElementById("root");(0,a.s)(Tt).render(r.createElement(wt,null))}},l={};function i(e){var t=l[e];if(void 0!==t)return t.exports;var n=l[e]={id:e,loaded:!1,exports:{}};return o[e].call(n.exports,n,n.exports,i),n.loaded=!0,n.exports}i.m=o,i.amdD=function(){throw new Error("define cannot be used indirect")},e=[],i.O=(t,n,r,a)=>{if(!n){var o=1/0;for(m=0;m<e.length;m++){for(var[n,r,a]=e[m],l=!0,s=0;s<n.length;s++)(!1&a||o>=a)&&Object.keys(i.O).every((e=>i.O[e](n[s])))?n.splice(s--,1):(l=!1,a<o&&(o=a));if(l){e.splice(m--,1);var c=r();void 0!==c&&(t=c)}}return t}a=a||0;for(var m=e.length;m>0&&e[m-1][2]>a;m--)e[m]=e[m-1];e[m]=[n,r,a]},i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},n=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,i.t=function(e,r){if(1&r&&(e=this(e)),8&r)return e;if("object"==typeof e&&e){if(4&r&&e.__esModule)return e;if(16&r&&"function"==typeof e.then)return e}var a=Object.create(null);i.r(a);var o={};t=t||[null,n({}),n([]),n(n)];for(var l=2&r&&e;"object"==typeof l&&!~t.indexOf(l);l=n(l))Object.getOwnPropertyNames(l).forEach((t=>o[t]=()=>e[t]));return o.default=()=>e,i.d(a,o),a},i.d=(e,t)=>{for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.f={},i.e=e=>Promise.all(Object.keys(i.f).reduce(((t,n)=>(i.f[n](e,t),t)),[])),i.u=e=>"chunk.lessNpmPackage.e393786a894ce095e023.js",i.miniCssF=e=>{},i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r={},a="transformers:",i.l=(e,t,n,o)=>{if(r[e])r[e].push(t);else{var l,s;if(void 0!==n)for(var c=document.getElementsByTagName("script"),m=0;m<c.length;m++){var u=c[m];if(u.getAttribute("src")==e||u.getAttribute("data-webpack")==a+n){l=u;break}}l||(s=!0,(l=document.createElement("script")).charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.setAttribute("data-webpack",a+n),l.src=e),r[e]=[t];var d=(t,n)=>{l.onerror=l.onload=null,clearTimeout(p);var a=r[e];if(delete r[e],l.parentNode&&l.parentNode.removeChild(l),a&&a.forEach((e=>e(n))),t)return t(n)},p=setTimeout(d.bind(null,void 0,{type:"timeout",target:l}),12e4);l.onerror=d.bind(null,l.onerror),l.onload=d.bind(null,l.onload),s&&document.head.appendChild(l)}},i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e;i.g.importScripts&&(e=i.g.location+"");var t=i.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var n=t.getElementsByTagName("script");n.length&&(e=n[n.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),i.p=e})(),(()=>{var e={826:0};i.f.j=(t,n)=>{var r=i.o(e,t)?e[t]:void 0;if(0!==r)if(r)n.push(r[2]);else{var a=new Promise(((n,a)=>r=e[t]=[n,a]));n.push(r[2]=a);var o=i.p+i.u(t),l=new Error;i.l(o,(n=>{if(i.o(e,t)&&(0!==(r=e[t])&&(e[t]=void 0),r)){var a=n&&("load"===n.type?"missing":n.type),o=n&&n.target&&n.target.src;l.message="Loading chunk "+t+" failed.\n("+a+": "+o+")",l.name="ChunkLoadError",l.type=a,l.request=o,r[1](l)}}),"chunk-"+t,t)}},i.O.j=t=>0===e[t];var t=(t,n)=>{var r,a,[o,l,s]=n,c=0;if(o.some((t=>0!==e[t]))){for(r in l)i.o(l,r)&&(i.m[r]=l[r]);if(s)var m=s(i)}for(t&&t(n);c<o.length;c++)a=o[c],i.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return i.O(m)},n=self.webpackChunktransformers=self.webpackChunktransformers||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var s=i.O(void 0,[360,375],(()=>i(13373)));s=i.O(s)})();
//# sourceMappingURL=bundle.index.7c2cfcf2e09c25bfea48.js.map