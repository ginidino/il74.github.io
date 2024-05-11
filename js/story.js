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
                "<button class='delete-btn' onclick='deleteStory(" + index + ")'>Delete</button>" +
                "<button class='comment-btn' onclick='toggleCommentForm(" + index + ")'>Comment</button>" +
                "<div id='commentForm-" + index + "' class='comment-form' style='display: none;'>" +
                    "<label for='commentContent-" + index + "'>Comment:</label><br>" +
                    "<textarea id='commentContent-" + index + "' rows='4' cols='50'></textarea><br>" +
                    "<button onclick='submitComment(" + index + ")'>Submit Comment</button>" +
                "</div>";

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

function toggleCommentForm(index) {
    var commentForm = document.getElementById("commentForm-" + index);
    if (commentForm.style.display === "none") {
        commentForm.style.display = "block";
    } else {
        commentForm.style.display = "none";
    }
}

function submitComment(index) {
    var commentContent = document.getElementById("commentContent-" + index).value;
    if (commentContent.trim() !== "") {
        var storiesList = JSON.parse(localStorage.getItem("stories")) || [];
        var story = storiesList[index];
        if (!story.comments) {
            story.comments = [];
        }
        story.comments.push(commentContent);
        localStorage.setItem("stories", JSON.stringify(storiesList));
        displayComments(index);
    }
}

function displayComments(index) {
    var storiesList = JSON.parse(localStorage.getItem("stories")) || [];
    var story = storiesList[index];
    var commentsHTML = "";
    if (story.comments && story.comments.length > 0) {
        commentsHTML += "<div class='comments'><h3>Comments</h3><ul>";
        story.comments.forEach(function(comment) {
            commentsHTML += "<li>" + comment + "</li>";
        });
        commentsHTML += "</ul></div>";
    }
    document.getElementById("story-" + index).innerHTML += commentsHTML;
}

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
