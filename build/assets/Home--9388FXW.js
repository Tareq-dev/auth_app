import{r as i,u as l,j as e,L as d,a as x,_ as m}from"./index-j-XsDt15.js";import{a as o,s as u}from"./firebase.auth-b51KMj2X.js";function g(){const[t,n]=i.useState(null),[a,s]=i.useState(!1);return i.useEffect(()=>{s(!0);const r=o.onAuthStateChanged(c=>{n(c),s(!1)});return()=>r()},[]),[t,a]}function f(){const[t,n]=g(),a=l(),s=async()=>{try{await u(o),a("/login"),m.success("Logged Out"),localStorage.removeItem("rememberMeToken")}catch(r){console.error("Error during logout:",r.message)}};return e.jsx("div",{className:"flex justify-center items-center h-screen",children:n?e.jsx(d,{}):e.jsxs("div",{children:[t!=null&&t.email?e.jsx("h1",{className:"text-2xl text-center",children:"lOGGED IN USER"}):e.jsxs("div",{children:[e.jsx("h1",{className:"text-2xl text-center",children:"Home Page"}),e.jsx("div",{className:"flex justify-center",children:e.jsxs(x,{to:"/login",children:[e.jsx("button",{className:"px-4 py-2 text-white mt-6 bg-[#27634D] rounded-md",children:"Login"})," "]})})]}),(t==null?void 0:t.email)&&e.jsxs("div",{children:[e.jsxs("p",{className:"text-center bg-black px-3 py-1 rounded-md text-white mt-5",children:["Email: ",t==null?void 0:t.email]}),e.jsx("div",{className:"flex justify-center gap-7 mt-8 text-white font-semibold",children:e.jsx("button",{onClick:s,className:"px-4 py-2 bg-[#27634D] rounded-md",children:"Logout"})})]})]})})}export{f as default};
