export { AcceptBlazorRegistration, RegisterOnBlazor, Singleton }

const singletonCallbacks = new Set()
function Singleton(callback, key = "") {
    const stringCallback = callback.toString()+"-"+key
    if (!singletonCallbacks.has(stringCallback)) {
        singletonCallbacks.add(stringCallback)
        callback()
    }
}

function RegisterOnBlazor(name, method) {
    window[name] = method
}

function AcceptBlazorRegistration(callback) {

    const componentName = GetFunctionFirstParameterName(callback)

    Singleton(() => {

        RegisterOnBlazor("RegisterOnJS-" + componentName, container => {
            callback(new Proxy({} , {
                get(target, property) {
                    return (...parameters) => container.invokeMethodAsync(property, ...parameters)
                }
            }))
        })

    }, componentName)
}

function GetFunctionFirstParameterName(fn) {
    var exp = /^\s*function\s+\w+\s*\((\w*?)[\),]|^(\s*\(){0,1}\s*(\w+)\s*(=>|,|\))/gi
    var match = exp.exec(fn.toString());

    return match[1] ?? match[3]
}