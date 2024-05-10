document.getElementById("createBtn").addEventListener("click", function() {
    window.location.href = "create_story.html";
});

function deleteStory(index) {
    var storiesList = JSON.parse(localStorage.getItem("stories")) || [];
    storiesList.splice(index, 1); 
    localStorage.setItem("stories", JSON.stringify(storiesList)); 
    displayStories(); 
}

function editStory(index) {
    var storiesList = JSON.parse(localStorage.getItem("stories")) || [];
    var story = storiesList[index];
    
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";

    document.getElementById("editTitle").value = story.title;
    document.getElementById("editContent").value = story.content;
    document.getElementById("editCategory").value = story.category;

    document.getElementById("saveChangesBtn").onclick = function() {
        story.title = document.getElementById("editTitle").value;
        story.content = document.getElementById("editContent").value;
        story.category = document.getElementById("editCategory").value;

        localStorage.setItem("stories", JSON.stringify(storiesList));

        displayStories();

        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    span.onclick = function() {
        modal.style.display = "none";
    };
}

function displayStories() {
    var storiesList = JSON.parse(localStorage.getItem("stories")) || [];
    var storiesHTML = "";

    if (storiesList.length === 0) {
        document.querySelector(".stories-window").style.display = "none";
    } else {
        document.querySelector(".stories-window").style.display = "block";

        storiesList.forEach(function (story, index) {
            storiesHTML += "<div class='story' id='story-" + index + "' data-category='" + story.category + "'>" +
                "<h2>" + story.title + "</h2>" +
                "<p>" + story.content + "</p>" +
                "<p><strong>Category:</strong> " + story.category + "</p>" +
                "<button class='edit-btn' onclick='editStory(" + index + ")'>Edit</button>" +
                "<button class='delete-btn' onclick='deleteStory(" + index + ")'>Delete</button>";

            if (story.image) {
                storiesHTML += "<p>Image Selected</p>";
            } else {
                storiesHTML += "<div class='no-image'></div>";
            }

            storiesHTML += "</div>";
        });
    }

    document.getElementById("storiesList").innerHTML = storiesHTML;
}

displayStories();

document.getElementById("categoryList").addEventListener("change", function() {
    var selectedCategory = this.value;
    var stories = document.getElementsByClassName("story");
    
    for (var i = 0; i < stories.length; i++) {
        var story = stories[i];
        var category = story.getAttribute("data-category");
        
        if (selectedCategory === "Select the Category" || category === selectedCategory) {
            story.style.display = "block";
        } else {
            story.style.display = "none";
        }
    }
});
