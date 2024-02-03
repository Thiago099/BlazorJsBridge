export { CallBlazor, RegisterOnBlazor, Singleton }


let components = {};

function CallBlazor(rawPath, ...parameters) {

    const path = rawPath.split("/")

    let container = null
    let methodName = null

    if (path.length == 2) {
        let componentName;

        [componentName, methodName] = path

        container = components[componentName]?.default

    } else if (path.length == 3) {

        let componentName, componentKey;

        [componentName, componentKey, methodName] = path

        container = components[componentName]?.instances[componentKey]
    }

    if (container != null) {
        return container.invokeMethodAsync(methodName, ...parameters)
    }

    console.error(`Failed to call "${rawPath}" because it was not registred`)
}

const singletonCallbacks = new Set()
function Singleton(callback, key) {
    const stringCallback = callback.toString() + key
    if (!singletonCallbacks.has(stringCallback)) {
        singletonCallbacks.add(stringCallback)
        callback()
    }
}

function RegisterOnBlazor(name, method) {
    window[name] = method
}


RegisterOnBlazor("RegisterOnJS", (newComponent, name, key) => {

    if (components[name] == null) {
        components[name] = { instances: {} }
    }

    if (key == null) {
        components[name].default = newComponent
    }
    else {
        components[name].instances[key] = newComponent
    }
})
