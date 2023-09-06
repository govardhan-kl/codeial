class ToggleLike{
    constructor(togglElement){
        this.toggler = togglElement;
        this.toggleLike()
    }

    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault()
            let self = this;

            $.ajax({
                type: "post",
                url: $(self).attr('href'),
                // data: "data",
                // dataType: "dataType",
                // success: function (response) {
                // }
            })
            .done(function(data){
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log(likesCount)
                if (data.data.deleted == true){
                    likesCount -=1;
                }else{
                    likesCount +=1;
                }

                $(self).attr('data-likes',likesCount);
                $(self).html(`${likesCount} Likes`)
            })
            .fail(function(err){
                console.log('Error in completing req',err);
            });
        });
    }

}