import * as functions from 'firebase-functions';

export const pastebin = functions.https.onRequest((request, response) => {
    response.set('Access-Control-Allow-Origin', '*');
    const req = require('request-promise');
    var data = JSON.parse(request.body);

    const postURL = "https://pastebin.com/api/api_post.php";
    var options = {
        method: 'POST',
        uri: postURL,
        form: {
            api_dev_key: data.api_dev_key,
            api_option: 'paste',
            api_paste_private: 0,
            api_paste_name: data.api_paste_name,
            api_paste_expire_date: data.api_paste_expire_date,
            api_paste_format: data.api_paste_format,
            api_paste_code: data.api_paste_code
        }
    }

    req(options).then((parsedBody: any) => {
        response.status(200).send({link: parsedBody});
    }); 
    
});

export const getPaste = functions.https.onRequest((request, response) => {
    response.set('Access-Control-Allow-Origin', '*');
    const req = require('request-promise');
    var data = request.body;

    const postURL = "https://pastebin.com/raw/" + data;

    var options = {
        method: 'GET',
        uri: postURL,
        json: true
    }

    req(options).then((parsedBody: any) => {
        response.status(200).send({build: parsedBody});
    }); 
    
});
