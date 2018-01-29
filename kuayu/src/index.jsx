import qs from 'qs';
import {get, post} from "./fetch/data";

class  Home extends React.Component{
    constructor(props){
        super(props)
    }
    render(){


    /*    //fetch git请求
        fetch('http://192.168.1.101:3000/api',{mode: 'cors'}).then(function (response) {

            console.log(response.headers.get('Content-Type'));
            console.log(response.headers.get('Date'));
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.type);
            console.log(response.url);


            return response.json();
        }).then(function (jsonData) {
            console.log(jsonData);
        }).catch(function () {
            console.log('出错了');
        });


        var req = new Request('http://192.168.1.101:3000/api', {method: 'GET', cache: 'reload'});

        fetch(req).then(function(response) {
            return response.json();
        }).then(function(json) {

            console.log('ww'+json)
        });

*/



        var data={
            organization:'111',
            username: '111',
            password: '111'

        }

        console.log(qs.stringify(data))



        /*http://192.168.11.125:8000/terminal/login*/
       /* post({
            url:'http://192.168.11.125:8000/terminal/login',
            body:data,
            success:function (result) {
                console.log(result)
            }
        })*/


      /*http://192.168.11.145:8000/terminal/logout*/
        get({
            url:'http://192.168.11.125:8000/terminal/logout',
            success:function (data) {
                console.log(data)
            }
        })





        //fetch post请求
      /*  function obj2params(obj) {
            var result = '';
            var item;
            for (item in obj) {
                result += '&' + item + '=' + encodeURIComponent(obj[item]);
            }

            if (result) {
                result = result.slice(1);
            }

            return result;
        }

        console.log(obj2params(data))
        */



      /*  //git原生请求
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://free-api.heweather.com/v5/now?city=xian&key=93b5526475bc481880116e5af627a46d');
        xhr.responseType = 'json';
        xhr.onload = function() {
            console.log(xhr.response);
        };
        xhr.onerror = function() {
            console.log('出错了');
        };
        xhr.send();
*/

/*

        //post原生请求
        var xml = new XMLHttpRequest();
        xml.open('POST', encodeURI('http://192.168.1.103:8080/terminal/login'));
        xml.responseType = 'json';
        xml.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xml.onload = function() {
            console.log(xml.response);
        };
        xml.send(encodeURI(obj2params(data)));
*/



        return(
            <div>
                这是测试的
            </div>
        )
    }
}

ReactDOM.render(<Home/>,document.querySelector('#root'));