/** 
 * Kopiera in koden från föregående uppgift "6-exercise"
 * 
 * Bygg vidare på inläggslistan
 * - Se till att varje inlägg endast visar sin rubrik, resten av inlägget skall vara dolt
 * - Rubriken skall vara en klickbar länk (som EJ laddar om sidan)
 * - När man trycker på en rubrik, då skall inläggets innehåll visas under rubriken. Trycker man igen, då döljs innehållet återigen.
 * - Extra (jQuery): Försök lägga till en animation som visar/döljer inläggsinnehållet på ett snyggt sätt. Ex slide up/slide down
 * 
 *
 */

 let blogLink = document.getElementById("blog-link");
 let authorLink = document.getElementById("author-link");
 let aboutLink = document.getElementById("about-link");
 let startLink = document.getElementById("start-link");

 startLink.addEventListener("click", () => {
    location.reload();
 })

 blogLink.addEventListener("click", () => {
    fetchData(blogLink);
 })
 
 authorLink.addEventListener("click", () => {
    fetchData(authorLink);
 
 })
 
 aboutLink.addEventListener("click", () => {
    fetchData(aboutLink);
 })
 
 async function fetchData(content) {
     try { 
        const response = await fetch("https://codexplained.se/simple_json.php");
        if (!response.ok) {
            throw new Error ("Http error: " + response.status);
        }
        const data = await response.json();

        switch(content) {
            
            case blogLink: 
                document.getElementById("header").innerText = "Blog Posts";
                document.getElementById("content").innerHTML = "";

                for (let i = 0; i < data.blog_posts.length; i++) {
                
                let tags = "";
         
                for(let tag of data.blog_posts[i].tags) {
                    tags += `${tag}, `
                }

                document.getElementById("content").innerHTML += `
                <div>
                    <h2 id="blog-header${i+1}">${data.blog_posts[i].title}</h2>
                    <div class="wrapper">
                        <i>${data.blog_posts[i].date}</i>
                        <p>${data.blog_posts[i].text}</p>
                        <i>Tags: ${tags.slice(0, -2)}</i>
                    </div>
                </div>`;
                }

                toggleBlogContent("blog-header1");
                toggleBlogContent("blog-header2");
                toggleBlogContent("blog-header3");

                break;
            
            case authorLink: 
                document.getElementById("header").innerText = "Author";
                document.getElementById("content").innerHTML = `
                <div>
                    <h2>${data.author}</h2>
                    <p>Lorem ipsum dolor sit amet. Non quos mollitia ut saepe omnis ex autem optio non molestias dolor! Ut expedita neque est temporibus facilis ea itaque ullam non quis autem eos iste illum? Ut labore blanditiis est reiciendis consequatur et dolorem fugit ab modi quidem sed fugiat odit et animi optio?</p>
                </div>`;
                break;

            case aboutLink: 
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

function toggleBlogContent(blogHeader) {
    document.getElementById(blogHeader).addEventListener("click", () => {
        let wrapperDiv = document.getElementById(blogHeader).nextElementSibling;
        wrapperDiv.classList.toggle("wrapper");
    })
}