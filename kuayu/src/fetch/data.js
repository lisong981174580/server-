 import qs from 'qs';
 export function post({url,body,success}) {
    fetch(url, {
        method: "POST",
        cache: 'reload',
        headers: {
            "Content-Type": "application/json",
            'authorization':'post123'
        },
        body: JSON.stringify(body)

    }).then(function(res) {
        if (res.ok) {
            res.json().then(function (data) {
                success(data)
            })

            console.log("Perfect! Your settings are saved.");

        } else if (res.status == 401) {
            console.log("Oops! You are not authorized.");
        }

    }, function(e) {
        console.log("Error submitting form!");
    });

}



 
export function get({url,success}) {
    fetch(url,{
        headers: {
            'authorization':'2345'
        }
    }).then(function (res) {

            return res.json();
        }).then(function (data) {
             success(data)
        }).catch(function (data) {
             success(data)
           console.log('出错了');
        });
}

