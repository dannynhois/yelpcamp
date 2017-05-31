var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name:"Camp Hope",
        image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
        description:"Bacon ipsum dolor amet sirloin brisket picanha, burgdoggen short loin ribeye pork chop. Capicola shoulder pancetta swine kevin picanha tenderloin. Short loin porchetta tail, hamburger biltong meatloaf t-bone landjaeger ham hock chicken. Tenderloin bacon turducken tri-tip leberkas salami andouille, kielbasa ham fatback capicola. Brisket sirloin corned beef hamburger beef ribs sausage chicken shankle pastrami boudin swine."
    },
    {
        name:"Cloud's Rest",
        image:"https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg",
        description:"Bacon ipsum dolor amet sirloin brisket picanha, burgdoggen short loin ribeye pork chop. Capicola shoulder pancetta swine kevin picanha tenderloin. Short loin porchetta tail, hamburger biltong meatloaf t-bone landjaeger ham hock chicken. Tenderloin bacon turducken tri-tip leberkas salami andouille, kielbasa ham fatback capicola. Brisket sirloin corned beef hamburger beef ribs sausage chicken shankle pastrami boudin swine."
    },
    {
        name:"Flat Iron",
        image:"https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg",
        description:"Bacon ipsum dolor amet sirloin brisket picanha, burgdoggen short loin ribeye pork chop. Capicola shoulder pancetta swine kevin picanha tenderloin. Short loin porchetta tail, hamburger biltong meatloaf t-bone landjaeger ham hock chicken. Tenderloin bacon turducken tri-tip leberkas salami andouille, kielbasa ham fatback capicola. Brisket sirloin corned beef hamburger beef ribs sausage chicken shankle pastrami boudin swine."
    }
]

function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else{
            console.log("removed Campground data");
            // data.forEach(function(seed){
            //     Campground.create(seed, function(err, campground){
            //         if(err){
            //             console.log(err);
            //         } else {
            //             console.log("added campground");
            //             //Add comments
            //             Comment.create({
            //                 text:"This place is great but I wished it had wifi",
            //                 author:"homer"
            //             }, function(err,comment){
            //                 if(err){
            //                     console.log(err);
            //                 } else {
            //                     campground.comments.push(comment);
            //                     campground.save();
            //                     console.log("added comments");
                                
            //                 }
            //             })
            //         }
            //     })
            // });
        }
    })
}

module.exports = seedDB;