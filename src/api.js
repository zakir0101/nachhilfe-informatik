const OFFLINE = 0 ;
const ONLINE = 1 ;
const MOBILE = 2 ;
let mode = OFFLINE ;

let address = "" , address2 = ""
if(mode === ONLINE){
    address = 'https://teachgram.000webhostapp.com/teachgram/0_main.php'
}else if(mode === OFFLINE)
{    address = 'http://localhost/teachgram/0_main.php'

}else if(mode===MOBILE) {
    address = 'http://192.168.140.149/teachgram/0_main.php'
}

if(process.env.NODE_ENV === 'production'){
    address2= "http://127.0.0.1:5000/"
}else {
    address2=""
}






export {address,address2}