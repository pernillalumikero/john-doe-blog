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
                document.getElementById("header").innerText = "Blog posts";
                document.getElementById("content").innerHTML = "";

                //loop through blog posts
                for (let i = 0; i < data.blog_posts.length; i++) {
                
                let tags = "";
                //looping through tags to add comma and space
                for(let tag of data.blog_posts[i].tags) {
                    tags += `${tag}, `
                }

                //generate blog posts and add to content div
                document.getElementById("content").innerHTML += `
                <div>
                    <h2 id="blog-header${i+1}" class="blog-headers">${data.blog_posts[i].title}</h2>
                    <div class="wrapper">
                        <i>${data.blog_posts[i].date}</i>
                        <p>${data.blog_posts[i].text}</p>
                        <i>Tags: ${tags.slice(0, -2)}</i>
                    </div>
                </div>`;
                }

                //toggle blog posts content
                const blogHeaders = document.querySelectorAll(".blog-headers");
                
                for (let header of blogHeaders) {
                    document.getElementById(header.id).addEventListener("click", (e) => {
                       $(e.target.nextElementSibling).slideToggle();  
                    })
                };

                break;
            
            case "author": 
                //generate content for author page
                document.getElementById("header").innerText = "Author";
                document.getElementById("content").innerHTML = `
                <div>
                    <h2>${data.author}</h2>
                    <p>Lorem ipsum dolor sit amet. Non quos mollitia ut saepe omnis ex autem optio non molestias dolor! Ut expedita neque est temporibus facilis ea itaque ullam non quis autem eos iste illum? Ut labore blanditiis est reiciendis consequatur et dolorem fugit ab modi quidem sed fugiat odit et animi optio?</p>
                </div>`;
                break;

            case "about": 
                //generate content for about page
                document.getElementById("header").innerText = "About";
                document.getElementById("content").innerHTML = `
                <div>
                    <h2>The nonsense blog</h2>
                    <p>${data.about}</p>
                </div>`;
            break;
        }
            
     } catch (error) {
         console.log(error);
     }
}