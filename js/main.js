//start link reloads page to get back to start
let startLink = document.getElementById("start-link");

startLink.addEventListener("click", () => {
    location.reload();
});

//get all other links and add eventlistner to all with loop
const links = document.querySelectorAll(".content-links");

for(let link of links) {
    link.addEventListener("click", () => {
        //call function with link id
        fetchData(link.id);
    });
} 

async function fetchData(id) {
    try { 
        const response = await fetch("https://codexplained.se/simple_json.php");
        if (!response.ok) {
            throw new Error ("Http error: " + response.status);
        }
        const data = await response.json();

        //using id to know what page to show
        switch(id) {
            case "blog-posts": 
                document.getElementById("content").innerHTML = "";

                //loop through blog posts
                for (let post of data.blog_posts) {

                //generate blog posts and add to content div
                document.getElementById("content").innerHTML += `
                <div>
                    <h2 class="blog-headers">${post.title}</h2>
                    <div class="wrapper">
                        <i>${post.date}</i>
                        <p>${post.text}</p>
                        <i>Tags: ${post.tags.join(", ")}</i>
                    </div>
                </div>`;
                }

                //toggle blog posts content
                const blogHeaders = document.querySelectorAll(".blog-headers");

                for (let header of blogHeaders) {
                    header.addEventListener("click", (e) => {
                    $(e.target.nextElementSibling).slideToggle();  
                    })
                };

                break;
            
            case "author": 
                //generate content for author page
                document.getElementById("content").innerHTML = `
                <div>
                    <h2>${data.author}</h2>
                    <p>Lorem ipsum dolor sit amet. Non quos mollitia ut saepe omnis ex autem optio non molestias dolor! Ut expedita neque est temporibus facilis ea itaque ullam non quis autem eos iste illum? Ut labore blanditiis est reiciendis consequatur et dolorem fugit ab modi quidem sed fugiat odit et animi optio?</p>
                </div>`;
                break;

            case "about": 
                //generate content for about page
                document.getElementById("content").innerHTML = `
                <div>
                    <h2>The nonsense blog</h2>
                    <p>${data.about}</p>
                </div>`;
            break;
        }

        if (id.search("-") != -1) {
            id = id.replace("-", " ");
        }

        let headline = id.charAt(0).toUpperCase() + id.slice(1);
        
        document.getElementById("header").innerText = headline;
            
     } catch (error) {
         console.log(error);
     }
}