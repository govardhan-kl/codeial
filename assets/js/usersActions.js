//alert("click background image to increase height");
{
    $('#div1').click(function(){
        $(this).height($(this).height() + 10 + "px");
    })

    //Methode to submit post request using AJAX
    let createPost = function(){
        let postForm = $('#post-form');

        postForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                url:'/posts/create-comments',
                method: 'post',
                data: postForm.serialize(),//this converts the post form data into JSON
                success:function(data){
                    console.log(data)// we are getting this data from posts_controller
                    let newPost = newPostDom(data.data.post,data.data.username)
                    $('#post-container').prepend(newPost);
                    deletePost($(' .delete-posts', newPost))//delete-post class inside newPost, space is needed
                    new ToggleLike($(' .toggle-like-button', newPost))
                },
                error: function(err){
                    console.log('Error',err);
                }
            })
        })
    }

    // Methode to create a post in DOM
    function newPostDom(i, username){
        return $(
        `
        <div id="${i._id}">
            <div>
                <p class="contents">${i.content }</p>
                <p><b>${ username }</b>
                    <a class="delete-posts" href="/posts/delete/${i._id}">X</a>
                </p>
            </div>
            <form action="/comments/create-comments" method="post">
                <textarea name="content"  cols="35" rows="2" placeholder="write a comment" required></textarea>
                <input type="hidden" name="post" value="${ i._id }">
                <button type="submit">Add comments</button>
            </form>
            <div>
                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${ i._id }&type=Posts">
                    0 Likes
                </a>
            </div>
            <div class="commentsection">
                <ul id="${ i._id }">
                </ul>
            </div>
        </div>
        `)
    }

    createPost();

    
    let deletePost = function(delLink){
        $(delLink).click(function(e){
            e.preventDefault();
            console.log(e);
            $.ajax({
                method:'get',
                url: $(delLink).prop('href'),
                success: function(data){
                    console.log('Data is',data,`#${data.data.post_id}`)
                    $(`#${data.data.post_id}`).remove();
                },
                error:function(err){
                    console.log('Error is',err.responseText)
                }
            });
        });
    }

    for (let i of $('.delete-posts')){
        // console.log($(i).prop('href'))
        deletePost($(i))
    }
    
}
