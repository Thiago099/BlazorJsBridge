using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace BlazorJsBridge
{
    public static class ComponentBaseExtencion
    {
        public static async Task RegisterOnJS(this IJSRuntime JS, ComponentBase component, string? key = null)
        {
            await JS.InvokeVoidAsync("RegisterOnJS", DotNetObjectReference.Create(component), component.GetType().Name, key) ;
        }
    }
}
