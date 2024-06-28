using Lib.Net.Http.WebPush.Authentication;
using Lib.Net.Http.WebPush;
using Notification_App.Server.Controllers;
using Notification_App.Server;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        options.AddPolicy("AllowLocalhost4200",
        builder => builder.WithOrigins("https://localhost:4200")
                          .AllowAnyHeader()
                          .AllowAnyMethod());
    });
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add PushServiceClient and InMemorySubscriptionStore services
builder.Services.AddSingleton<PushServiceClient>(sp =>
{
    var pushServiceClient = new PushServiceClient
    {
        DefaultAuthentication = new VapidAuthentication(
            "BF0I-QO3V_5k3XX4cazzrsiRYSJJGOeAv8f-wJV-Idn3qGUA2bCa9ciCdBwD1dxqNd8tc9kyjrPqlwVyAEsVtHw",
            "D0RDxUzvFqO0wOo1iLbJCGdQ5E6mh-hlNelgWI4B3xs"
        )
    };
    return pushServiceClient;
});
builder.Services.AddSingleton<InMemorySubscriptionStore>(); // Implement this store


var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("AllowLocalhost4200");

//app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");


app.Run();
