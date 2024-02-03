## Description

This is a simple library I made that allows blazor to be better used alongside javascript

## Features

- Non Static javascript inerop function calling
- Wrapper for creating blazor accessible javascript functions
- A singleton function that ensures your javascript function is called only once during the component lifecycle

## Usage

You can import one or more javascript functions from this library like this on your javascript files

```js
import { CallBlazor, Singleton, RegisterOnBlazor } from "/blazor-js-bridge.js" 
```

Note for the import command to work your script must be of module type, example

```html
<script type="module" src="main.js"></script>
```

## Methods

### This function will ensure that your code will be executed only once

Parameters:
- callback: A function to be executed
- key (optional): If you want the function to be executed again you can pass a different key

```js
Singleton(()=>{
})
```

### Calls a public non static method of your component decorated by [JSInvokable]

For the following method to work, you must register your component for usage on the javascript

```csharp
@using BlazorJsBridge;
@inject IJSRuntime JS;
...
protected override async Task OnAfterRenderAsync(bool firstRender)
{
    if (firstRender)
    {
        await JS.RegisterOnJS(this,"OptionalKey");
    }
}
```

Your invocable method should look like this

```csharp
[JSInvokable]
public async Task MethodName()
{
    // YOUR CODE HERE
    await InvokeAsync(StateHasChanged); // If your method changes the state of your application
}
```

Parameters:
- path: 


The path is case sensitive and should be defined like this:


ComponentName/MethodName


or this if you have an optional key


ComponentName/OptionalKey/MethodName

```js
CallBlazor("ComponentName/OptionalKey/MethodName", ...parameters)
```

### Register a blazor callable method

Parameters:

- Name: Name of the method 
- Method: The implementation of the method

```js
RegisterOnBlazor("MyMethod", (parameter1, parameter2)=>{})
```

#### Example of calling this method

```csharp
await JS.InvokeVoidAsync("MyMethod", "parameter 1", 2) ;
```