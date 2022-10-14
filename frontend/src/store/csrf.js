import Cookies from 'js-cookie'

export async function csrfFetch(url, options = {}) {
    //set method to GET if there isn't a method
    options.method = options.method || 'GET'
    //set headers to be empty if there are no headers
    options.headers = options.headers || {}
    //if the the method is not GET, set the content type to application/json
    //and set the XSRF-TOKEN header to the value of the XSRF-TOKEN cookie
    if (options.method.toUpperCase() !== 'GET') {
        options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json'
        options.headers['XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN')
    }
    //call default window's fetch with the url and options passed
    const res = await window.fetch(url, options)
    //if response status code is 400 or above, throw res as response
    if (res.status >= 400) throw res;
    //if the response status code is under 400, return ressponse to the next promise chain
    return res
}

export function restoreCSRF() {
    return csrfFetch('/api/csrf/restore')
}
