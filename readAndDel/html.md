# HTML Notes

## background
* Every website has 2 parts - Frontend and Backend
* Frontend - (Eg -  Building) 
    - HTML(Hypertext markup language): determines the layout of the page (structure of building -layout, walls etc)
    - CSS(Cascading Stylesheets): determines the styling of the page (painting, lighting etc)
    - Javascript: adds frontend functionlity (elevator functionality)
* How websites are loaded(basics)
    - when you enter url it follows http or https protocol to the website server for the home page/ index page.(Get Request)
    - server figures out what page to send and replies to the request
    - Once the request is received, the browser(client) creates a DOM(document object model) of the page received.
    - DOM contains the elements in the page(paragraphs, images, links etc)
    - Many of the elements in the page themselves are links to other internet resources(images, fonts etc) and the browser sends separate http/ https requests to the server while constructing the DOM
    - Many of such requests are sent in parallel so the page load is faster.
    - Once DOM is constructed, the browser renders/ displays the page to the user.
     