document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("storyForm").addEventListener("submit", function(event) {
        event.preventDefault();
        
        var title = document.getElementById("title").value;
        var category = document.getElementById("categoryList").value;
        var image = document.getElementById("image").files[0];
        var content = document.getElementById("content").value;


        var newStory = {
            title: title,
            category: category,
            image: image,
            content: content
        };

        var storiesList = JSON.parse(localStorage.getItem("stories")) || [];

        storiesList.push(newStory);

        localStorage.setItem("stories", JSON.stringify(storiesList));

        window.location.href = "storytelling.html";
    });
});

function addNewStory(title, category, image, content) {
    var newStory = {
        title: title,
        category: category,
        image: image,
        content: content
    };

    var storiesList = JSON.parse(localStorage.getItem("stories")) || [];
    storiesList.push(newStory);
    localStorage.setItem("stories", JSON.stringify(storiesList));
}
