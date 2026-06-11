const cursor =
document.querySelector('.cursor');

const glow =
document.querySelector('.cursor-glow');

document.addEventListener(
'mousemove',
(e)=>{

cursor.style.left =
e.clientX + 'px';

cursor.style.top =
e.clientY + 'px';

glow.style.left =
e.clientX + 'px';

glow.style.top =
e.clientY + 'px';

}
);

window.addEventListener(
'scroll',
()=>{

const height =

document.documentElement.scrollHeight

-

window.innerHeight;

const scrolled =

(window.scrollY/height)*100;

document.getElementById(
'progress'
).style.width =
scrolled + '%';

}
);
let allPosts = [];

fetch("data/posts.json")
.then(response => response.json())
.then(posts => {

allPosts = posts;

renderPosts(posts);

});

function renderPosts(posts){

const blogList =
document.getElementById("blogList");

if(!blogList) return;

blogList.innerHTML = "";

posts.forEach(post => {

const card =
document.createElement("a");

card.className = "card";

card.href = post.link;

card.innerHTML = `

<span class="date">
${post.date}
</span>

<h2>
${post.title}
</h2>

<p>
${post.description}
</p>

<div class="read">
Read Article →
</div>

`;

blogList.appendChild(card);

});

}

function filterPosts(category){

if(category === "All"){

renderPosts(allPosts);

return;

}

const filtered =
allPosts.filter(post =>
post.category === category
);

renderPosts(filtered);

}

const searchInput =
document.getElementById("searchInput");

if(searchInput){

searchInput.addEventListener(
"keyup",
()=>{

const search =
searchInput.value.toLowerCase();

const filtered =
allPosts.filter(post =>

post.title
.toLowerCase()
.includes(search)

||

post.description
.toLowerCase()
.includes(search)

||

(post.category || "")
.toLowerCase()
.includes(search)

);

renderPosts(filtered);

});

}
