

$(document).ready(function () {
    ein_add_Event_form.init();

    ein_event_tag_handler.init();
    //gebo_event_datepicker.init();
   

    //$('#tp_Start').timepicker({
    //    defaultTime: 'current',
    //    minuteStep: 1,
    //    disableFocus: true,
    //   // showMeridian: false,
    //    template: 'dropdown'
    //});
    //$('#tp_End').timepicker({
    //    defaultTime: 'current',
    //    minuteStep: 1,
    //    disableFocus: true,
    //   // showMeridian: false,
    //    template: 'dropdown'
    //});
    
    $('#modalLinkEvent').click(function () {

        clearEventForm();

    });
    $('#IsAllDayEvent').click(function () {
       
        if ($(this).is(':checked')) {
            $('#tp_Start').hide();
            $('#tp_End').hide();
           
        }
        else
        {
            $('#tp_Start').show();
            $('#tp_End').show();
            
        }

    });
    $('#AddEvent_form').validate({

        errorClass: 'error',
        validClass: 'valid',
        errorPlacement: function(error,element) {
            return true;
        },
        rules: {
            
            StartDate: {
                required: true,
                maxlength: 250
            },
            EndDate: {
                required: true,
                maxlength: 250
            },
            Subject: {
                required: true,
                maxlength: 250
            },
            Description: {
                required: true,
                maxlength: 250
            },

        },
        messages: {
            StartDate: {
                required: "",
                
            },
            EndDate: {
                required: "",
                
            },
            Subject: {
                required: "",
                maxlength: "Message Maximum length is 250"
            },
            Description: {
                required: "",
                maxlength: "Message Maximum length is 250"
            }

        },
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

    $("#spinner").hide();
});


$('#eventnextScreen').click(function () {
    ein_add_Event_form.next();
});

$('#closeeventbtn').click(function () {
    ein_add_Event_form.show();
});

$('#closeeventbtnHeader').click(function () {
    ein_add_Event_form.show();
});
$('#eventpostbutton').click(function () {
    
    //if (dp_start.) {
    //    $("#fullspinner").show();
    //    //$('#filepostbutton').attr('disabled', true);
    //    $("#filepostbutton").hide('slow');
    //    $("#closefilebtn").hide('slow');

    //}
    //else {
    //    alert("Please select Start/End Date.")
    //    return false;
    //}
});

//* Edit Event Tahs timepicker

//* add Event form
ein_add_Event_form = {
    init: function () {
        this.show()
    },
    show: function () {

        var spaceId = $("#allSpaceId").text();
        var contentId=$("#ContentId").val();
        //console.log('spaceId: ' + spaceId);
       
        if (spaceId != "" ) {
           
            $('#eventspaces').show();
            $('#eventpostdata').hide();
            $('#eventpostbutton').hide();
            $('#eventnextScreen').show();
            $('#spacedrop').prop("selectedIndex", 0);
            $('#AddEvent_form').attr("disabled", false);
            
           
           
        }
        else {

            this.next();
        }
    },
    next: function () {
      
        $('#eventspaces').hide('slow');
        $('#eventpostdata').show();
        $('#eventpostbutton').show();
        $('#eventnextScreen').hide();
        //clearForm();



    }
}

//* tag handler
ein_event_tag_handler = {
    init: function () {
//        alert("Event Tag Loaded");
        var args = "";
        var loc = window.location.protocol + "//" + window.location.host;

        //console.log(loc);

        $.ajax({
            type: "GET",
            url: loc + '/api/content/GetAllTags',
            data: "{" + args + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onEventtagSuccess,
            fail: onEventFail
        });
    }
};

function onEventtagSuccess(response) {    

    $("#event_tag_handler").tagHandler({
        availableTags: response,
        autocomplete: true,
        onAdd: onEventTagAdd,        
        allowAdd: false

    });
}

function onEventFail(response) {
    //alert(response);
}

function onEventTagAdd(tag) {
    //alert(tag);
    updateEventAssignedTags(tag);
}

function onTagDelete(tag) {
    updateEventAssignedTags(tag);
}

function updateEventAssignedTags(tag) {
   
    var assignedTags = $('#hdnEventAssignedTags');
    var tags = assignedTags.val();

    if (tags.length == 0)
        tags = tag;
    else
        tags = tags + ',' + tag;

    assignedTags.val(tags);
}

//Edit form Tag handler work
ein_event_tag_handler_Detail = {
    init: function () {
        $('#hdnEventAssignedTags').val('');
        $('#event_tag_handler').val('');
        var args = "";
        var loc = window.location.protocol + "//" + window.location.host;
        //$("#spinner").show();
        $.ajax({
            type: "GET",
            url: loc + '/api/content/GetAllTags',
            data: "{" + args + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onEventSuccessDetail,
            fail: onEventFailDetail
        });


    }
};
function onEventSuccessDetail(response) {
    //console.log(response);
   
    servertags = response;
    var contentId = $('#ContentId').val();
    var loc = window.location.protocol + "//" + window.location.host;
    $.ajax({
        type: "GET",
        url: loc + '/api/content/GetAllTagsByContentId',
        data: { contentId: contentId },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onEventSuccessAssigned,
        fail: onEventFailAssigned
    });
   
}
function onEventSuccessAssigned(response) {
    //console.log(response);        
   
   
    
    $("#event_tag_handler").tagHandler({
        availableTags: servertags,
        assignedTags: response,
        autocomplete: true,
        allowAdd: true,
        onAdd: onEditEventTagAdd,
        onDelete: onEditEventTagDelete
    });
    updateEventAssignedTagsDetail(response);
    $("#spinner").hide();
}
function onEventFailDetail(response) {
    //alert(response);
    $("#spinner").hide();
}
function onEventFailAssigned(response) {
    $("#spinner").hide();
}
function onEditEventTagAdd(tag) {
    updateEventAssignedTagsDetail(tag);
}
function onEditEventTagDelete(tag) {
    deleteEventAssignedTagsDetail(tag);
}
function updateEventAssignedTagsDetail(tag) {
   
    var assignedTags = $('#hdnEventAssignedTags');
    var tags = assignedTags.val();

    if (tags.length == 0)
        tags = tag;
    else
        tags = tags + ',' + tag;

    assignedTags.val(tags);
}
function deleteEventAssignedTagsDetail(tag) {
    var assignedTags = $('#hdnEventAssignedTags');
    var updateassignedTags = $('#hdnEventAssignedTags').val();
    var values = updateassignedTags.split(",");

    for (var i = 0 ; i < values.length ; i++) {
        if (values[i] == tag) {
            values.splice(i, 1);
            break;
            // values.join(",");
        }
    }
    var tags = values.join(",");

    //if (tags.length == 0)
    //    tags = tag;
    //else
    //    tags = tags + ',' + tag;

    assignedTags.val(tags);

}
function clearEventForm() {
    //filePath = "";
    //$('#taDescription').val('');
    //$(".t-upload-files.t-reset").remove();
    //$('#file_tag_handler').val('');
    
   
    var sd = new Date();
    //var start_time = startformatDate(sd);
    //var end_time = endformatDate(sd,40);
    var d = sd.getDate();
    var m = sd.getMonth() + 1;
    var y = sd.getFullYear();

    ein_add_Event_form.init();
    //$('#event_dp_start').datepicker('setDate', sd);
    //$('#event_dp_end').datepicker('setDate', sd);
    $('#AddEvent_form').attr("disabled", false);
    $('#StartDate').val(m+"/"+d+"/"+y);
    $('#eventEndDate').val(m + "/" + d + "/" + y);

    var start_time = startformatDate(sd);
    $('#tp_Start').val(start_time);

    var end_time = endformatDate(sd, 30);
    $('#tp_End').val(end_time);

    $('#myEventModalLabel').text("Add New Event");
    $('#eventsubmitButton').text("Add");

    $('#eventTitle').val('');

    $('#eventDescription').val('');

    $('#ContentId').val('');

    
    $('#event_tag_handler').val('');
    
    $('#TimeZone').val("PST");

    $('#IsAllDayEvent').prop('checked', false);

    //$('#tp_Start').val(start_time);
    //$('#tp_Start').val('');

    //$('#tp_End').val('');
    //$('#tp_End').val(end_time);

    $('#tp_Start').show();
    $('#tp_End').show();

    $('#hdnEventAssignedTags').val('');


    ein_event_tag_handler.init();
}
function startformatDate(date) {
    var d = new Date(date);
    var hh = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var dd = "AM";
    var h = hh;
    
    if (m <= 30)
    {
        m = 30;
        
    }
    else {
        m = 0;
        h = h + 1;
    }
    if (h >= 12) {
        h = h - 12;
        dd = "PM";
    }
    if (h == 0) {
        h = 12;
    }
    //m = Math.round(m / 10) * 10;
    m = m < 10 ? "0" + m : m;

    s = s < 10 ? "0" + s : s;

    var rdate = h + ':' + m + ' ' + dd

    return rdate;
}
function endformatDate(date,addMin) {
    var d = new Date(date);
    var hh = d.getHours();
    var m = d.getMinutes() + addMin;

    if (m <= 30) {
        m = 30;

    }
    else if (m >= 60)
    {
        m = 30;
        hh = hh + 1;
    }
    else {
        m = 0;
        hh = hh + 1;
    }
    //m = Math.round(m / 10) * 10;
    var s = d.getSeconds();
    var dd = "AM";
    var h = hh;
    if (h >= 12) {
        h = hh - 12;
        dd = "PM";
    }
    if (h == 0) {
        h = 12;
    }
    m = m < 10 ? "0" + m : m;

    s = s < 10 ? "0" + s : s;

    var rdate = h + ':' + m + ' ' + dd

    return rdate;
}





