using System;
using System.Net;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace API.Middleware;

public class ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env){

    public async Task InvokeAsync(HttpContext context){
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            
            logger.LogError(ex, ex.Message);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var response = env.IsDevelopment()
                ? new ApiException(context.Response.StatusCode, ex.Message, ex.StackTrace)
                : new ApiException(context.Response.StatusCode, ex.Message,  "Internal server error");

            var options = new JsonSerializerOptions{

                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            var json = JsonSerializer.Serialize(response, options);

            await context.Response.WriteAsync(json);
        }
    }
}

internal class ApiException
{
    private int statusCode;
    private string message;
    private string? stackTrace;

    public ApiException(int statusCode, string message, string? stackTrace)
    {
        this.statusCode = statusCode;
        this.message = message;
        this.stackTrace = stackTrace;
    }
}