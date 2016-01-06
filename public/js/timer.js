var today = moment()
var wedding = moment("2016 06 04", "YYYY MM DD")
$('.countdown').text('The wedding is '  + wedding.fromNow())
$('.weddingDate').text(wedding.format('dddd, MMMM Do, YYYY'))