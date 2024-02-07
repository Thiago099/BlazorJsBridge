using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace BlazorJsBridge
{
    public static class ComponentBaseExtencion
    {
        public static async Task RegisterOnJS(this IJSRuntime JS, ComponentBase component)
        {
            try
            {
                await JS.InvokeVoidAsync("RegisterOnJS-" + component.GetType().Name, DotNetObjectReference.Create(component));
            }
            catch (JSException)
            {
                throw new Exception($"AcceptBlazorRegistration on \"{component.GetType().Name}\" either is not registered or threw an exception.");
            }
        }
    }
}
