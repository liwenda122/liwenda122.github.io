/**
 * Created by zhaochengtao on 2016/12/14.
 */
module.exports={
    post(url,params){
        return new Promise(function(resolve, reject) {
            // Standard XHR to load an image
            var request = new XMLHttpRequest();
            request.open('GET', url);
            request.responseType = 'application/json';
            // When the request loads, check whether it was successful
            request.onload = function() {
                if (request.status === 200) {
                    // If successful, resolve the promise by passing back the request response
                    resolve(request.response);
                } else {
                    // If it fails, reject the promise with a error message
                    reject(Error('request didn\'t load successfully; error code:' + request.statusText));
                }
            };
            request.onerror = function() {
                // Also deal with the case when the entire request fails to begin with
                // This is probably a network error, so reject the promise with an appropriate message
                reject(Error('There was a network error.'));
            };
            // Send the request
            request.send();
        });
    }
};