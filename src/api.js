const OFFLINE = 'offline' ;
const ONLINE = 'online' ;
const MOBILE = 'mobile' ;

let mode =  document.querySelector("#mode").innerHTML ;
console.log('mode ='+mode)
let address = "" , address2 = ""
if(mode === ONLINE){
    address = document.querySelector("#online_url").innerHTML
}else if(mode === OFFLINE)
{    address = "http://127.0.0.1:5000/"

}else if(mode===MOBILE) {
    address = 'http://192.168.140.149/teachgram/0_main.php'
}

if(process.env.NODE_ENV === 'production'){
    address2= address
}else {
    address2=""
}






export {address,address2}