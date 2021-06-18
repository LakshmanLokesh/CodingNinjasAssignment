var data=[];
var category="All Events";
var subcategory="Upcoming";
var maindata=[];
var maindata1=[];
var page=1;
fetch("https://api.codingninjas.com/api/v3/event_tags").
then(res=>res.json()).
then(res=>{data=res;
maindata=(data.data.tags);
let tagsid=document.getElementById('tags');
for(let i=0;i<maindata.length;i++){
    // tagsid.innerHTML+="<label class='btn btn-secondary my-1 mx-1 '><input type='checkbox' class='tagclass' unchecked autocomplete='off'  onclick='alter()' value="+maindata[i].split(' ').join('%20')+">"+maindata[i]
    //         "</label>";

    tagsid.innerHTML+=`<input type="checkbox" class="btn-check tagclass" id="`+i+`" onclick='alter()' value="`+maindata[i].split(' ').join('%20')+`" autocomplete="off">
     <label class="btn btn-outline-primary m-1" for="`+i+`" > `+maindata[i]+`</label>`;

}
pressed(category,subcategory,maindata,page);

}).
catch(err=>console.log("err"));

function alterevent(a) {
    category=a.innerHTML;
    subcategory="Upcoming";
    page=1;
    if(maindata1.length==0){
        pressed(category,subcategory,maindata,page);
   
    }else{
         pressed(category,subcategory,maindata1,page);
    }
}
function altersubevent(a) {
    subcategory=a.innerHTML;
    page=1;
    if(maindata1.length==0){
        pressed(category,subcategory,maindata,page);
        
    }else{
         pressed(category,subcategory,maindata1,page);
    }
}

function alter(){
    maindata1=[];
    let taglist=document.getElementsByClassName('tagclass');
    for(var i=0;i<taglist.length;i++){
        if(taglist[i].checked==true){
            maindata1.push(taglist[i].value);
        }
    }
    console.log(maindata1);
    if(maindata1.length==0){
        pressed(category,subcategory,maindata,page);
       
   
    }else{
         pressed(category,subcategory,maindata1,page);
       
    }
}

function datestring(d) {
    var h, m, s, date, month, year, day;
            var dday, ampm, dh, dm, ds;
            var month_name = function(dt){
                mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
                  return mlist[dt.getMonth()];
            };
            h = d.getHours();
            m = d.getMinutes();
            s = d.getSeconds();
            day = d.getDay();
            month = d.getMonth();
            year = d.getFullYear();
            date = d.getDate();
            month++;
            ampm = "AM";
            if (h>12)
            {
                h-=12;
                ampm = "PM";
            }
            if (h==0)
            {
                h = 12;
                ampm = "AM";
            }
            if (h<10)
            {
                dh = "0" + h;
            }
            else 
            {
                dh = "" + h;
            }
            if (m<10)
            {
                dm = "0" + m;
            }
            else 
            {
                dm = "" + m;
            }
            if (s<10)
            {
                ds = "0" + s;
            }
            else 
            {
                ds = "" + s;
            }
            // document.getElementById("time").value = dh + " : " + dm + " : " + ds + " " + ampm;
            // document.getElementById("date").value = date + "/" + month + "/" + year;
            // document.getElementById("day").value = dday;
            var ans=dh + ":" + dm + ampm+"  "+date +" " + month_name(d) + " "+year;
return ans;
}
function pagechanger(at) {
    page=at.innerHTML;
    console.log(page);
     if(maindata1.length==0){
        pressed(category,subcategory,maindata,page);
   
    }else{
         pressed(category,subcategory,maindata1,page);
    }
     document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
function pressed(category,subcategory,maindata1,page){
        var csv =  maindata1.join(",");
        var str="https://api.codingninjas.com/api/v3/events?event_category="+category+"&event_sub_category="+subcategory+"&tag_list="+csv+"&offset=0";
        console.log(str);
        fetch(str).
        then(res=>res.json()).
        then(res=>{
            let eventtick=document.getElementById('eventticket');
            let pagenum=document.getElementById('pagenum');
            let perpage=20;

            var events=res.data.events;
            var nofpages=Math.ceil(events.length/perpage);
             pagenum.innerHTML=`<li class="page-item disabled">
        <a class="page-link" href="#" tabindex="-1">Previous</a>
      </li>`;
            for(var q=0;q<nofpages;q++){
                pagenum.innerHTML+= `<li class="page-item"><button class="page-link" onclick="pagechanger(this)">`+String(q+1)+`</button></li>`;
            }
             pagenum.innerHTML+=`<li class="page-item">
        <a class="page-link" href="#">Next</a>
      </li>`;

            eventtick.innerHTML="";
            var start=(page-1)*perpage;
            var end=page*perpage;
            console.log(events.length);
            console.log(start);
            console.log(end);
            var count=0;
            for(var i=start;i<end && i<events.length;i++){
                count=count+1;
                
                var k=events[i].start_time;
                var date = datestring(new Date(k*1000));
                // console.log(date);
                var tags=events[i].card_tags;
                // console.log(tags);
                var tagstring="";
                for(var j=0;j<tags.length;j++){
                    if(j==3){
                        tagstring+= `<span class="p-1 mx-1  bg-light text-dark">`+"+1 More"+`</span>`;
                        break;
                    }
                    tagstring+= `<span class="p-1 mx-1 border border-light  bg-light text-dark">`+tags[j]+`</span>`;

                }
                 var regimages=events[i].registered_users.top_users;
                 var regimgstring="";
                for(var j=0;j<regimages.length;j++){
                    if(j==5){
                      
                        break;
                    }
                    var imgurl=regimages[j].image_url;
                    if(imgurl==null){
                        imgurl="https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png";

                    }
                    regimgstring+= `<a title="`+regimages[j].name+`"><img src="`+imgurl+`" style="width:25px;height:25px;" 
                    class="img-fluid m-1 rounded-circle" alt="..."></a>`;

                }
                 regimgstring+=`<br><small class="text-muted"> And `+events[i].registered_users.other_users_count+` Others Regitered</small>`;

                 eventtick.innerHTML+=`<div class="col-md-6 my-2">
                                        <div class="card mb-6 box-shadow">
                                         <img class="card-img-top" src=`+events[i].cover_picture+` alt="Card image cap"> 
                                         <div class="card-body">
                                             <h6 class="fw-bold" >`+events[i].name+`</h6>
                                             <div class="row">
                                                <div class="col">
                                                   <p class=" font my-1 fw-bolder">Starts on</p>
                                                    <p class=" font my-1">`+date+`</p>

                                                </div>
                                                <div class="col">
                                                  <p class="font my-1"><b>Entry Fee</b></p>
                                                    <p class="font my-1">`+ (events[i].fees ? events[i].fees : "Free")+`</p>
                                                </div>
                                                <div class="col">
                                                  <p class="font my-1"><b>Venue</b></p>
                                                    <p class="font my-1">`+events[i].venue+`</p>
                                                </div>
                                              </div>

                                        <p class="card-text pt-2 border-top">`+events[i].short_desc+`</p>
                                         <div class="d-flex mt-2 pt-2 justify-content-start">
                                           `+tagstring+`
                                          </div>
                                          <div class="mt-4">`+regimgstring+`



                                          <div>

                                        </div>
                                      </div>
                                    </div>`;
            }
            console.log(count);
            if(count==0){
                eventtick.innerHTML+=` <div id="noe" >NO EVENTS FOUND</div>`;
            }




        }).catch(err=>console.log("err"));
}