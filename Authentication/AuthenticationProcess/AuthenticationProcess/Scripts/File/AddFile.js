

    $(document).ready(function () {

        ein_add_file_form.init();
        ein_file_tag_handler.init();

        $('#AddFile_form').validate({

            errorClass: 'error',
            validClass: 'valid',
         
            highlight: function (element) {
                $(element).closest('div').addClass("f_error");
                $(element).closest('div').addClass("fixErrorPosition");
                setTimeout(function () {

                }, 200)
            },
            unhighlight: function (element) {
                $(element).closest('div').removeClass("f_error");
                $(element).closest('div').removeClass("fixErrorPosition");
                setTimeout(function () {

                }, 200)
            },
            errorPlacement: function (error, element) {
                $(element).closest('div').append(error);
            }
        });


    });

$('#filenextScreen').click(function () {
    ein_add_file_form.next();
});

$('#closefilebtn').click(function () {
    ein_add_file_form.show();
    ein_file_tag_handler.init();
    $('#hdnFileAssignedTags').val("");
});

$('#closefilebtnHeader').click(function () {
    ein_add_file_form.show(); 
    ein_file_tag_handler.init();
    $('#hdnFileAssignedTags').val("");
});
$('#filepostbutton').click(function () {
    $('#hdnFileAssignedTags').val($("#file_tag_handler").tagHandler("getSerializedTags"));       //serialize tags
    var efiles= $('#attachments')
    if (filePath) {
        $("#fullspinner").show();
        //$('#filepostbutton').attr('disabled', true);
         $("#filepostbutton").hide('slow');
       $("#closefilebtn").hide('slow');
       return true;
    }
    else {
        alert("Please select file.")
        return false;
    }



});

var filePath = "";

//* add file form
ein_add_file_form = {
    init: function () {
        this.show()
    },
    show: function () {

        var spaceId = $("#allSpaceId").text();

        //console.log('spaceId: ' + spaceId);

        if (spaceId != "") {

            $('#filespaces').show();
            $('#filepostdata').hide();
            $('#filepostbutton').hide();
            $('#filenextScreen').show();
            $('#spacedrop').prop("selectedIndex", 0);
            
            clearForm();
            //file = "";
            //document.getElementById("Description").value = '';
           // $('#Description').val('');
            //$('#file_tag_handler').val('');
        }
        else {

            this.next();
        }
    },
    next: function () {
        $('#filespaces').hide('slow');
        $('#filepostdata').show();
        $('#filepostbutton').show();
        $('#filenextScreen').hide();
        clearForm();
       
        
      
    }
}

//* tag handler
ein_file_tag_handler = {
    init: function () {

        var args = "";
        var loc = window.location.protocol + "//" + window.location.host;

        $.ajax({
            type: "GET",
            url: loc + '/api/content/GetAllTags',
            data: "{" + args + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onfiletagSuccess
            
        });
    }
};

function onfiletagSuccess(response) {
    

    $("#file_tag_handler").tagHandler({
        availableTags: response,
        autocomplete: true,
        onAdd: onFileTagAdd,
        allowAdd: true
      
    });
}


function onFileTagAdd(tag) {
    
    var assignedTags = $('#hdnFileAssignedTags');
    var tags = assignedTags.val();

    if (tags.length == 0)
        tags = tag;
    else
        tags = tags + ';' + tag;

    assignedTags.val(tags);
}



function onUploadProgress(e) {
    alert("Upload Start");
    // alert("Upload progress :: " + e.percentComplete + "% :: " + getFileInfo(e));
    //$('#lblUploadProgress').text();

}

function getFileInfo(e) {
    return $.map(e.files, function (file) {
        var info = file.name;

        // File size is not available in all browsers
        if (file.size > 0) {
            info += " (" + Math.ceil(file.size / 1024) + " KB)";
        }
        return info;
    }).join(", ");
}
function onUploadSelect(e,a) {
    // Array with information about the uploaded files
   
    var files = e.files[0];
    //console.log("Name: " + files.name);
   // console.log("Size: " + files.size / (1024 * 1024) + " MB");
    //console.log("Extension: " + files.extension);
    var FileSizeMb = 0;
    if (files.size > 0)
        FileSizeMb = files.size / (1024 * 1024);
    var returnExtensions = $('#hdnFileExtensions').val();
    var fileExtensions = new Array();
    fileExtensions = returnExtensions.split(',');

    if (IsContains(fileExtensions, files.extension.replace(".", ""))) {

        if (FileSizeMb <= 4) {
                filePath = $('#attachments').val();
        }

        else {
            $(".ErrorMsg").text("File size should be less than 4MB");
            $(".ErrorMsg").fadeIn('slow').delay(3000).hide(1);
            filePath = "";
            // $(".t-upload-action").click();

            setTimeout(function () {
                $(".t-upload-action").click();
                $(".t-upload-files.t-reset").remove();
            });

        }
    }
    else {
        filePath = "";
        $(".ErrorMsg").text("Selected file format is not supported.");
        $(".ErrorMsg").fadeIn('slow').delay(3000).hide(1);
        setTimeout(function () {
            $(".t-upload-action").click();
            $(".t-upload-files.t-reset").remove();
        });
    }
    

}



function onUploadSelectPostDisplay(e, a) {
    // Array with information about the uploaded files
    var files = e.files[0];
    var FileSizeMb = 0;
    if (files.size > 0)
        FileSizeMb = files.size / (1024 * 1024);
    var returnExtensions = $('#hdnFileExtensions').val();
    var fileExtensions = new Array();
    fileExtensions = returnExtensions.split(',');
    if (IsContains(fileExtensions, files.extension.replace(".", ""))) {

        if (FileSizeMb <= 4) {       
            filePath = $('#attachmentsDisplay').val();
        }
        else {
            $(".ErrorMsg").text("File size should be less than 4MB");
            $(".ErrorMsg").fadeIn('slow').delay(3000).hide(1);
            filePath = "";
            setTimeout(function () {
                $(".t-upload-action").click();
                $(".t-upload-files.t-reset").remove();
            });
        }
    }
    else {
        filePath = "";
        $(".ErrorMsg").text("Selected file format is not supported.");
        $(".ErrorMsg").fadeIn('slow').delay(3000).hide(1);       
        //e.preventDefault();
        setTimeout(function () {
            $(".t-upload-action").click();
            $(".t-upload-files.t-reset").remove();
        });
    }
    
    
}

function onUploadSelectCreatePost(e, a) {
    // Array with information about the uploaded files
    var files = e.files[0];
    var FileSizeMb = 0;
    if(files.size>0)
        FileSizeMb= files.size / (1024 * 1024);
   
    var returnExtensions = $('#hdnFileExtensions').val();
    var fileExtensions = new Array();
    fileExtensions = returnExtensions.split(',');

    if (IsContains(fileExtensions, files.extension.replace(".", "")))
        {
        if (FileSizeMb <= 4) {
            filePath = $('#attachmentsCreatePost').val();
             }           
        else {

            filePath = "";
            $(".ErrorMsg").text("File size should be less than 4MB");
            $(".ErrorMsg").fadeIn('slow').delay(3000).hide(1);

            setTimeout(function () {
                $(".t-upload-action").click();
                $(".t-upload-files.t-reset").remove();
            });
        }
       

    }
    else {
        filePath = "";
        $(".ErrorMsg").text("Selected file format is not supported.");
        $(".ErrorMsg").fadeIn('slow').delay(3000).hide(1);
        //e.preventDefault();
        setTimeout(function () {

            $(".t-upload-action").click();
            $(".t-upload-files.t-reset").remove();
        });

    }
   
}

function onUploadRemove(e) {
    filePath = "";
}

function onUploadRemovePostDisplay(e) {
    filePath = "";
}

function onUploadRemoveCreatePost(e) {
    filePath = "";
}



function IsContains(sArray, object)
{
    for (var i = 0; i < sArray.length; i++) {
        if (sArray[i] == object) {
            return true;
        }
    }
    return false;
}

function clearForm() {
    filePath = "";
    $('#taDescription').val('');
    $(".t-upload-files.t-reset").remove();
    $('#file_tag_handler').val('');
    
    $('#FileCategory').prop('selectedIndex', 0);

}


